import save from "./save"
import load from "./load"
import createProfile from "./createProfile";
import Modal from "../DOM-elements/modal";
import { v4 as uuidv4 } from "uuid";
import render from "./render";
import switchActiveProject from "./switchActiveProject";

export default (() => {
    if (!load('profile')) {
        console.log('Creating new profile.');
        save('profile', createProfile());
    }
    const profile = load('profile');

    const showModal = () => {
        const innerHTML = `<h3>New project</h3><input type="text" id="new-project-name" placeholder="Enter project name..." required><textarea id="new-project-description" placeholder="Description(optional)">`
        
        const modal = Modal.create(
            ['new-project'],
            innerHTML,
            () => confirm(document.getElementById('new-project-name').value,document.getElementById('new-project-description').value, modal),
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
        const project = createProject(name, description);
        Modal.close(modal);
        switchActiveProject(project.id, profile);
    }

    return { showModal }

})();



