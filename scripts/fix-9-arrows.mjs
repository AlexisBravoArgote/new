import fs from "fs";

const p = "src/components-react/blog-posts/9.jsx";
let s = fs.readFileSync(p, "utf8");
let n = 0;
s = s.replace(/>\s*\uFFFD\s*<\/button>/g, () => {
    n += 1;
    return n === 1
        ? ">\n                                <Chevron dir=\"left\" />\n                            </button>"
        : ">\n                                <Chevron dir=\"right\" />\n                            </button>";
});
s = s.replace(/artículoálos/g, "artículos");
fs.writeFileSync(p, s);
console.log("replaced arrows:", n, "fffd:", (s.match(/\uFFFD/g) || []).length);
