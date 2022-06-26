import { SplitButton } from "./split-button";
import createNew from "../functions/createNew";
import ToDoContainer from './to-do-container';
import { createList } from '../functions/todoManager';
import { createTaskNode } from "./to-do-container";
import createNoteNode from './note-container';
import render from '../functions/render';

export default Profile => {
    
    const main = document.createElement('main');

    const activeProject = Profile.projects.find(project => {
        // console.log(project)
        return project.active
    });

    const header = document.createElement('header');
    main.append(header);
    const h2 = document.createElement('h2');
    header.append(h2);
    h2.textContent = activeProject.name;
    if (activeProject.description) {
        const projectDescription = document.createElement('p');
        header.append(projectDescription);
        projectDescription.classList.add('active-project-description');
        projectDescription.textContent = activeProject.description;
    }

    const projectContainer = document.createElement('div');
    main.append(projectContainer);
    projectContainer.classList.add('project-container');
    
    activeProject.lists.forEach(list => {
        const newList = ToDoContainer(list);
        projectContainer.prepend(newList);
        list.tasks.forEach(a => {
            newList.querySelector('.to-do-list').append(createTaskNode(a));
        });
    })

    if (activeProject.lists.length) {
        const listsHeader = document.createElement('h4');
        listsHeader.classList.add('lists-header');
        listsHeader.textContent = 'Lists';
        projectContainer.prepend(listsHeader);
    }

    const splitButton = SplitButton();

    projectContainer.append(splitButton.addNew);
    splitButton.splitButtonButton.addEventListener('click', () => {
        createNew(splitButton.getNewType());
        // render();
    })
    
    if (activeProject.notes.length) {
        const notesHeader = document.createElement('h4');
        notesHeader.classList.add('notes-header');
        notesHeader.textContent = 'Notes';
        projectContainer.append(notesHeader);
    }

    let untitledNotes = 0;

    activeProject.notes.forEach(note => {
        if (!note.name) untitledNotes++;
        const newNote = createNoteNode(note, untitledNotes);
        projectContainer.append(newNote);
    })

    return main;
}