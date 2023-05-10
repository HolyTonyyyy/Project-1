

var timerEl = document.querySelector('#timer')
var unixDueDate = dayjs('2023-05-18').unix();

timer = setInterval(function() {
    var currentUnixtime = dayjs().unix();
    var time = unixDueDate - currentUnixtime    
    var minutes = Math.floor(time/60)
    var hours = Math.floor(minutes/60)

    var timer = ''
    if (hours != 0) timer = timer + hours + ":";
    if (minutes != 0) {
        if (minutes%60 < 10) timer = timer + "0" + minutes%60 + ":"
        else timer = timer + minutes%60 + ":";
    } else timer = timer + "0:";
    if (time%60 < 10) timer = timer + "0" + time%60
    else timer = timer + time%60

    timerEl.textContent = timer     
}, 1000);

var scrumBoard = document.querySelector('.section');
var modalBG = document.querySelector('.modal-background');
var modal = document.querySelector('.modal');

scrumBoard.addEventListener('click', () => {
    modal.classList.add('is-active');
});

modalBG.addEventListener('click', () => {
    modal.classList.remove('is-active')
});
