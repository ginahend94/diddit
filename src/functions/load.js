export default (name) => {
    if (localStorage.getItem(name) == null) {
        console.log('You haven\'t created this value yet.')
        return false;
    }
    return JSON.parse(localStorage.getItem(name));
}