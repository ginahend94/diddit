import Iconify from "@iconify/iconify";
export default (iconName, classes = []) => {
    const icon = document.createElement('i');
    icon.classList.add('iconify');
    classes.forEach(className => icon.classList.add(className));
    icon.dataset.icon = iconName;
    return icon;
}