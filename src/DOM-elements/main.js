import { getIcon } from "../functions/icon";
import { splitButton } from "./split-button";

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

    // const addNew = document.createElement('div');
    // projectContainer.append(addNew);
    // addNew.classList.add('add-new');

    // const splitButtonButton = document.createElement('button');
    // addNew.append(splitButtonButton);
    // splitButtonButton.classList.add('split-button-button');
    // splitButtonButton.textContent = 'New';

    // const splitButtonDropdown = document.createElement('button')
    // addNew.append(splitButtonDropdown);
    // splitButtonDropdown.classList.add('split-button-dropdown');

    // const type = document.createElement('span');
    // splitButtonDropdown.append(type);
    // type.textContent = 'List';
    // splitButtonDropdown.append(getIcon('chevron-down'));

    // const splitButtonDropdownList = document.createElement('ul');
    // splitButtonDropdown.append(splitButtonDropdownList);
    // splitButtonDropdownList.classList.add('split-button-dropdown-list');

    // const note = document.createElement('li');
    // splitButtonDropdownList.append(note);
    // note.textContent = 'Note';

    // const list = document.createElement('li');
    // splitButtonDropdownList.append(list);
    // list.textContent = 'List';

    projectContainer.append(splitButton());

    return main;
}