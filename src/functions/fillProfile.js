import { gina } from './profile';
import render from './render';
import save from './save';
import Modal from '../DOM-elements/modal';

const fillProfile = (() => {
    let timeout;
    let count = 1;
    const start = () => {
        timeout = setTimeout(() => {
            count = 0;
        }, 5000);
    }
    const increment = () => {
        if (!timeout) start();
        if (count >= 10) {
            clearTimeout(timeout);
            showModal();
            count = 0;
            timeout = undefined;
        }
        ++count;
    }
    const showModal = () => {
        const modalInner = () => {
            const text = document.createElement('div');
            text.textContent = 'Fill profile?';
            return text;
        }
        const modal = Modal.create(
            [],
            modalInner(),
            () => { Modal.close(modal); save('profile', gina); render() },
            'OK',
            true,
            true,
            true
        )
        Modal.open(modal);
    }
    return { increment };
})()

export const fillProfileButton = () => {
    const button = document.createElement('div');
    button.classList.add('fill-profile-button');
    button.addEventListener('click', () => {
        fillProfile.increment();
    })
    
    return button;
}

const deleteProfile = (() => {
    let timeout;
    let count = 1;
    const start = () => {
        timeout = setTimeout(() => {
            count = 0;
        }, 5000);
    }
    const increment = () => {
        if (!timeout) start();
        if (count >= 10) {
            clearTimeout(timeout);
            showModal();
            count = 0;
            timeout = undefined;
        }
        ++count;
    }
    const showModal = () => {
        const modalInner = () => {
            const text = document.createElement('div');
            text.textContent = 'Delete profile?';
            return text;
        }
        const modal = Modal.create(
            [],
            modalInner(),
            () => { Modal.close(modal); localStorage.removeItem('profile'); render() },
            'OK',
            true,
            true,
            true
        )
        Modal.open(modal);
    }
    return { increment };
})()

export const deleteProfileButton = () => {
    const button = document.createElement('div');
    button.classList.add('delete-profile-button');
    button.addEventListener('click', () => {
        deleteProfile.increment();
    })
    
    return button;
}
