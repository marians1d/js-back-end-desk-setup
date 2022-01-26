document.getElementById('setups').addEventListener('click', (ev) => {
    if (ev.target.classList.contains('more')) {
        const btn = ev.target;
        const description = ev.target.parentElement.querySelector('.description');

        if (description.style.display == 'block') {
            description.style.display = '';
            btn.textContent = 'Show More';
        } else {
            description.style.display = 'block';
            btn.textContent = 'Hide Info';
        }
    }
});