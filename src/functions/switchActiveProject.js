import render from "./render";
import save from "./save";
import load from "./load";

export default (projectId) => {
    const profile = load('profile');
    profile.projects.forEach(project => {
        project.active = false;
    });

    const activeProject = profile.projects[profile.projects.findIndex(project => {
        return project.id == projectId;
    })];
    activeProject.active = true;
    document.title = `${activeProject.name + ' | '}Diddit - To-Do List`;

    save('profile', profile);
    render();
}