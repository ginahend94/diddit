export default (() => {
    const Modal = (classes = [], innerHTML, showModalBg, draggable) => {
        const modalContainer = document.createElement('div');
        const modalBg = document.createElement('div');
        modalContainer.append(modalBg);
        modalBg.classList.add('modal-bg');
        if (!showModalBg) modalBg.classList.add('hidden');

        const modal = document.createElement('div');
        modalContainer.append(modal);
        modal.classList.add('modal');

        if (draggable) {
            const dragBar = document.createElement('div');
            modal.append(dragBar);
            dragBar.classList.add('drag-bar');
            for (let i = 0; i < 3; i++) {
                dragBar.append(document.createElement('div'));
            };
        }

        const modalBody = document.createElement('div');
        modal.append(modalBody);
        classes.forEach(className => modalBody.classList.add('modal-inner'));
        modalBody.innerHTML = innerHTML;

        modalBg.addEventListener('click', closeModal);
        return modalContainer;
    }

    const closeModal = e => {
        e.target.parentElement.classList.add('hidden');
    }

    const openModal = () => {

    }
})();