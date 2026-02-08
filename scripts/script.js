document.querySelectorAll('.dropdown').forEach(dropdown => {
    const selected = dropdown.querySelector('.dropdown-selected');
    const options = dropdown.querySelector('.dropdown-options');
    const input = dropdown.querySelector('input');

    dropdown.addEventListener('click', () => {
        dropdown.classList.toggle('active');
    })

    options.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', (event) => {
            event.stopPropagation();
            
            options.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            })
            option.classList.add('selected');

            selected.innerHTML = option.querySelector('p').innerHTML;
            input.value = option.dataset.value;
            dropdown.classList.remove('active');
        })
    })
})

document.addEventListener('click', (event) => {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove('active');
        }
    })
})
