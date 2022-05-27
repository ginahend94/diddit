const iconHTML = {
    options: "M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z",
    account: "M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z",
    settings: "M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
    about: "M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
    drag: "M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z",
    dropdown: "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z",
    clear: "M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z",
    logo: "M19,19H5V5H15V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V11H19M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z",

}

export const icon = (() => {
    const createSvg = (size, name) => {
        let svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
        svg.setAttribute('width', size + 'px');
        svg.setAttribute('height', size + 'px');
        svg.setAttribute(`viewBox`, '0 0 24 24');
        let path = document.createElement('path');
        svg.append(path);
        path.setAttribute('fill', 'currentColor');
        path.setAttribute('d', iconHTML[name]);

        return svg;
    };

    const options = createSvg(24, 'options');
    const account = createSvg(24, 'account');
    const settings = createSvg(24, 'settings');
    const about = createSvg(24, 'about');
    const drag = createSvg(24, 'drag');
    const dropdown = createSvg(24, 'dropdown');
    const clear = createSvg(15, 'clear');
    const logo = createSvg(24, 'logo');

    console.log(options);
    return { options, account, settings, about, drag, dropdown, clear, logo };

})()