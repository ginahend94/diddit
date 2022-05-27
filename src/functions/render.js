import nav from "../DOM-elements/nav";
import main from "../DOM-elements/main";
import load from "./load";
import save from "./save";

export default () => {
    let Profile;
    if (load('profile')) {
        Profile = load('profile');
    } else {
        Profile = createProfile();
        save('profile', Profile)
    }
    document.body.innerHTML = '';
    document.body.append(nav(Profile));
    document.body.append(main(Profile));
}