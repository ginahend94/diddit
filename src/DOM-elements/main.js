import { SplitButton } from "./split-button";
import ToDoContainer from './to-do-container';
import { createList } from '../functions/todoManager';
import { createTaskNode } from "./to-do-container";
import render from '../functions/render';

export default Profile => {
    
    const main = document.createElement('main');

    const activeProject = Profile.projects.find(project => {
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
            // console.log(a)
            newList.querySelector('.to-do-list').append(createTaskNode(a));
        });
        
    })

    const splitButton = SplitButton();

    projectContainer.append(splitButton.addNew);
    splitButton.splitButtonButton.addEventListener('click', () => {
        createList(activeProject);
        render();
    })

    return main;
}