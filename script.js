var scrumBoard = document.querySelector('.section');
var modalBG = document.querySelector('.modal-background');
var modal = document.querySelector('.modal');

scrumBoard.addEventListener('click', () => {
    modal.classList.add('is-active');
});

modalBG.addEventListener('click', () => {
    modal.classList.remove('is-active')
});