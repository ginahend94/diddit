import { getIcon } from "../functions/icon";

export const splitButton = () => {
    const addNew = document.createElement('div');
    addNew.classList.add('add-new');

    const splitButtonButton = document.createElement('button');
    addNew.append(splitButtonButton);
    splitButtonButton.classList.add('split-button-button');
    splitButtonButton.textContent = 'New';

    const splitButtonDropdown = document.createElement('button')
    addNew.append(splitButtonDropdown);
    splitButtonDropdown.classList.add('split-button-dropdown');
    splitButtonDropdown.addEventListener('click', e => {
        openDropdown();
    })

    const type = document.createElement('span');
    splitButtonDropdown.append(type);
    type.textContent = 'List';
    splitButtonDropdown.append(getIcon('chevron-down'));

    const splitButtonBg = document.createElement('div');
    splitButtonBg.classList.add('context-menu-container');

    const splitButtonDropdownList = document.createElement('ul');
    splitButtonDropdown.append(splitButtonDropdownList);
    splitButtonDropdownList.classList.add('split-button-dropdown-list');
    splitButtonDropdown.style.zIndex = '1';

    const note = document.createElement('li');
    splitButtonDropdownList.append(note);
    note.textContent = 'Note';
    note.addEventListener('click', e => {
        e.stopPropagation();
        switchOption('Note');
        closeDropdown();
    })

    const list = document.createElement('li');
    splitButtonDropdownList.append(list);
    list.textContent = 'List';
    list.addEventListener('click', e => {
        e.stopPropagation();
        switchOption('List');
        closeDropdown();
    })

    const openDropdown = () => {
        splitButtonDropdown.classList.add('open');
        document.body.append(splitButtonBg);
    }

    const closeDropdown = () => {
        splitButtonDropdown.classList.remove('open');
        document.body.removeChild(splitButtonBg);
    }

    splitButtonBg.addEventListener('click', closeDropdown);

    let newType;

    const switchOption = option => {
        type.textContent = option;
        newType = option;
    }

    splitButtonButton.addEventListener('click', e => {
        console.log(`Will create New ${newType}.`)
    })

    return addNew;
}