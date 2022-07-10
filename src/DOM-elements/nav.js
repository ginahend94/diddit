import { getIcon } from "../functions/icon";
import load from "../functions/load";
import ProjectManager from "../functions/projectManager";
import switchActiveProject from "../functions/switchActiveProject";
import contextMenu from "./context-menu";
import { createTooltip } from "./tooltip";
import { resize } from "../functions/drag";
import openProfile from './user-profile';
import save from "../functions/save";
import { editProfile } from "../functions/profile";
import About from "./about.js";


export default Profile => {

    const nav = document.createElement('nav');
    nav.classList.add('sidebar');

    const header = document.createElement('header');
    nav.append(header)
    const h1 = document.createElement('h1');
    header.append(h1);
    h1.textContent = `Diddit.`;
    h1.append(getIcon('checkbox-marked-outline'));

    const sidebarLower = document.createElement('div');
    sidebarLower.classList.add('sidebar-lower');
    nav.append(sidebarLower);
    let navWidth;
    if (load('navWidth')) {
        navWidth = load('navWidth');
    } else {
        navWidth = '200px';
        save('navWidth', navWidth);
    }
    nav.style.width = navWidth;

    const projectListContainer = document.createElement('div');
    sidebarLower.append(projectListContainer);
    projectListContainer.classList.add('project-list-container');

    const projectList = document.createElement('ul');
    projectListContainer.append(projectList);
    projectList.classList.add('project-list');
    projectList.id = 'project-list';

    Profile.projects.forEach(project => {
        if (project.archived) {
            return console.log(`${project.name} is archived.`);
        }
        const projectInfo = document.createElement('li');
        projectList.append(projectInfo);
        projectInfo.classList.add('project-info');

        projectInfo.addEventListener('contextmenu', e => {
            e.preventDefault();
            const menu = contextMenu.generateMenu('projectOptions', project);
            contextMenu.openMenu(e, menu);
        });

        createTooltip(projectInfo, project.name);

        const projectTitle = document.createElement('span');
        projectInfo.append(projectTitle);
        projectTitle.classList.add('project-title');
        projectTitle.textContent = project.name;

        if (project.active) {
            projectInfo.classList.add('active');
        } else {
            projectInfo.addEventListener('click', () => switchActiveProject(project.id));
        }

        const projectOptions = getIcon('dots-horizontal', ['project-options'])
        projectInfo.append(projectOptions);
        projectOptions.addEventListener('click', e => {
            e.stopPropagation();
            const menu = contextMenu.generateMenu('projectOptions', project);
            contextMenu.openMenu(e, menu);
        })
    });

    const addNewProject = document.createElement('button');
    projectListContainer.append(addNewProject);
    addNewProject.textContent = 'New Project';
    addNewProject.prepend(getIcon('plus'));
    addNewProject.addEventListener('click', ProjectManager.showModal);

    const settingsMenu = document.createElement('ul');
    sidebarLower.append(settingsMenu);
    settingsMenu.classList.add('settings-menu');
    const account = document.createElement('li');
    settingsMenu.append(account)
    account.addEventListener('click', () => {
        openProfile();
    })
    let userIcon;
    let userName;
    if (load('profile')) {
        const Profile = load('profile');
        userIcon = Profile.icon || getIcon('account');
        userName = Profile.name || 'User';
        createTooltip(account, 'Account');
    } else {
        userIcon = getIcon('account');
        userName = 'Account';
    }
    account.append(userIcon);
    account.append(userName);

    const settings = document.createElement('li');
    settingsMenu.append(settings);
    settings.append(getIcon('cog-outline'));
    settings.append('Settings');
    settings.addEventListener('click', () => {
        editProfile();
    })

    const about = document.createElement('li');
    settingsMenu.append(about);
    about.append(getIcon('information-outline'));
    about.append('About');
    about.addEventListener('click', () => {
        About()
    })

    const sideDrag = document.createElement('div');
    sidebarLower.append(sideDrag);
    sideDrag.classList.add('resize-bar');

    resize(nav, 'width');

    return nav;
}