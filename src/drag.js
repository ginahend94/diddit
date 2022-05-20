const draggables = document.querySelectorAll('.drag-element');
const containers = document.querySelectorAll('.drag-container');
const icons = document.querySelectorAll('.drag');

icons.forEach(a => {
    a.addEventListener('mousedown', () => {
        a.parentNode.classList.add('draggable')
        a.parentNode.draggable = 'true'
    });
    a.addEventListener('dragend', () => {
        console.log(a.parentNode.classList)
        a.parentNode.setAttribute('draggable', false)
        setTimeout(() => a.parentNode.classList.remove('draggable'), 2)
    })
})

draggables.forEach(a => {
    a.addEventListener('dragstart', () => {
        a.style.background = 'green'; // CHANGE
        setTimeout(() => a.style.background = 'inherit', 1); // CHANGE
        a.classList.add('dragging');
    });
    a.addEventListener('dragend', () => {
        a.classList.remove('dragging');
        a.classList.remove('draggable');
        a.setAttribute('draggable', false);
    })
})

containers.forEach(a => {
    a.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(a, e.clientY);
        const draggable = document.querySelector('.dragging');
        if (afterElement == null) {
            if (a.id != draggable.dataset.container) return
            a.append(draggable);
        } else {
            a.insertBefore(draggable, afterElement)
        }
    })
})

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(`.drag-element:not(.dragging)`)].filter(a => a.dataset.container == document.querySelector('.dragging').dataset.container);
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}