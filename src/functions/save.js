export default (name, data) => {
    localStorage.setItem(name, JSON.stringify(data));
    console.log(`Updated ${name}!`);
}
