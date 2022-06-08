export const tooltip = (() => {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    return { tooltip };
})();

export const handleTooltip = (e, boolean,) => {
    let mouseIsOver = boolean;

    const showTooltip = () => {
        document.body.append(tooltip.tooltip);
        tooltip.tooltip.style = `top:${e.clientY + 20}px;left:${e.clientX}px`;
    };

    if (mouseIsOver) {
        showTooltip();
    }
}

export const isOverflowing = (e) => {
    return (e.offsetWidth < e.scrollWidth);
}