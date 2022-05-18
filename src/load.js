export default (name) => {
    if (localStorage.getItem(name) == null) {
        return console.log(`You haven't set this item yet.`);
    }
    return JSON.parse(localStorage.getItem(name));
}