import render from "./render";
import save from "./save";

export default (projectId, Profile) => {
    Profile.projects.forEach(project => {
        project.active = false;
    });

    Profile.projects.find(project => project.id == projectId).active = true;
    save('profile', Profile);
    render();
}