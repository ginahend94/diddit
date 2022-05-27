import save from "./save"
import load from "./load"
import createProfile from "./createProfile";
import Modal from "../DOM-elements/modal";
import { v4 as uuidv4 } from "uuid";

export default (() => {
    if (!load('profile')) {
        console.log('Creating new profile.');
        save('profile', createProfile());
    }
    const profile = load('profile');

    const showModal = () => {
        const innerHTML = `<h3>Name your project</h3><input type="text" id="new-project-name" placeholder="Enter project name..." required>`
        
        const modal = Modal.create(
            ['new-project'],
            innerHTML,
            () => confirm(document.getElementById('new-project-name').value, modal),
            'Save',
            true,
            false,
            false
        );
        Modal.open(modal);
    }

    const createProject = name => {
        profile.projects.push({
            name,
            id: uuidv4(),
            archived: false,
            lists: [],
            notes: [],
            files: [],
        });
        console.log(profile);
    }

    const confirm = (name, modal) => {
        createProject(name);
        Modal.close(modal);
        save('profile', profile);
    }

    return { showModal }

})();



