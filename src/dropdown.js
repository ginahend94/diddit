const dropdown = (() => {
    const button = document.querySelector('.split-button-button');
    const dropdownButton = document.querySelector('.split-button-dropdown');
    const dropdownList = document.querySelector('.split-button-dropdown-list');
    const dropdownOptions = [...dropdownList.querySelectorAll('li')];

    dropdownOptions.forEach(a => a.addEventListener('click', e => switchOption(e)));
    function switchOption(e) {
        dropdownButton.querySelector('.type').textContent = e.target.textContent;
    }

    dropdownButton.addEventListener('click', openDropdown);
    function openDropdown() {
        dropdownButton.classList.add('open');
    }
    window.addEventListener('click', e => {
        if (e.target == dropdownButton || e.target == dropdownButton.querySelector('span') || e.target == dropdownButton.querySelector('svg')) return;
        dropdownButton.classList.remove('open');
    })
})();