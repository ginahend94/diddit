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


    return main;
}