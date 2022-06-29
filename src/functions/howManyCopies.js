const howManyCopies = (prof, projType, item) => {
    const plainTitle = item.name.search(/\(copy/) < 0 ? item.name.trim() : item.name.slice(0, item.name.search(/\(copy/)).trim();
    let count = 0;
    for (let project in prof[projType]) {
        if (prof[projType][project].name.includes(`${plainTitle} (copy`)) {
            ++count;
        }
    }
    return `${plainTitle} (copy${count > 0 ? ' ' + parseInt(count + 1) : ''})`;
}

export default howManyCopies;