import React, { useCallback, useEffect, useRef, useState } from "react";

/**
 * Cazacaries — mini-juego de canvas para la página de quizzes.
 * El motor vive fuera de React (refs + requestAnimationFrame); React solo
 * pinta el HUD y las pantallas de inicio/fin.
 */

const W = 400;
const H = 500;
const MAX_LIVES = 5;

const TIPS = [
    "Cepíllate al menos 2 veces al día durante 2 minutos.",
    "Usa pasta con flúor: fortalece el esmalte contra las caries.",
    "El hilo dental limpia donde el cepillo no llega. Úsalo a diario.",
    "Cambia tu cepillo cada 3 meses o cuando las cerdas se abran.",
    "Picar dulces y bebidas azucaradas a cada rato alimenta a las bacterias todo el día.",
    "Visita a tu dentista cada 6 meses para revisión y limpieza.",
    "Después de comer algo dulce, enjuágate la boca con agua.",
    "No olvides cepillar tu lengua: ahí también viven bacterias.",
];

const BEST_KEY = "dc_cazacaries_best";

function readBest() {
    try {
        return parseInt(window.localStorage.getItem(BEST_KEY), 10) || 0;
    } catch {
        return 0;
    }
}

function writeBest(value) {
    try {
        window.localStorage.setItem(BEST_KEY, String(value));
    } catch {
        /* almacenamiento bloqueado */
    }
}

function rankFor(score) {
    if (score < 100) return "Aprendiz de cepillo";
    if (score < 300) return "Guardián del esmalte";
    if (score < 600) return "Héroe del hilo dental";
    return "Leyenda de la sonrisa";
}

const rand = (a, b) => a + Math.random() * (b - a);

function hexToRgb(color) {
    const n = parseInt(color.slice(1), 16);
    return [n >> 16, (n >> 8) & 255, n & 255];
}

function lerpColor(a, b, t) {
    const A = hexToRgb(a);
    const B = hexToRgb(b);
    return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",")})`;
}

function createGame({ canvas, mutedRef, onHud, onGameOver }) {
    const ctx = canvas.getContext("2d");

    const teeth = [];
    for (let row = 0; row < 2; row++) {
        for (let i = 0; i < 6; i++) {
            const off = i - 2.5;
            const c = Math.abs(off);
            const upper = row === 0;
            const x = W / 2 + off * 56;
            const w = 50 - c * 3;
            const h = upper ? 78 - c * 9 : 64 - c * 7;
            const curve = off * off * 5;
            const y = upper ? 150 + curve : 370 - curve - h;
            teeth.push({ x, y, w, h, upper, cav: 0, spots: [], germ: null, thing: null, flash: 0 });
        }
    }

    const gumU = (x) => 158 + Math.pow((x - 200) / 56, 2) * 5;
    const gumL = (x) => 362 - Math.pow((x - 200) / 56, 2) * 5;

    let phase = "menu";
    let score = 0;
    let lives = MAX_LIVES;
    let level = 1;
    let zapped = 0;
    let combo = 0;
    let lastZap = -9;
    let spawnT = 0;
    let freeze = 0;
    let time = 0;
    let shake = 0;
    let particles = [];
    let floats = [];
    let bannerMsg = null;
    let brushTap = 0;
    const pointer = { x: -99, y: -99, mouse: false, inside: false };

    let audioCtx = null;
    let raf = 0;
    let last = performance.now();
    let destroyed = false;

    function beep(freq, dur, type = "sine", vol = 0.07, slide = 0) {
        if (mutedRef.current) return;
        try {
            audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            const now = audioCtx.currentTime;
            osc.type = type;
            osc.frequency.setValueAtTime(freq, now);
            if (slide) osc.frequency.exponentialRampToValueAtTime(slide, now + dur);
            gain.gain.setValueAtTime(vol, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
            osc.connect(gain).connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + dur);
        } catch {
            /* audio no disponible */
        }
    }

    function resize() {
        const rect = canvas.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
        ctx.setTransform(canvas.width / W, 0, 0, canvas.height / H, 0, 0);
    }

    const germDur = () => Math.max(1.5, 3.8 - (level - 1) * 0.22);
    const spawnGap = () => Math.max(0.38, 1.25 - (level - 1) * 0.09);
    const freeTeeth = () => teeth.filter((t) => !t.germ && !t.thing);
    const center = (t) => [t.x, t.y + t.h / 2];

    function pushHud() {
        onHud({ score, level, lives });
    }

    function spawnGerm(delay = 0) {
        const free = freeTeeth();
        if (!free.length) return;
        free[(Math.random() * free.length) | 0].germ = { t: -delay, dur: germDur() };
    }

    function spawnThing() {
        const free = freeTeeth();
        if (!free.length) return;
        const r = Math.random();
        const type = r < 0.55 ? "candy" : r < 0.78 ? "floss" : "fluor";
        free[(Math.random() * free.length) | 0].thing = {
            type,
            t: 0,
            dur: type === "candy" ? 2.4 : 2.8,
        };
    }

    function burst(x, y, n, cols = ["#ffffff", "#f4d3b3", "#e4b892"]) {
        for (let i = 0; i < n; i++) {
            const a = rand(0, Math.PI * 2);
            const s = rand(40, 160);
            particles.push({
                x,
                y,
                vx: Math.cos(a) * s,
                vy: Math.sin(a) * s - 30,
                life: 0,
                max: rand(0.4, 0.8),
                r: rand(2.5, 6),
                col: cols[i % cols.length],
            });
        }
    }

    function floatText(x, y, text, col) {
        floats.push({ x, y, text, col, life: 0 });
    }

    function banner(text) {
        bannerMsg = { text, life: 0 };
    }

    function zap(t) {
        combo = time - lastZap < 1.1 ? Math.min(combo + 1, 5) : 1;
        lastZap = time;
        const pts = 10 * combo;
        const [cx, cy] = center(t);
        score += pts;
        zapped++;
        burst(cx, cy, 14);
        floatText(cx, cy - 22, `+${pts}${combo > 1 ? `  x${combo}` : ""}`, "#0d7775");
        t.germ = null;
        t.flash = 1;
        beep(500 + combo * 80, 0.12, "triangle", 0.07, 900 + combo * 120);
        const nextLevel = 1 + Math.floor(zapped / 10);
        if (nextLevel > level) {
            level = nextLevel;
            banner(`¡Nivel ${level}!`);
            window.setTimeout(() => beep(880, 0.15, "sine", 0.06), 120);
        }
        pushHud();
    }

    function useThing(t) {
        const thing = t.thing;
        const [cx, cy] = center(t);
        t.thing = null;
        if (thing.type === "candy") {
            score = Math.max(0, score - 20);
            combo = 0;
            floatText(cx, cy - 22, "-20", "#d6336c");
            banner("¡El azúcar alimenta a las bacterias!");
            spawnGerm(0);
            spawnGerm(0.15);
            shake = 0.25;
            beep(180, 0.25, "sawtooth", 0.05, 90);
        } else if (thing.type === "floss") {
            let cleaned = 0;
            teeth.forEach((o) => {
                if (o.germ && o.germ.t >= 0) {
                    const [x, y] = center(o);
                    burst(x, y, 8);
                    o.germ = null;
                    o.flash = 1;
                    cleaned++;
                }
            });
            score += cleaned * 5 + 15;
            zapped += cleaned;
            floatText(cx, cy - 22, `+${cleaned * 5 + 15}`, "#0d7775");
            banner("¡Hilo dental! Limpieza total");
            beep(600, 0.1, "triangle", 0.06, 1200);
            window.setTimeout(() => beep(900, 0.15, "triangle", 0.06, 1500), 90);
            level = Math.max(level, 1 + Math.floor(zapped / 10));
        } else {
            freeze = 5;
            banner("¡Flúor! Bacterias congeladas");
            burst(cx, cy, 16, ["#3aa0ff", "#bfe3ff", "#ffffff"]);
            beep(1200, 0.3, "sine", 0.05, 700);
        }
        pushHud();
    }

    function gameOver() {
        phase = "over";
        let best = readBest();
        if (score > best) {
            best = score;
            writeBest(best);
        }
        onGameOver({
            score,
            best,
            rank: rankFor(score),
            tip: TIPS[(Math.random() * TIPS.length) | 0],
        });
    }

    function cavity(t) {
        t.cav++;
        lives--;
        combo = 0;
        shake = 0.4;
        t.spots.push({ dx: rand(-0.22, 0.22) * t.w, dy: rand(0.3, 0.7) * t.h, r: rand(4.5, 7.5) });
        const [cx, cy] = center(t);
        burst(cx, cy, 10, ["#6b4a2b", "#8a6a3f", "#3d2a17"]);
        floatText(cx, cy - 22, "¡Caries!", "#8a3b12");
        beep(140, 0.35, "square", 0.05, 70);
        pushHud();
        if (lives <= 0) gameOver();
    }

    function start() {
        teeth.forEach((t) => {
            t.cav = 0;
            t.spots = [];
            t.germ = null;
            t.thing = null;
            t.flash = 0;
        });
        score = 0;
        lives = MAX_LIVES;
        level = 1;
        zapped = 0;
        combo = 0;
        lastZap = -9;
        spawnT = 0.8;
        freeze = 0;
        particles = [];
        floats = [];
        bannerMsg = null;
        shake = 0;
        phase = "play";
        pushHud();
        banner("¡Protege la sonrisa!");
        beep(660, 0.1, "triangle", 0.06);
        window.setTimeout(() => beep(990, 0.15, "triangle", 0.06), 100);
    }

    function toLogical(e) {
        const rect = canvas.getBoundingClientRect();
        return [((e.clientX - rect.left) * W) / rect.width, ((e.clientY - rect.top) * H) / rect.height];
    }

    function onPointerMove(e) {
        const [x, y] = toLogical(e);
        pointer.x = x;
        pointer.y = y;
        pointer.mouse = e.pointerType === "mouse";
        pointer.inside = true;
    }

    function onPointerLeave() {
        pointer.inside = false;
    }

    function onPointerDown(e) {
        e.preventDefault();
        const [x, y] = toLogical(e);
        pointer.x = x;
        pointer.y = y;
        pointer.mouse = e.pointerType === "mouse";
        pointer.inside = true;
        brushTap = 0.3;
        if (phase !== "play") return;
        const hit = teeth.find(
            (t) => x > t.x - t.w / 2 - 8 && x < t.x + t.w / 2 + 8 && y > t.y - 10 && y < t.y + t.h + 10
        );
        if (!hit) return;
        if (hit.germ && hit.germ.t >= 0) zap(hit);
        else if (hit.thing) useThing(hit);
        else {
            burst(x, y, 4);
            beep(300, 0.05, "sine", 0.03);
        }
    }

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("pointerdown", onPointerDown);

    function update(dt) {
        time += dt;
        if (shake > 0) shake -= dt;
        if (brushTap > 0) brushTap -= dt;
        teeth.forEach((t) => {
            if (t.flash > 0) t.flash -= dt * 2.5;
        });

        if (phase === "play") {
            if (freeze > 0) freeze -= dt;
            for (const t of teeth) {
                if (t.germ) {
                    if (freeze <= 0 || t.germ.t < 0) t.germ.t += dt;
                    if (t.germ.t >= t.germ.dur) {
                        t.germ = null;
                        cavity(t);
                        if (phase !== "play") break;
                    }
                }
                if (t.thing) {
                    t.thing.t += dt;
                    if (t.thing.t >= t.thing.dur) t.thing = null;
                }
            }
            spawnT -= dt;
            if (spawnT <= 0 && phase === "play") {
                spawnT = spawnGap() * rand(0.7, 1.3);
                const active = teeth.filter((t) => t.germ).length;
                const things = teeth.filter((t) => t.thing).length;
                if (
                    (Math.random() < 0.14 && things < 2 && level > 1) ||
                    (Math.random() < 0.08 && things === 0)
                ) {
                    spawnThing();
                } else if (active < Math.min(8, 2 + level)) {
                    spawnGerm();
                }
            }
        }

        particles = particles.filter((p) => (p.life += dt) < p.max);
        particles.forEach((p) => {
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.vy += 260 * dt;
        });
        floats = floats.filter((f) => (f.life += dt) < 1);
        if (bannerMsg && (bannerMsg.life += dt) > 1.8) bannerMsg = null;
    }

    function roundPath(l, y, w, h, rT, rB) {
        const r = l + w;
        const b = y + h;
        ctx.beginPath();
        ctx.moveTo(l + rT, y);
        ctx.lineTo(r - rT, y);
        ctx.quadraticCurveTo(r, y, r, y + rT);
        ctx.lineTo(r, b - rB);
        ctx.quadraticCurveTo(r, b, r - rB, b);
        ctx.lineTo(l + rB, b);
        ctx.quadraticCurveTo(l, b, l, b - rB);
        ctx.lineTo(l, y + rT);
        ctx.quadraticCurveTo(l, y, l + rT, y);
        ctx.closePath();
    }

    function drawSparkle(x, y, s) {
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(x, y - s);
        ctx.quadraticCurveTo(x, y, x + s, y);
        ctx.quadraticCurveTo(x, y, x, y + s);
        ctx.quadraticCurveTo(x, y, x - s, y);
        ctx.quadraticCurveTo(x, y, x, y - s);
        ctx.fill();
    }

    function drawTooth(t) {
        const l = t.x - t.w / 2;
        const rT = t.upper ? t.w * 0.15 : t.w * 0.38;
        const rB = t.upper ? t.w * 0.38 : t.w * 0.15;
        roundPath(l, t.y, t.w, t.h, rT, rB);
        const yel = Math.min(t.cav * 0.25, 0.75);
        const g = ctx.createLinearGradient(l, 0, l + t.w, 0);
        g.addColorStop(0, lerpColor("#e3e6dc", "#d8c89a", yel));
        g.addColorStop(0.45, lerpColor("#ffffff", "#f3e7c2", yel));
        g.addColorStop(1, lerpColor("#dfe3d8", "#d3c291", yel));
        ctx.fillStyle = g;
        ctx.fill();
        ctx.strokeStyle = "rgba(0,0,0,.12)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = "rgba(255,255,255,.7)";
        roundPath(l + t.w * 0.22, t.y + t.h * 0.18, t.w * 0.12, t.h * 0.45, 3, 3);
        ctx.fill();

        t.spots.forEach((s) => {
            ctx.fillStyle = "#6b4a2b";
            ctx.beginPath();
            ctx.arc(t.x + s.dx, t.y + s.dy, s.r, 0, 7);
            ctx.fill();
            ctx.fillStyle = "#3d2a17";
            ctx.beginPath();
            ctx.arc(t.x + s.dx, t.y + s.dy, s.r * 0.55, 0, 7);
            ctx.fill();
        });

        if (t.flash > 0) {
            ctx.save();
            ctx.globalAlpha = t.flash;
            ctx.fillStyle = "#ffffff";
            roundPath(l, t.y, t.w, t.h, rT, rB);
            ctx.fill();
            drawSparkle(t.x + t.w * 0.25, t.y + t.h * 0.25, 7 * t.flash + 3);
            ctx.restore();
        }
    }

    function drawGerm(t) {
        const g = t.germ;
        if (g.t < 0) return;
        const p = Math.min(g.t / g.dur, 1);
        const [cx, cy] = center(t);
        const frozen = freeze > 0;
        const r = 8 + 12 * p;
        const wob = frozen ? 0 : Math.sin(time * 8 + cx) * 1.5;
        ctx.save();
        ctx.translate(cx, cy + wob);

        ctx.beginPath();
        ctx.arc(0, 0, r + 8, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * p);
        ctx.strokeStyle = p > 0.7 ? "#e5484d" : "rgba(229,72,77,.5)";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.stroke();

        const col = frozen ? "#9fd8ff" : lerpColor("#8bd34a", "#4f7d1a", p);
        ctx.fillStyle = col;
        const spin = frozen ? 0 : time * 2;
        for (let k = 0; k < 8; k++) {
            const a = (k / 8) * Math.PI * 2 + spin;
            ctx.beginPath();
            ctx.arc(Math.cos(a) * r, Math.sin(a) * r, r * 0.28, 0, 7);
            ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, 7);
        ctx.fill();
        ctx.fillStyle = "rgba(0,0,0,.13)";
        ctx.beginPath();
        ctx.arc(r * 0.4, r * 0.4, r * 0.2, 0, 7);
        ctx.fill();

        const e = r * 0.28;
        ctx.fillStyle = "#fff";
        [-1, 1].forEach((s) => {
            ctx.beginPath();
            ctx.arc(s * r * 0.35, -r * 0.15, e, 0, 7);
            ctx.fill();
        });
        ctx.fillStyle = "#1b1b1b";
        [-1, 1].forEach((s) => {
            ctx.beginPath();
            ctx.arc(s * r * 0.35, -r * 0.1, e * 0.5, 0, 7);
            ctx.fill();
        });
        ctx.strokeStyle = "#1b1b1b";
        ctx.lineWidth = 1.8;
        if (p > 0.55) {
            [-1, 1].forEach((s) => {
                ctx.beginPath();
                ctx.moveTo(s * r * 0.62, -r * 0.55);
                ctx.lineTo(s * r * 0.12, -r * 0.36);
                ctx.stroke();
            });
        }
        ctx.beginPath();
        ctx.arc(0, r * 0.28, r * 0.25, 0.15, Math.PI - 0.15);
        ctx.stroke();
        if (frozen) {
            ctx.fillStyle = "rgba(255,255,255,.35)";
            ctx.beginPath();
            ctx.arc(0, 0, r * 1.2, 0, 7);
            ctx.fill();
        }
        ctx.restore();
    }

    function drawThing(t) {
        const th = t.thing;
        const [cx, cy] = center(t);
        const left = th.dur - th.t;
        const pulse = 1 + Math.sin(time * 10) * 0.07;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(pulse, pulse);
        ctx.globalAlpha = left < 0.6 ? left / 0.6 : Math.min(1, th.t * 5);
        if (th.type === "candy") {
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 4;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(0, 6);
            ctx.lineTo(0, 26);
            ctx.stroke();
            ctx.fillStyle = "#ff6b8b";
            ctx.beginPath();
            ctx.arc(0, -4, 14, 0, 7);
            ctx.fill();
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            for (let a = 0; a < 12; a += 0.3) {
                const rr = a * 1.05;
                const px = Math.cos(a) * rr;
                const py = -4 + Math.sin(a) * rr;
                if (a === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.stroke();
        } else if (th.type === "floss") {
            ctx.fillStyle = "#14a3a0";
            roundPath(-15, -13, 30, 26, 7, 7);
            ctx.fill();
            ctx.fillStyle = "#fff";
            ctx.beginPath();
            ctx.arc(0, -1, 6, 0, 7);
            ctx.fill();
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(6, -1);
            for (let i = 0; i <= 20; i++) ctx.lineTo(6 + i * 1.2, -1 + Math.sin(i * 0.8 + time * 6) * 3);
            ctx.stroke();
            ctx.fillStyle = "#fff";
            ctx.font = "bold 7px system-ui";
            ctx.textAlign = "center";
            ctx.fillText("HILO", 0, 11);
        } else {
            ctx.fillStyle = "#3aa0ff";
            ctx.beginPath();
            ctx.moveTo(0, -18);
            ctx.bezierCurveTo(12, -4, 14, 4, 14, 8);
            ctx.arc(0, 8, 14, 0, Math.PI);
            ctx.bezierCurveTo(-14, 4, -12, -4, 0, -18);
            ctx.fill();
            ctx.fillStyle = "#fff";
            ctx.font = "bold 15px system-ui";
            ctx.textAlign = "center";
            ctx.fillText("F", 0, 13);
        }
        ctx.restore();
    }

    function drawBrush(x, y, press) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-0.55 + (press ? Math.sin(press * 40) * 0.25 : 0));
        ctx.fillStyle = "#e4b892";
        roundPath(10, -5, 62, 10, 5, 5);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        roundPath(-16, -5, 30, 10, 4, 4);
        ctx.fill();
        ctx.strokeStyle = "rgba(0,0,0,.15)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = "#cfe9f5";
        for (let i = 0; i < 6; i++) ctx.fillRect(-14 + i * 4.6, -15, 3, 10);
        ctx.restore();
    }

    function render() {
        ctx.clearRect(0, 0, W, H);
        ctx.save();
        if (shake > 0) ctx.translate(rand(-5, 5) * shake * 2, rand(-5, 5) * shake * 2);

        ctx.save();
        ctx.beginPath();
        ctx.ellipse(200, 262, 180, 178, 0, 0, 7);
        ctx.clip();
        ctx.fillStyle = "#4a1420";
        ctx.fillRect(0, 0, W, H);
        const tongue = ctx.createRadialGradient(200, 300, 10, 200, 310, 130);
        tongue.addColorStop(0, "#f07a92");
        tongue.addColorStop(1, "#c9445f");
        ctx.fillStyle = tongue;
        ctx.beginPath();
        ctx.ellipse(200, 318, 120, 60, 0, 0, 7);
        ctx.fill();
        ctx.strokeStyle = "rgba(0,0,0,.15)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(200, 275);
        ctx.lineTo(200, 330);
        ctx.stroke();

        ctx.fillStyle = "#f48ca0";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(W, 0);
        for (let x = W; x >= 0; x -= 10) ctx.lineTo(x, gumU(x));
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(0, H);
        ctx.lineTo(W, H);
        for (let x = W; x >= 0; x -= 10) ctx.lineTo(x, gumL(x));
        ctx.closePath();
        ctx.fill();

        teeth.forEach(drawTooth);
        if (freeze > 0) {
            ctx.fillStyle = `rgba(120,190,255,${0.12 + Math.sin(time * 6) * 0.03})`;
            ctx.fillRect(0, 0, W, H);
        }
        teeth.forEach((t) => {
            if (t.germ) drawGerm(t);
            if (t.thing) drawThing(t);
        });
        ctx.restore();

        ctx.beginPath();
        ctx.ellipse(200, 262, 180, 178, 0, 0, 7);
        ctx.strokeStyle = "#e76f7e";
        ctx.lineWidth = 26;
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(200, 262, 184, 182, 0, Math.PI * 1.15, Math.PI * 1.45);
        ctx.strokeStyle = "rgba(255,255,255,.35)";
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.stroke();

        if (freeze > 0 && phase === "play") {
            ctx.fillStyle = "rgba(255,255,255,.8)";
            roundPath(120, 470, 160, 12, 6, 6);
            ctx.fill();
            ctx.fillStyle = "#3aa0ff";
            roundPath(120, 470, (160 * freeze) / 5, 12, 6, 6);
            ctx.fill();
        }
        ctx.restore();

        particles.forEach((p) => {
            ctx.globalAlpha = 1 - p.life / p.max;
            ctx.fillStyle = p.col;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, 7);
            ctx.fill();
            ctx.strokeStyle = "rgba(228,184,146,.45)";
            ctx.lineWidth = 1;
            ctx.stroke();
        });
        ctx.globalAlpha = 1;
        ctx.textAlign = "center";
        floats.forEach((f) => {
            ctx.globalAlpha = 1 - f.life;
            ctx.font = "800 18px system-ui";
            ctx.lineWidth = 4;
            ctx.strokeStyle = "#fff";
            ctx.strokeText(f.text, f.x, f.y - f.life * 30);
            ctx.fillStyle = f.col;
            ctx.fillText(f.text, f.x, f.y - f.life * 30);
        });
        ctx.globalAlpha = 1;

        if (bannerMsg) {
            const a = Math.min(1, bannerMsg.life * 5, (1.8 - bannerMsg.life) * 3);
            ctx.globalAlpha = a;
            ctx.font = "800 19px system-ui";
            const wTxt = ctx.measureText(bannerMsg.text).width + 32;
            ctx.fillStyle = "rgba(11,27,43,.9)";
            roundPath(200 - wTxt / 2, 28, wTxt, 38, 19, 19);
            ctx.fill();
            ctx.strokeStyle = "rgba(228,184,146,.45)";
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.fillStyle = "#f4d3b3";
            ctx.fillText(bannerMsg.text, 200, 54);
            ctx.globalAlpha = 1;
        }

        if (phase === "play" && ((pointer.mouse && pointer.inside) || brushTap > 0)) {
            drawBrush(pointer.x, pointer.y, brushTap);
        }
    }

    function loop(now) {
        if (destroyed) return;
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        update(dt);
        render();
        raf = window.requestAnimationFrame(loop);
    }

    // Bacterias decorativas mientras el juego está en el menú.
    teeth[2].germ = { t: 1.5, dur: 1e9 };
    teeth[9].germ = { t: 3, dur: 1e9 };

    resize();
    raf = window.requestAnimationFrame(loop);

    return {
        start,
        resize,
        destroy() {
            destroyed = true;
            window.cancelAnimationFrame(raf);
            canvas.removeEventListener("pointermove", onPointerMove);
            canvas.removeEventListener("pointerleave", onPointerLeave);
            canvas.removeEventListener("pointerdown", onPointerDown);
            try {
                audioCtx?.close();
            } catch {
                /* ya cerrado */
            }
        },
    };
}

export default function CazacariesGame() {
    const canvasRef = useRef(null);
    const gameRef = useRef(null);
    const mutedRef = useRef(false);
    const overTimerRef = useRef(0);

    const [muted, setMuted] = useState(false);
    const [screen, setScreen] = useState("menu");
    const [hud, setHud] = useState({ score: 0, level: 1, lives: MAX_LIVES });
    const [result, setResult] = useState({ score: 0, best: 0, rank: "", tip: "" });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return undefined;

        const game = createGame({
            canvas,
            mutedRef,
            onHud: setHud,
            onGameOver: (payload) => {
                setResult(payload);
                overTimerRef.current = window.setTimeout(() => setScreen("over"), 700);
            },
        });
        gameRef.current = game;

        const observer = new ResizeObserver(() => game.resize());
        observer.observe(canvas);
        window.addEventListener("resize", game.resize);

        return () => {
            window.clearTimeout(overTimerRef.current);
            observer.disconnect();
            window.removeEventListener("resize", game.resize);
            game.destroy();
            gameRef.current = null;
        };
    }, []);

    const handleStart = useCallback(() => {
        window.clearTimeout(overTimerRef.current);
        setScreen("play");
        gameRef.current?.start();
    }, []);

    const toggleMute = useCallback(() => {
        setMuted((prev) => {
            mutedRef.current = !prev;
            return !prev;
        });
    }, []);

    return (
        <div className="dc-cc mx-auto w-full max-w-[460px] select-none">
            <div className="mb-3 flex items-center justify-between gap-2">
                <span className="dc-cc-pill">⭐ {hud.score}</span>
                <span className="dc-cc-pill">Nivel {hud.level}</span>
                <span className="dc-cc-pill dc-cc-lives">
                    {Array.from({ length: MAX_LIVES }, (_, i) => (
                        <span key={i} className={i < hud.lives ? "" : "dc-cc-off"}>
                            🦷
                        </span>
                    ))}
                </span>
                <button
                    type="button"
                    onClick={toggleMute}
                    className="dc-cc-pill dc-cc-mute"
                    aria-label={muted ? "Activar sonido" : "Silenciar"}
                >
                    {muted ? "🔇" : "🔊"}
                </button>
            </div>

            <div className="dc-cc-stage relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-[#e4b892]/25 shadow-[0_18px_50px_rgba(0,0,0,.45)]">
                <canvas ref={canvasRef} className="dc-cc-canvas block h-full w-full" />

                {screen === "menu" && (
                    <div className="dc-cc-screen">
                        <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                            <span className="golden-sweep">Cazacaries</span>
                        </h3>
                        <p className="max-w-[330px] text-sm leading-relaxed text-white/80">
                            Las bacterias quieren atacar esta sonrisa. ¡Tócalas con el cepillo antes de que se
                            conviertan en caries!
                        </p>
                        <div className="grid w-full max-w-[340px] grid-cols-2 gap-2 text-left text-[12px] leading-snug">
                            <div className="dc-cc-legend">
                                <b>🦠 Bacterias</b>
                                Tócalas rápido. Encadena para combos.
                            </div>
                            <div className="dc-cc-legend">
                                <b>🍭 Dulces</b>
                                ¡No los toques! Alimentan a las bacterias.
                            </div>
                            <div className="dc-cc-legend">
                                <b>🧵 Hilo dental</b>
                                Limpia todas las bacterias de golpe.
                            </div>
                            <div className="dc-cc-legend">
                                <b>💧 Flúor</b>
                                Congela a las bacterias unos segundos.
                            </div>
                        </div>
                        <button type="button" onClick={handleStart} className="dc-cc-btn">
                            ¡A jugar!
                        </button>
                        <p className="text-[11px] text-white/50">Un juego de Dental City</p>
                    </div>
                )}

                {screen === "over" && (
                    <div className="dc-cc-screen">
                        <h3 className="text-2xl font-semibold text-[#e4b892] sm:text-3xl">¡Se acabó!</h3>
                        <div className="text-4xl font-black leading-none text-white">{result.score} puntos</div>
                        <div className="font-bold text-[#e4b892]">{result.rank}</div>
                        <div className="text-xs text-white/60">Tu mejor marca: {result.best}</div>
                        <p className="max-w-[340px] rounded-2xl border border-white/10 bg-white/[.06] px-4 py-3 text-left text-[13px] leading-relaxed text-white/85">
                            💡 <b className="text-[#e4b892]">Consejo:</b> {result.tip}
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <button type="button" onClick={handleStart} className="dc-cc-btn">
                                Jugar otra vez
                            </button>
                            <a href="/#ubicacion" className="dc-cc-btn dc-cc-btn-alt">
                                Agenda tu cita
                            </a>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .dc-cc { -webkit-tap-highlight-color: transparent; }
                .dc-cc-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 1px;
                    white-space: nowrap;
                    border-radius: 999px;
                    border: 1px solid rgba(228,184,146,.28);
                    background: rgba(255,255,255,.06);
                    padding: 6px 12px;
                    font-size: 14px;
                    font-weight: 700;
                    color: #fff;
                    font-family: inherit;
                }
                .dc-cc-mute { cursor: pointer; }
                .dc-cc-mute:hover { background: rgba(255,255,255,.12); }
                .dc-cc-lives span { transition: opacity .3s; }
                .dc-cc-lives .dc-cc-off { opacity: .2; filter: grayscale(1); }
                .dc-cc-stage {
                    background: radial-gradient(circle at 50% 38%, #17314e 0%, #0b1b2b 72%);
                    touch-action: none;
                }
                .dc-cc-canvas { touch-action: none; }
                @media (pointer: fine) { .dc-cc-canvas { cursor: none; } }
                .dc-cc-screen {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    padding: 22px;
                    text-align: center;
                    background: rgba(11,27,43,.93);
                    backdrop-filter: blur(4px);
                }
                .dc-cc-legend {
                    border-radius: 12px;
                    border: 1px solid rgba(255,255,255,.1);
                    background: rgba(255,255,255,.05);
                    padding: 8px 10px;
                    color: rgba(255,255,255,.75);
                }
                .dc-cc-legend b { display: block; font-size: 13px; color: #e4b892; }
                .dc-cc-btn {
                    display: inline-block;
                    border: 0;
                    border-radius: 999px;
                    padding: 12px 28px;
                    font-family: inherit;
                    font-size: 16px;
                    font-weight: 800;
                    cursor: pointer;
                    text-decoration: none;
                    color: #0f2237;
                    background: linear-gradient(90deg,#c89b7b,#e4b892,#c89b7b);
                    box-shadow: 0 4px 0 #9a7454;
                }
                .dc-cc-btn:active { transform: translateY(3px); box-shadow: 0 1px 0 #9a7454; }
                .dc-cc-btn-alt {
                    color: #fff;
                    background: linear-gradient(90deg,#1d4c74,#2a6b9e,#1d4c74);
                    box-shadow: 0 4px 0 #143751;
                }
                .dc-cc-btn-alt:active { box-shadow: 0 1px 0 #143751; }
            `}</style>
        </div>
    );
}
