const slider = (() => {
    const root = document.documentElement;

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

    const bright = document.createElement('button');
    buttons.append(bright);
    bright.textContent = 'Bright';
    bright.classList.add('selected');

    const muted = document.createElement('button');
    buttons.append(muted);
    muted.textContent = 'Muted';

    const colorButtons = buttons.querySelectorAll('button');
    console.log(colorButtons);

    colorButtons.forEach(button => {
        button.addEventListener('click', e => {
            switchActive(e.target);
            setLuminance(e);
        })
    })

    const switchActive = button => {
        colorButtons.forEach(a => a.classList.remove('selected'));
        button.classList.add('selected');
    }

    const colorRange = document.createElement('input');
    body.append(colorRange)
    colorRange.type = 'range';

    const setLuminance = (e) => {
        let lum = '50';
        switch (e.target.textContent) {
            case 'Pastel':
                lum = '70';
                break;
            case 'Muted':
                lum = '20';
                break;
            case 'Bright':
                lum = '50';
                break;
            default:
                lum = '50';
                break;
        }
        console.log(lum);
        return lum;
    }


    const getColor = () => console.log();

    return { body, getColor }
})()

export default slider;