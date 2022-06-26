import render from "./render";
import save from "./save";
import load from "./load";

export default (projectId) => {
    console.log('switcheroo')
    const profile = load('profile');
    profile.projects.forEach(project => {
        project.active = false;
    });

    const activeProject = profile.projects[profile.projects.findIndex(project => {
        return project.id == projectId;
    })];
    activeProject.active = true;
    document.title = `${activeProject.name + ' | '}Diddit - To-Do List`;

    console.log(profile)
    save('profile', profile);
    console.log(load('profile'))

    render();
}