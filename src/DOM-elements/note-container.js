import { getIcon } from "../functions/icon";
import contextMenu from "./context-menu";

export default (note, i) => {
    const noteContainer = document.createElement('div');
    noteContainer.classList.add('note-container');
    noteContainer.id = note.id;

    const noteOptions = getIcon('dots-vertical', ['note-options']);
    noteContainer.append(noteOptions);
    noteOptions.addEventListener('click', e => {
        const menu = contextMenu.generateMenu('noteOptions', note);
        contextMenu.openMenu(e, menu);
    })

    const noteHeader = document.createElement('h5');
    noteContainer.append(noteHeader);
    noteHeader.classList.add('note-header');
    noteHeader.textContent = note.name || `Untitled Note ${i > 1 ? '('+ i+ ')':''}`;

    const noteBody = document.createElement('div');
    noteContainer.append(noteBody);
    noteBody.classList.add('note-body');
    noteBody.innerHTML = note.content;

    noteContainer.addEventListener('contextmenu', e => {
        e.preventDefault();
        const menu = contextMenu.generateMenu('noteOptions', note);
        contextMenu.openMenu(e, menu);
    });

    return noteContainer;
}