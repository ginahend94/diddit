import { createTooltip } from "./tooltip";

const toggle = () => {
    const body = document.createElement('div');
    body.classList.add('slider-container');
    const darkModeInput = document.createElement('input');
    body.append(darkModeInput);
    darkModeInput.type = 'checkbox';
    darkModeInput.classList.add('dark-mode-input');
    darkModeInput.id = 'dark-mode-input';
    darkModeInput.addEventListener('input', e => {
        createTooltip(outer, `${e.target.checked ? 'Turn on light mode' : 'Turn on dark mode'}`)
    })
    const outer = document.createElement('label');
    body.append(outer);
    outer.classList.add('dark-mode-outer');
    outer.setAttribute('for', 'dark-mode-input');
    const darkModeSlider = document.createElement('span');
    outer.append(darkModeSlider);
    darkModeSlider.classList.add('dark-mode-slider');

    return body;
}

export default toggle;