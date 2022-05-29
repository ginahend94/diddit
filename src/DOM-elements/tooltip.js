export const tooltip = ((e, boolean) => {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');

    return { tooltip };
})();

export const handleTooltip = (e, boolean) => {
    let mouseIsOver = boolean;

    const showTooltip = () => {
        // const timeout = setTimeout(() => {
        //     document.body.append(tooltip.tooltip);
        //     tooltip.tooltip.style = `top:${e.clientY + 10}px;left:${e.clientX}px`;
        // }, 500);
        // return timeout;
        document.body.append(tooltip.tooltip);
        tooltip.tooltip.style = `top:${e.clientY + 10}px;left:${e.clientX}px`;
    };

    if (mouseIsOver) {
        if (e.type == 'mouseenter') {
            setTimeout(() => {
                if (mouseIsOver) showTooltip();
            }, 500);
            return
        }
        showTooltip();
    }
    if (!mouseIsOver && document.body.contains(tooltip.tooltip)) {
        document.body.removeChild(tooltip.tooltip);
    }
    console.log(mouseIsOver);
}