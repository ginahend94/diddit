import { EditProject } from "../functions/projectManager";
import { getIcon } from "../functions/icon";

export default (() => {
    const menuTypes = {
        projectOptions: [
            {
                option: 'Edit project',
                function: EditProject,
                icon: 'square-edit-outline',
            },
            {
                option: 'Duplicate project',
                function: () => console.log('will dupe'),
                icon: 'content-copy',
            },
            {
                option: 'Archive project',
                function: () => console.log('will archive'),
                icon: 'archive-outline',
            },
            {
                option: 'Delete project',
                function: () => console.log('will delete'),
                icon: 'trash-can-outline',
            },
        ],
    };

    const generateMenu = (menuType, project) => {
        const menuContainer = document.createElement('div');
        menuContainer.classList.add('context-menu-container');
        const menu = document.createElement('ul');
        menuContainer.append(menu);
        menu.classList.add('context-menu');
        menuTypes[menuType].forEach(option => {
            const li = document.createElement('li');
            menu.append(li);
            li.classList.add('context-menu-option');
            li.textContent = option.option;
            li.prepend(getIcon(option.icon, [option.icon]));
            li.addEventListener('click', () => option.function(project));
        });
        menuContainer.addEventListener('click', () => closeMenu(menuContainer));
        return { menu, menuContainer }
    }

    const openMenu = (e, menu) => {
        document.body.append(menu.menuContainer);
        menu.menu.style = `top:${e.clientY}px;left:${e.clientX}px`;
    }

    const closeMenu = (contextMenu) => {
        contextMenu.classList.add('hidden');
        document.body.removeChild(contextMenu);
    }

    return { generateMenu, openMenu }
})();