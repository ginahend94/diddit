export default projects => {

    const nav = document.createElement('nav');
    nav.classList.add('sidebar');

    const header = document.createElement('header');
    nav.append(header)
    const h1 = document.createElement('h1');
    header.append(h1);
    h1.innerHTML = `Diddit.<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor"
        d="M19,19H5V5H15V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V11H19M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" />
</svg>`;
    
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
    });
    
     
    return nav;
}