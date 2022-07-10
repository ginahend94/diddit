// adapted from https://www.30secondsofcode.org/js/s/hsl-to-rgb

const HSLToRGB = (h, s, l) => {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    console.log([Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))])
    return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
};

// adapted from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

const componentToHex = c => {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

const RGBToHex = (r, g, b) => {
    return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// ok this is me again

const hexColor = colorObj => {
    const rgb = HSLToRGB(colorObj.h, colorObj.s, colorObj.l);
    console.log(colorObj)
    console.log(rgb)
    return RGBToHex(...rgb);
}

const getRatio = async (hex) => {
    fetch(`https://webaim.org/resources/contrastchecker/?fcolor=FFFFFF&bcolor=${hex}&api`)
        .then((response) => response.json())
        .then(data => { console.log(data); return data.ratio })
        .then(ratio => switchColor(ratio))
        .catch(err => console.log(err))
}

const switchColor = ratio => {
    const root = document.documentElement;
    if (ratio >= 6) {
        root.style.setProperty('--dynamic-color', 'rgb(234,234,234');
    } else {
        root.style.setProperty('--dynamic-color', 'rgb(0,0,0)');
    }
}

export const checkProfile = colorObj => {
    getRatio(hexColor(colorObj));
}