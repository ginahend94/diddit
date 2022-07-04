import nav from "../DOM-elements/nav";
import main from "../DOM-elements/main";
import load from "./load";
import save from "./save";
import drag from "./drag";
import createProfile from './profile';
import { fillProfileButton, deleteProfileButton } from "./fillProfile";

export default () => {
    let Profile;
    if (load('profile')) {
        Profile = load('profile');
    } else {
        Profile = createProfile();
        save('profile', Profile)
    }
    if (!load('newType')) save('newType', 'List');
    document.body.innerHTML = '';
    document.body.append(nav(Profile));
    document.body.append(main(Profile));
    document.body.append(fillProfileButton()); // TESTING
    document.body.append(deleteProfileButton()); // TESTING

    drag(document.body);
    console.log('rendered')
    // console.log(Profile)
}