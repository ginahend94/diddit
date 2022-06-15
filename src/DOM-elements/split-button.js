import { getIcon } from "../functions/icon";
import save from '../functions/save';
import load from '../functions/load';

export const SplitButton = () => {
    
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
    
    let newType = load('newType');

    const type = document.createElement('span');
    splitButtonDropdown.append(type);
    type.textContent = newType;
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
        console.log(newType)
        closeDropdown();
    })

    const list = document.createElement('li');
    splitButtonDropdownList.append(list);
    list.textContent = 'List';
    list.addEventListener('click', e => {
        e.stopPropagation();
        switchOption('List');
        console.log(newType)
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

    const getNewType = () => newType;
    const setNewType = (type) => {
        newType = type;
        save('newType', newType);
    }

    const switchOption = option => {
        type.textContent = option;
        setNewType(option);
        return newType
    }


    return {addNew, splitButtonButton, getNewType};
}