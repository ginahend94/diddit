import Modal from "../DOM-elements/modal";
import icon from "./icon";

export default () => {
    const modalInner = () => {
        const noteBody = document.createElement('div');

        const titleInput = document.createElement('input');
        noteBody.append(titleInput);
        titleInput.setAttribute('type', 'text');
        titleInput.placeholder = 'Unitled Note'

        const styleButtons = document.createElement('div');
        noteBody.append(styleButtons);
        styleButtons.classList.add('style-buttons');

        const buttonNames = [
            ['clarity:bold-line', ['bold-button']],
            ['clarity:underline-line', ['underline-button']],
            ['clarity:italic-line', ['italic-button']],
            ['clarity:strikethrough-line', ['strikethrough-button']],
            ['clarity:subscript-line', ['subscript-button']],
            ['clarity:superscript-line', ['superscript-button']],
            ['clarity:number-list-line', ['numbered-list-button']],
            ['clarity:bullet-list-line', ['bulleted-list-button']],
            ['clarity:indent-line', ['indent-button']],
            ['clarity:outdent-line', ['outdent-button']],
            ['clarity:block-quote-line', ['blockquote-button']],
            ['clarity:link-line', ['link-button']],
            ['clarity:unlink-line', ['unlink-button']],
            ['clarity:tags-solid', ['tags-button']],
            ['clarity:undo-line', ['undo-button']],
            ['clarity:redo-line', ['redo-button']],
            ['clarity:image-solid', ['image-button']],
            ['bx:happy-alt', ['emoji-button']],
        ];

        buttonNames.forEach(button => {
            const a = document.createElement('button');
            styleButtons.append(a);
            a.classList.add(...button[1]);
            a.append(icon(...button));
        });

        const textBox = document.createElement('div');
        noteBody.append(textBox);
        textBox.classList.add('note-text-box');
        textBox.contentEditable = true;
        textBox.style = ``;
        // textBox.addEventListener('blur', e => console.log(textBox.innerHTML))

        const getText = () => textBox.innerHTML;
        const getTitle = () => titleInput.value;

        return { noteBody, getText, getTitle };
    }

    const modal = Modal.create(
        ['new-note-modal'],
        modalInner().noteBody,
        () => confirm(),
        'Save note',
        true,
        false,
        true
    );
    Modal.open(modal);

    modal.querySelector('.modal').addEventListener('keydown', e => {
        if (e.key == 'Enter') e.stopPropagation();
    })

    const confirm = () => {
        console.log('okey')
        console.log(modalInner().getTitle())
        console.log(modalInner().getText())
    }

    console.log(modal.querySelector('.modal'))
}