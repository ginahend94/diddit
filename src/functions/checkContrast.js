// adapted from https://www.30secondsofcode.org/js/s/hsl-to-rgb

const HSLToRGB = (h, s, l) => {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
};

const componentToHex = c => {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

const RGBToHex = (r, g, b) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const hexColor = colorObj => {
    const rgb = HSLToRGB(colorObj.h, colorObj.s, colorObj.l);
    return RGBToHex(...rgb);
}

// `https://webaim.org/resources/contrastchecker/?fcolor=#FFFFFF&bcolor=${hexColor(profile.colorPalette)}&api`

const getBrightness = ([...rgb]) => ((rgb[0] * 299) + (rgb[1] * 587) + (rgb[2] * 114)) / 1000;