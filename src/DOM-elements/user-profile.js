import Modal from "./modal";
import save from "../functions/save";
import load from "../functions/load";
import { getIcon } from "../functions/icon";
import icon from '../functions/icon';
import { deleteProject, unarchiveProject } from '../functions/projectManager';
import { createTooltip } from "./tooltip";
import { editProject } from "../functions/projectManager";
import { selectMultiple } from "../functions/batch";
import render from "../functions/render";

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
        projects.append(getIcon('folder-outline'), ` Projects (${profile.projects.length})`);
        projects.addEventListener('click', () => {
            showProjects();
        })

        const archive = document.createElement('li');
        menu.append(archive);
        archive.append(getIcon('archive-outline'), ` Archive (${profile.projects.filter(a => a.archived).length})`);
        if (!profile.projects.some(a => a.archived)) {
            archive.classList.add('disabled-link');
            createTooltip(archive, 'You have no projects archived.');
            return body;
        }
        archive.addEventListener('click', () => {
            showArchive();
        })

        return body;
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
            createTooltip(button, 'Unarchive Project');
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

    const showProjects = () => {
        const modalBody = modal.querySelector('.modal-inner');
        let innerHTML =
            `<table class="projects">
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Date Created</th>
                    <th>Edit</th>
                </tr>`;
        modalBody.innerHTML = (() => {
            for (let project in profile.projects) {
                innerHTML +=
                    `<tr class="project-entry" data-projectid="${profile.projects[project].id}">
                            <td class="project-name">${profile.projects[project].name}${profile.projects[project].archived ? '(Archived)' : ''}</td>
                            <td class="project-description">${profile.projects[project].description}</td>
                            <td class="project-date">${profile.projects[project].dateCreatedFormatted}</td>
                            <td class="edit-project"><button data-project='${profile.projects[project].id}'></button></td>
                        </tr>`;
            }
            innerHTML += `</table>`;
            return innerHTML;
        })()
        const editButtons = modalBody.querySelectorAll('.edit-project button');
        editButtons.forEach(button => {
            const id = button.dataset.project;
            const project = profile.projects[profile.projects.findIndex(a => a.id == id)];
            button.append(getIcon('square-edit-outline'));
            createTooltip(button, `Edit "${project.name}"`);
            button.addEventListener('click', () => {
                editProject(project);
            })
        });

        // BATCH DELETE (POSTPONED)

        // const buttons = document.createElement('div');
        // modalBody.append(buttons);
        // buttons.classList.add('buttons')

        // const selectButton = document.createElement('button');
        // buttons.append(selectButton);
        // selectButton.textContent = 'Select multiple';
        // const rows = modalBody.querySelectorAll('.project-entry');
        // selectButton.addEventListener('click', () => {
        //     selectMultiple(rows);
        //     selectButton.classList.add('hidden');
        //     deleteMultipleButton.classList.remove('hidden');
        //     cancelMultipleButton.classList.remove('hidden');
        // })

        // const deleteMultipleButton = document.createElement('button');
        // buttons.append(deleteMultipleButton);
        // deleteMultipleButton.textContent = `Delete selected`;
        // deleteMultipleButton.classList.add('cancel', 'hidden');
        // deleteMultipleButton.addEventListener('click', () => {
        //     showWarning();
        // })

        // const selected = () => [...rows].filter(a => a.classList.contains('selected'));

        // const warningInner = () => {
        //     const text = document.createElement('div');
        //     text.innerHTML = `Are you sure you want to delete ${selected().length} projects? <br /><strong>This cannot be undone.</strong>`;
        //     return text;
        // }
        // const showWarning = () => {
        //     const modal = Modal.create(
        //         ['delete-multiple-projects'],
        //         warningInner(),
        //         () => deleteMultiple(),
        //         'Delete',
        //         true,
        //         true,
        //         true,
        //     );
        //     Modal.open(modal);
        // }

        // const deleteMultiple = () => {
        //     selected().forEach(projectNode => {
        //         const project = profile.projects[profile.projects.findIndex(a => a.id == projectNode.dataset.projectid)];
        //         deleteProject(project);
        //         save('profile', profile);
        //         render();
        //     })
        // }

        // const cancelMultipleButton = document.createElement('button');
        // buttons.append(cancelMultipleButton);
        // cancelMultipleButton.textContent = 'Cancel';
        // cancelMultipleButton.classList.add('hidden');
        // cancelMultipleButton.addEventListener('click', () => {
        //     rows.forEach(a => {
        //         a.classList.remove('selectable', 'selected');
        //         a.removeEventListener('click', () => {
        //             if (a.classList.contains('selected')) {
        //                 console.log('removing sel')
        //                 a.classList.remove('selected');
        //             } else {
        //                 console.log('adding sel')
        //                 a.classList.add('selected');
        //             }
        //         })
        //     })
        //     cancelMultipleButton.classList.add('hidden');
        //     deleteMultipleButton.classList.add('hidden');
        //     selectButton.classList.remove('hidden');
        // })

        const backButton = document.createElement('button');
        modalBody.append(backButton);
        backButton.classList.add('back-button');
        backButton.append(getIcon('chevron-left'), ' Back');
        backButton.addEventListener('click', () => {
            modalBody.innerHTML = '';
            modalBody.append(modalInner());
        })
    }

}