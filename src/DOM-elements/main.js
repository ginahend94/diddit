// import { getIcon } from "../functions/icon";
import { SplitButton } from "./split-button";
import NewList from './to-do'

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

    const splitButton = SplitButton()

    projectContainer.append(splitButton.addNew);
    splitButton.splitButtonButton.addEventListener('click', () => {
        projectContainer.prepend(NewList(activeProject));
    })

    return main;
}