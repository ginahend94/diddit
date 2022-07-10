import createNew from "../functions/createNew";
import ToDoContainer from './to-do-container';
import { createTaskNode } from "./to-do-container";
import createNoteNode from './note-container';
import { getIcon } from "../functions/icon";
import ProjectManager from "../functions/projectManager";
import { createTooltip } from "./tooltip";
import { resize } from "../functions/drag";
import load from "../functions/load";
import save from "../functions/save";

const Main = Profile => {

    const main = document.createElement('main');

    const activeProject = Profile.projects.find(project => {
        return project.active
    });

    const header = document.createElement('header');
    main.append(header);
    const h2 = document.createElement('h2');
    header.append(h2);

    if (!activeProject) { // Display this page if there are no projects yet
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

    const projectContainer = document.createElement('div');
    main.append(projectContainer);
    projectContainer.classList.add('project-container');

    const listsContainer = document.createElement('div');
    projectContainer.append(listsContainer);
    listsContainer.classList.add('container');

    const listsHeader = document.createElement('header');
    listsContainer.append(listsHeader);
    const listsH4 = document.createElement('h4');
    listsHeader.append(listsH4);
    listsH4.textContent = `Lists (${activeProject.lists.length})`;

    const newListButton = newButton('list');
    listsHeader.append(newListButton);

    const listsInner = document.createElement('div');
    listsContainer.append(listsInner);
    listsInner.classList.add('project-inner');
    listsInner.style.display = 'grid';

    const collapseListButton = collapseButton(listsInner);
    listsHeader.append(collapseListButton);

    activeProject.lists.forEach(list => {
        const newList = ToDoContainer(list);
        listsInner.append(newList);
        list.tasks.forEach(a => {
            newList.querySelector('.to-do-list').append(createTaskNode(a));
        });
    })

    const notesContainer = document.createElement('div');
    projectContainer.append(notesContainer);
    notesContainer.classList.add('container');
    let notesHeight;
    if (load('notesHeight')) {
        notesHeight = load('notesHeight');
    } else {
        notesHeight = '50%';
        save('notesHeight', notesHeight);
    }
    notesContainer.style.height = notesHeight;

    const resizeBar = document.createElement('div');
    notesContainer.append(resizeBar);
    resizeBar.classList.add('resize-bar');

    const notesHeader = document.createElement('header');
    notesContainer.append(notesHeader);
    const notesH4 = document.createElement('h4');
    notesHeader.append(notesH4);
    notesH4.textContent = `Notes (${activeProject.notes.length})`;

    const newNoteButton = newButton('note');
    notesHeader.append(newNoteButton);

    const notesInner = document.createElement('div');
    notesContainer.append(notesInner);
    notesInner.classList.add('project-inner');
    notesInner.style.display = 'grid';

    const collapseNoteButton = collapseButton(notesInner);
    notesHeader.append(collapseNoteButton);

    let untitledNotes = 0;

    activeProject.notes.forEach(note => {
        if (!note.name) untitledNotes++;
        const newNote = createNoteNode(note, untitledNotes);
        notesInner.append(newNote);
    })

    resize(notesContainer, 'height');

    return main;
}

const collapse = (() => {
    const trigger = section => {
        if (section.style.display == 'grid') {
            section.style.display = 'none';
        } else {
            section.style.display = 'grid';
        }
    }
    return { trigger }
})();

const newButton = (type) => {
    const button = document.createElement('button');
    button.classList.add('plus-button')
    button.append(getIcon('plus'));
    createTooltip(button, `New ${type}`);
    button.addEventListener('click', () => {
        createNew(type);
    });
    return button;
}

const collapseButton = (section) => {
    const button = document.createElement('button');
    button.classList.add('collapse-button');
    button.append(getIcon('chevron-double-up'));
    createTooltip(button, 'Collapse/Expand');
    button.addEventListener('click', () => {
        collapse.trigger(section);
    });
    button.addEventListener('click', () => {
        if (button.classList.contains('flip')) {
            button.classList.remove('flip');
        } else {
            button.classList.add('flip');
        }
    })
    return button;
}
export default Main;