import icon from "../functions/icon";
import load from "../functions/load";
import ProjectManager from "../functions/projectManager";
import switchActiveProject from "../functions/switchActiveProject";


export default Profile => {

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

    Profile.projects.forEach(project => {
        const projectInfo = document.createElement('li');
        projectList.append(projectInfo);
        projectInfo.classList.add('project-info');

        const projectTitle = document.createElement('span');
        projectInfo.append(projectTitle);
        projectTitle.classList.add('project-title');
        projectTitle.textContent = project.name;

        if (project.active) {
            projectInfo.classList.add('active');
        }

        projectInfo.addEventListener('click', () => switchActiveProject(project.id, Profile));

        projectInfo.append(icon('ic:baseline-more-horiz', ['project-options']));
    });

    const addNewProject = document.createElement('button');
    projectListContainer.append(addNewProject);
    addNewProject.textContent = 'New Project';
    addNewProject.prepend(icon('ic:round-plus'));
    addNewProject.addEventListener('click', ProjectManager.showModal);

    const settingsMenu = document.createElement('ul');
    sidebarLower.append(settingsMenu);
    settingsMenu.classList.add('settings-menu');
    const account = document.createElement('li');
    settingsMenu.append(account)
    let userIcon;
    let userName;
    if (load('profile')) {
        const Profile = load('profile');
        userIcon = Profile.icon;
        userName = Profile.name;
        account.title = 'Account';
    } else {
        userIcon = 'mdi:account';
        userName = 'Account';
    }
    account.append(icon(userIcon));
    account.append(userName);
    
    const settings = document.createElement('li');
    settingsMenu.append(settings);
    settings.append(icon('mdi:cog'));
    settings.append('Settings');

    const about = document.createElement('li');
    settingsMenu.append(about);
    about.append(icon('mdi:information'));
    about.append('About');

    return nav;
}