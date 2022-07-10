import load from "../functions/load";
import preview from "./color-preview";
const slider = (() => {
    const root = document.documentElement;
    const profile = load('profile');

    const body = document.createElement('div');
    body.classList.add('color-picker-container');

    const h5 = document.createElement('h5');
    body.append(h5);
    h5.textContent = 'Color Palette:'

    const buttons = document.createElement('div');
    body.append(buttons);
    buttons.classList.add('buttons');

    const pastel = document.createElement('button');
    buttons.append(pastel);
    pastel.textContent = 'Pastel';
    pastel.classList.add('selected');

    const bright = document.createElement('button');
    buttons.append(bright);
    bright.textContent = 'Bright';

    const dark = document.createElement('button');
    buttons.append(dark);
    dark.textContent = 'Dark';

    const colorButtons = buttons.querySelectorAll('button');

    colorButtons.forEach(button => {
        button.addEventListener('click', e => {
            switchActive(e.target);
            setLuminance(e);
            updateSliderBg();
        })
    })

    const switchActive = button => {
        colorButtons.forEach(a => a.classList.remove('selected'));
        button.classList.add('selected');
    }

    const updateSliderBg = () => {
        root.style.setProperty('--slider-bg', `hsl(${colorRange.value}, 70%, ${lum}%)`);
    }

    const colorRange = document.createElement('input');
    body.append(colorRange);
    colorRange.type = 'range';
    colorRange.min = 0;
    colorRange.max = 360;
    colorRange.value = profile.colorPalette ? profile.colorPalette.h : 257;
    colorRange.addEventListener('input', e => {
        root.style.setProperty('--slider-bg', `hsl(${e.target.value}, 70%, ${lum}%)`);
    })

    let lum = '70';
    const setLuminance = (e) => {
        switch (e.target.textContent) {
            case 'Pastel':
                lum = '70';
                break;
            case 'Dark':
                lum = '30';
                break;
            case 'Bright':
                lum = '50';
                break;
            default:
                lum = '70';
                break;
        }
    }

    body.append(preview())

    const getColor = () => ({ h: colorRange.value, s: '70%', l: lum });

    return { body, getColor }
})()

export default slider;