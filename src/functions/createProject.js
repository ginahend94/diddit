import save from "./save"
import load from "./load"
import createProfile from "./createProfile";

export default () => {
    if (!load('profile')) {
        console.log('Creating new profile.');
        save('profile', createProfile());
    }
    const profile = load('profile');
    console.log(profile);
}