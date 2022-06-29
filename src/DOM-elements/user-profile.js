import Modal from "./modal";
import save from "../functions/save";
import load from "../functions/load";
import { getIcon } from "../functions/icon";
import icon from '../functions/icon';
import { unarchiveProject } from '../functions/projectManager';

export default () => {
    const profile = load('profile');
    const modalInner = () => {
        const body = document.createElement('div');

        const header = document.createElement('header');
        body.append(header);

        const profileIcon = icon(profile.icon) || getIcon('account');
        header.append(profileIcon);
        profileIcon.classList.add('user-icon');

        const userName = document.createElement('span');
        header.append(userName);
        userName.classList.add('user-name');
        userName.textContent = profile.name || 'User';

        const userBio = document.createElement('p');
        body.append(userBio);
        userBio.classList.add('user-bio');
        userBio.textContent = profile.bio;

        const menu = document.createElement('ul');
        body.append(menu);
        const projects = document.createElement('li');
        menu.append(projects);
        projects.append(getIcon('folder-outline'), ' Projects');
        projects.addEventListener('click', e => {
            console.log('Projects: ', profile.projects);
        })

        const archive = document.createElement('li');
        menu.append(archive);
        archive.append(getIcon('archive-outline'), ' Archive');
        archive.addEventListener('click', e => {
            const archived = profile.projects.filter(a => a.archived);
            showArchive();
        })

        return body
    }

    const modal = Modal.create(
        ['user-profile'],
        modalInner(),
        () => Modal.close(modal),
        'Close',
        false,
        true,
        true
    )
    Modal.open(modal);

    const showArchive = () => {
        const modalBody = modal.querySelector('.modal-inner');
        let innerHTML =
            `<table class="archived-projects">
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Date Created</th>
                    <th>Unarchive</th>
                </tr>`;
        modalBody.innerHTML = (() => {
            for (let project in profile.projects) {
                if (profile.projects[project].archived) {
                    innerHTML +=
                        `<tr>
                            <td class="project-name">${profile.projects[project].name}</td>
                            <td class="project-description">${profile.projects[project].description}</td>
                            <td class="project-date">${profile.projects[project].dateCreatedFormatted}</td>
                            <td class="unarchive-project"><button data-project='${profile.projects[project].id}'></button></td>
                        </tr>`;
                }
            }
            innerHTML += `</table>`;
            return innerHTML;
        })()
        const unarchiveButtons = modalBody.querySelectorAll('.unarchive-project button');
        unarchiveButtons.forEach(button => {
            button.append(getIcon('archive-arrow-up-outline'));
            button.title = 'Unarchive Project';
            button.addEventListener('click', () => {
                const id = button.dataset.project;
                unarchiveProject(id);
            })
        });
        const backButton = document.createElement('button');
        modalBody.append(backButton);
        backButton.classList.add('back-button');
        backButton.append(getIcon('chevron-left'), ' Back');
        backButton.addEventListener('click', e => {
            modalBody.innerHTML = '';
            modalBody.append(modalInner());
        })
    }

}