export const selectMultiple = (items) => {
    console.log('okey, ill select multiple! :3')
    items.forEach(item => {
        console.log(item);
        item.classList.add('selectable');
            // console.log(getEventListeners(item))
        item.addEventListener('click', () => {
            if (item.classList.contains('selected')) {
                console.log('removing sel')
                item.classList.remove('selected');
            } else {
                console.log('adding sel')
                item.classList.add('selected');
            }
        })
    })
}

export const selectRow = (row) => {
    row.addEventListener('click', () => {
        if (row.classList.contains('selected')) {
            console.log('removing sel')
            row.classList.remove('selected');
        } else {
            console.log('adding sel')
            row.classList.add('selected');
        }
    })
}