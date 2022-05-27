export default (() => {
    const Modal = (classes = [], innerHTML, confirmFunction, confirmText, showCancel, showModalBg, draggable) => {
        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal-container');
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
        modalBody.classList.add('modal-inner');
        classes.forEach(className => modalBody.classList.add(className));
        modalBody.innerHTML = innerHTML;

        const buttons = document.createElement('div');
        modal.append(buttons);
        buttons.classList.add('buttons');
        const confirm = document.createElement('button');
        buttons.append(confirm);
        confirm.textContent = confirmText;
        confirm.addEventListener('click', confirmFunction);

        if (showCancel) {
            const cancel = document.createElement('button');
            buttons.append(cancel);
            cancel.classList.add('cancel');
            cancel.textContent = 'Cancel';
            cancel.addEventListener('click', closeModal.bind(cancel, modalContainer));
        }

        modalBg.addEventListener('click', closeModal.bind(modalBg, modalContainer));

        return modalContainer;
    };

    const closeModal = modal => {
        modal.classList.remove('shown');
        modal.classList.add('hidden');
        document.body.removeChild(modal);
    };

    const openModal = modal => {
        document.body.append(modal);
        modal.classList.remove('hidden');
        modal.classList.add('shown');
    };

    return { create:Modal, open:openModal, close:closeModal }
})();

// const innerHTML = `<h2>are you sure?</h2><button>yes</button><button>no</button>`;
// const confirm = Modal.create([confirm], innerHTML, true, false) -> that should return a modal div
// button.addEventListener('click', Modal.close.bind(button, confirm)) -> arg is div to add hidden class to
// button.addEventListener('click', Modal.open.bind(button, cofirm))