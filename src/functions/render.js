import nav from "../DOM-elements/nav";
import main from "../DOM-elements/main";
import load from "./load";
import save from "./save";
import drag from "./drag";
import createProfile from './profile';
import { fillProfileButton, deleteProfileButton } from "./fillProfile";
import { setDarkTheme } from "./profile";
import { checkProfile } from "./checkContrast";

export default () => {
    const root = document.documentElement;
    let Profile;
    if (load('profile')) {
        Profile = load('profile');
    } else {
        Profile = createProfile();
        save('profile', Profile)
    }
    checkProfile(Profile.colorPalette)
    root.dataset.theme = Profile.darkMode ? 'dark' : 'light';
    root.style.setProperty('--accent-hue', Profile.colorPalette.h || 'var(--default-hue)');
    root.style.setProperty('--accent-lightness', Profile.colorPalette.l || 'var(--default-lightness)');
    setDarkTheme();
    document.body.innerHTML = '';
    document.body.append(nav(Profile));
    document.body.append(main(Profile));
    document.body.append(fillProfileButton()); // TESTING
    document.body.append(deleteProfileButton()); // TESTING

    drag(document.body);
    // console.log('rendered');
}