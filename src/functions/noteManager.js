import Modal from "../DOM-elements/modal";
import load from './load';
import save from './save';
import icon from "./icon";
import generateId from './generateId';
import format from "date-fns/format";
import render from './render';

export default () => {

    const profile = load('profile');
    const activeProject = profile.projects[profile.projects.findIndex(a => a.active)];

    const modalInner = (() => {
        const noteBody = document.createElement('div');


        const styleButtons = document.createElement('div');
        // noteBody.append(styleButtons);
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
            ['bx:happy-alt', ['emoji-button']],
            ['carbon:spell-check', ['spell-check-button']]
        ];

        let spellCheckOn = true;

        buttonNames.forEach(button => {
            const a = document.createElement('button');
            styleButtons.append(a);
            a.classList.add(...button[1]);
            a.append(icon(...button));
            if (a.classList.contains('spell-check-button')) {
                a.classList.add(`spell-check-${spellCheckOn}`);
                a.addEventListener('click', e => {
                    spellCheckOn = !spellCheckOn;
                    textBox.spellcheck = spellCheckOn;
                    a.classList.remove(`spell-check-${!spellCheckOn}`);
                    a.classList.add(`spell-check-${spellCheckOn}`);
                    textBox.focus();
                })
                return;
            }
            a.addEventListener('click', e => {
                editSelection();
            })
        });

        const titleInput = document.createElement('input');
        noteBody.append(titleInput);
        titleInput.setAttribute('type', 'text');
        titleInput.placeholder = 'Untitled Note'

        const textBox = document.createElement('div');
        noteBody.append(textBox);
        textBox.classList.add('note-text-box');
        textBox.contentEditable = true;
        textBox.addEventListener('keydown', e => {
            if (e.key != 'Tab') return;
            e.preventDefault();
            insertTab();
        })

        // const getText = () => {
        //     if (textBox.innerHTML) return textBox.innerHTML;
        //     return '--No content--';
        // }
        // const getTitle = () => {
        //     if (titleInput.value) return titleInput.value;
        //     let untitledNotes = 0;
        //     if (activeProject.notes.length) {
        //         console.log('beep')
        //         activeProject.notes.map((note) => {
        //             console.log(note.name.includes('Untitled Note'))
        //             if (note.name.trim() == 'Untitled Note') {
        //                 console.log('ooop its untitled')
        //                 ++untitledNotes;
        //             }
        //             console.log(untitledNotes)
        //             return nextNote;
        //         })
        //     }
        //     console.log(untitledNotes);
        //     return `Untitled Note${untitledNotes ? ' (' + untitledNotes + ')' : ''}`;
        // }

        const getTitle = () => titleInput.value;

        const getText = () => textBox.innerHTML;

        const getTextBox = () => textBox;

        return { noteBody, getText, getTitle, getTextBox };
    })();

    const modal = Modal.create(
        ['new-note-modal'],
        modalInner.noteBody,
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
        console.log(modalInner.getTitle())
        if (!modalInner.getTitle() && !modalInner.getText()) {
            const warningModalInner = () => {
                const body = document.createElement('div')
                body.textContent = 'Note must have at least a title or content.';
                return body;
            }
            let warningModal = Modal.create(
                [],
                warningModalInner(),
                () => Modal.close(warningModal),
                'OK',
                false,
                true,
                false
            )
            return Modal.open(warningModal);
        }
        Modal.close(modal);
        saveNote(createNote());
    }

    const createNote = () => {
        const newNote = {
            name: modalInner.getTitle(),
            content: modalInner.getText(),
            id: `${activeProject.id}.${generateId()}`,
            dateCreatedFormatted: format(new Date(), 'MM-dd-yyyy'),
            dateCreated: new Date(),
        }
        activeProject.notes.push(newNote);
        return newNote;
    }

    const saveNote = note => {
        activeProject.notes = activeProject.notes.map(oldNote => {
            if (oldNote.id == note.id) {
                return oldNote = note;
            }
            return oldNote;
        })
        save('profile', profile);
        render();
    }

    const insertTab = () => {
        if (!window.getSelection) return;
        const selection = window.getSelection();
        if (!selection.rangeCount) return;
        const range = selection.getRangeAt(0);
        range.collapse(true);
        const span = document.createElement('span');
        span.append(document.createTextNode('\t'));
        span.style.whiteSpace = 'pre';
        range.insertNode(span);
        range.setStartAfter(span)
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

export const editNote = (note) => {
    console.log(`Will edit ${note.name}.`);
}

export const duplicateNote = note => {
    console.log(`Will duplicate ${note.name}.`)
}

export const deleteNote = note => {
    console.log(`Will delete ${note.name}.`)
}