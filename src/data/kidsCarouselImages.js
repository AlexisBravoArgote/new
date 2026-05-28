const KIDS_IMAGE_PATHS = [
    "/assets/kids0.jpg",
    "/assets/kids2.jpg",
    "/assets/kids3.jpg",
    "/assets/kids4.jpg",
    "/assets/kids5.jpg",
    "/assets/kids6.jpg",
    "/assets/kids22.jpg",
    "/assets/kids21.jpg",
    "/assets/kids20.jpg",
    "/assets/kids19.jpg",
    "/assets/kids18.jpg",
    "/assets/kids17.jpg",
    "/assets/kids16.jpg",
    "/assets/kids15.jpg",
    "/assets/kids14.jpg",
    "/assets/kids13.jpg",
    "/assets/kids12.jpg",
    "/assets/kids11.jpg",
    "/assets/kids10.jpg",
    "/assets/kids9.jpg",
    "/assets/kids8.jpg",
    "/assets/kids7.jpg",
];

export function getKidsCarouselImages(alt = "Dental City Kids") {
    return KIDS_IMAGE_PATHS.map((src) => ({ src, alt }));
}
