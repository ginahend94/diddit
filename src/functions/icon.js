import Iconify, { addCollection } from "@iconify/iconify";
import { icons } from '@iconify-json/mdi';
import { getIconData } from '@iconify/utils';
import { iconToSVG } from '@iconify/utils';
import { defaults } from '@iconify/utils/lib/customisations';

const getSVG = (() => {
    const mdiIcons = [
        'checkbox-marked-outline',
        'plus',
        'dots-horizontal',
        'account',
        'cog',
        'information',
        'chevron-down',
        'close-circle',
        'menu',
        'trash-can-outline',
        'archive-outline',
        'square-edit-outline',
        'content-copy',
        'drag',
    ]

    const iconData = mdiIcons.map(icon => {
        const thisIcon = getIconData(icons, icon, true);
        if (!thisIcon) throw new Error(`${icon} does not exist`);
        thisIcon.name = icon;
        return { data: thisIcon, name: thisIcon.name };
    });

    const renderData = iconData.map(icon => {
        const data = iconToSVG(icon.data, defaults);
        return { data, name: icon.name }
    });

    const svgAttributes = renderData.map(icon => ({
        attributes: {
            'xmlns': 'http://www.w3.org/2000/svg',
            'xmlns:xlink': 'http://www.w3.org/1999/xlink',
            ...icon.data.attributes,
        },
        name: icon.name,
        body: icon.data.body,
    }));

    const svgStrs = []

    svgAttributes.forEach(icon => {
        return svgStrs.push([
            icon.name,
            {
                attributes: Object.keys(icon.attributes).map(key => {
                    return `${key}="${icon.attributes[key]}"`
                }).join(' '),
                body: icon.body,
            }])
    })

    let svgAttrStrings = Object.fromEntries(svgStrs);

    return {svgAttrStrings}
})();

export default (iconName, classes = []) => {
    if (!iconName) return false;
    const icon = document.createElement('i');
    icon.classList.add('iconify');
    classes.forEach(className => icon.classList.add(className));
    icon.dataset.icon = iconName;
    return icon;
}

export const getIcon = (iconName, classes = []) => {

    const icon = getSVG.svgAttrStrings[iconName];
    const svg = `<svg ${icon.attributes}>${icon.body}</svg>`
    const i = document.createElement('i');
    i.classList.add('iconify-icon', ...classes);
    i.innerHTML = svg;

    return i;
}