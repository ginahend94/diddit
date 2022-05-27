import icon from "./icon";
export default projects => {

    const nav = document.createElement('nav');
    nav.classList.add('sidebar');

    const header = document.createElement('header');
    nav.append(header)
    const h1 = document.createElement('h1');
    header.append(h1);
    h1.textContent = `Diddit.`;
    h1.append(icon('mdi:checkbox-marked-outline'));
    
    const sidebarLower = document.createElement('div');
    sidebarLower.classList.add('sidebar-lower');
    nav.append(sidebarLower);
    const projectListContainer = document.createElement('div');
    sidebarLower.append(projectListContainer);
    projectListContainer.classList.add('project-list-container');

    const projectList = document.createElement('ul');
    projectListContainer.append(projectList);
    projectList.classList.add('project-list');
    projectList.id = 'project-list';

    projects.forEach(project => {
        const projectInfo = document.createElement('li');
        projectList.append(projectInfo);
        projectInfo.classList.add('project-info');

        const projectTitle = document.createElement('span');
        projectInfo.append(projectTitle);
        projectTitle.classList.add('project-title');
        projectTitle.textContent = project.name;

        projectInfo.append(icon('ic:baseline-more-horiz', ['project-options']));
    });
    
    const addNewProject = document.createElement('button');
    projectListContainer.append(addNewProject);
    addNewProject.textContent = 'New Project';
    addNewProject.prepend(icon('ic:round-plus'));
     
    return nav;
}