import render from "./render";
import save from "./save";

export default (projectId, Profile) => {
    Profile.projects.forEach(project => {
        project.active = false;
    });

    const activeProject = Profile.projects.find(project => {
        return project.id == projectId;
    });
    activeProject.active = true;
    document.title = `${activeProject.name} | Diddit - To-Do List`;
    
    save('profile', Profile);

    render();
}