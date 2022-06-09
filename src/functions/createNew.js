import load from "./load";
import { createList } from "./todoManager";
import newNoteModal from './noteManager';
import render from "./render";

export default (type) => {
    const profile = load('profile');
    const activeProject = profile.projects[profile.projects.findIndex(a => a.active)];
    console.log(activeProject);
    if (type.toLowerCase() == 'note') {
        console.log('Okay, I\'ll make a new note!');
        newNoteModal();
    } else {
        console.log('new list babey');
        createList(activeProject);
        render();
    }
}