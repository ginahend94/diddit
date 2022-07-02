import { SplitButton } from "./split-button";
import createNew from "../functions/createNew";
import ToDoContainer from './to-do-container';
import { createList } from '../functions/todoManager';
import { createTaskNode } from "./to-do-container";
import createNoteNode from './note-container';
import render from '../functions/render';
import { getIcon } from "../functions/icon";
import ProjectManager from "../functions/projectManager";
import { createTooltip } from "./tooltip";

export default Profile => {

    const main = document.createElement('main');

    const activeProject = Profile.projects.find(project => {
        return project.active
    });



    const header = document.createElement('header');
    main.append(header);
    const h2 = document.createElement('h2');
    header.append(h2);

    // Display this page if there are no projects yet
    if (!activeProject) {
        header.textContent = 'Click the button below to create a project.'
        const noProject = document.createElement('div');
        main.append(noProject);
        noProject.classList.add('no-projects');
        const button = document.createElement('button');
        noProject.append(button);
        button.textContent = 'Create New Project';
        button.classList.add('no-projects-button');
        button.prepend(getIcon('plus'));
        button.addEventListener('click', ProjectManager.showModal);
        return main;
    }

    h2.textContent = activeProject.name;
    if (activeProject.archived) h2.append(' (Archived)');
    if (activeProject.description) {
        const projectDescription = document.createElement('p');
        header.append(projectDescription);
        projectDescription.classList.add('active-project-description');
        projectDescription.textContent = activeProject.description;
    }

    const listsContainer = document.createElement('div');
    main.append(listsContainer);
    listsContainer.classList.add('lists-container');
    
    const listsHeader = document.createElement('header');
    listsContainer.append(listsHeader);
    listsHeader.classList.add('lists-header');
    const listsH4 = document.createElement('h4');
    listsHeader.append(listsH4);
    listsH4.textContent = `Lists (${activeProject.lists.length})`;

    const listsInner = document.createElement('div');
    listsContainer.append(listsInner);
    listsInner.classList.add('list-inner');

    activeProject.lists.forEach(list => {
        const newList = ToDoContainer(list);
        listsInner.append(newList);
        list.tasks.forEach(a => {
            newList.querySelector('.to-do-list').append(createTaskNode(a));
        });
    })

    const newListButton = document.createElement('button');
    newListButton.classList.add('plus-button')
    newListButton.append(getIcon('plus'));
    listsContainer.append(newListButton);
    createTooltip(newListButton, 'New list');
    newListButton.addEventListener('click', () => {
        createNew('list');
    });

    const notesContainer = document.createElement('div');
    main.append(notesContainer);
    notesContainer.classList.add('notes-container');

    const notesHeader = document.createElement('header');
    notesContainer.append(notesHeader);
    notesHeader.classList.add('notes-header');
    const notesH4 = document.createElement('h4');
    notesHeader.append(notesH4);
    notesH4.textContent = `Notes (${activeProject.notes.length})`;

    const notesInner = document.createElement('div');
    notesContainer.append(notesInner);
    notesInner.classList.add('note-inner');

    let untitledNotes = 0;

    activeProject.notes.forEach(note => {
        if (!note.name) untitledNotes++;
        const newNote = createNoteNode(note, untitledNotes);
        notesInner.append(newNote);
    })

    const newNoteButton = document.createElement('button');
    newNoteButton.classList.add('plus-button')
    newNoteButton.append(getIcon('plus'));
    notesContainer.append(newNoteButton);
    createTooltip(newNoteButton, 'New note');
    newNoteButton.addEventListener('click', () => {
        createNew('note');
    })

    return main;
}