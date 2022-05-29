import save from "./save"
import load from "./load"
import createProfile from "./profile";
import Modal from "../DOM-elements/modal";
import { v4 as uuidv4 } from "uuid";
import render from "./render";
import switchActiveProject from "./switchActiveProject";

if (!load('profile')) {
    console.log('Creating new profile.');
    save('profile', createProfile());
}
const profile = load('profile');

export default (() => {
// test
    const showModal = () => {
        const modalInner = () => {
            const modalBody = document.createElement('div');
            const h3 = document.createElement('h3');
            modalBody.append(h3)
            h3.textContent = 'New project';

            const input = document.createElement('input');
            modalBody.append(input);
            input.type = 'text';
            input.id = 'new-project-name';
            input.placeholder = 'Enter project name...';
            input.required = true;

            const textarea = document.createElement('textarea');
            modalBody.append(textarea)
            textarea.id = 'new-project-description';
            textarea.placeholder = 'Description (optional)';

            const small = document.createElement('small');
            modalBody.append(small);
            small.style.color = 'rgb(var(--danger))';
            small.textContent = 'Name is required.';
            small.classList.add('hidden');
            input.addEventListener('input', () => small.classList.add('hidden'));

            return modalBody
        }

        const modal = Modal.create(
            ['new-project'],
            modalInner(),
            () => confirm(document.getElementById('new-project-name').value, document.getElementById('new-project-description').value, modal),
            'Save',
            true,
            false,
            false
        );
        Modal.open(modal);
    }

    const createProject = (name, description) => {
        const newProject = {
            name,
            description,
            id: uuidv4(),
            active: false,
            archived: false,
            lists: [],
            notes: [],
            files: [],
        };
        profile.projects.push(newProject);
        console.log(profile);
        save('profile', profile);
        return newProject;
    }

    const confirm = (name, description = '', modal) => {
        const warning = document.querySelector('.modal-inner small');
        if (!name) {
            return warning.classList.remove('hidden');
        }
        const project = createProject(name, description);
        Modal.close(modal);
        switchActiveProject(project.id, profile);
    }

    return { showModal }

})();

export const EditProject = project => {
    console.log(`Will eventually edit ${project.name}`);
}


