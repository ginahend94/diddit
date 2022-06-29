import Modal from "./modal";
import save from "../functions/save";
import load from "../functions/load";
import { getIcon } from "../functions/icon";
import icon from '../functions/icon';

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
            console.log('Archived Projects: ', archived);
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
                <th>
                    <td>Name</td>
                    <td>Description</td>
                    <td>Date Created</td>
                </th>
                <tbody>`;
        modalBody.innerHTML = (() => {
            for (let project of profile.projects) {
                if (project.archive) {
                    innerHTML +=
                        `<tr>
                            <td>${profile.projects[project].name}</td>
                            <td class="project-description">${profile.projects[project].description}</td>
                            <td class="project-date">${profile.projects[project].dateCreatedFormatted}</td>
                        </tr>`
                }
            }
        })()
        innerHTML += `</tbody></table>`;
    }

}