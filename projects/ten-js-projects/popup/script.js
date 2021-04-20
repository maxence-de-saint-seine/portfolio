const open = document.getElementById('popup-open');
const close = document.getElementById('popup-close');
const container = document.getElementById('container');

open.addEventListener('click', () => {
    container.classList.add('active');
});
close.addEventListener('click', () => {
    container.classList.remove('active');
});