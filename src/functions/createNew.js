import load from "./load";
import { createList } from "./todoManager";
import newNoteModal from './noteManager';
import render from "./render";

export default (type) => {
    const profile = load('profile');
    const activeProject = profile.projects[profile.projects.findIndex(a => a.active)];
    if (type.toLowerCase() == 'note') {
        newNoteModal();
    } else {
        createList(activeProject);
        render();
    }
}