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
        userBio.textContent = profile.bio || 'Go to "Settings" to create a bio.';

        return body
    }
}