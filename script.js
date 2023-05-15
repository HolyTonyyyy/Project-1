

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

var addButton = document.querySelector('#addBtn');
var inputModalBG = document.querySelector('#inputModal-background');
var inputModal = document.querySelector('#inputModal');

addButton.addEventListener('click', () => {
    inputModal.classList.add('is-active');
});

inputModalBG.addEventListener('click', () => {
    inputModal.classList.remove('is-active')
});

var catBtn = document.querySelector('#cat-btn');
var catQuote = document.querySelector('#quote')
var catModal = document.querySelector('#catModal')
var catModalBg = document.querySelector('#catModal-background')
var catFactUrl = "https://cat-fact.herokuapp.com/facts";
var catPicUrl = "https://cataas.com/cat"

fetch(catFactUrl)
.then(response => response.json())
.then(function(response){ 
    catFact = (response[getRandomInt(0, response.length)].text)
    catQuote.textContent = catFact
})

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

catModalBg.addEventListener('click', function(event) {
    console.log(event.target)
    if(event.target.id != 'catModal-background' && event.target.id != 'closeCatModal') return;
    catModal.classList.remove('is-active')
    catModal.children[0].children[0].children[0].setAttribute('src', '')
})

catBtn.addEventListener('click', function() {
    catModal.classList.add('is-active');
    var catFact
    fetch(catFactUrl)
    .then(response => response.json())
    .then(function(response){ 
        catFact = (response[getRandomInt(0, response.length)].text)
        catModal.children[0].children[0].children[2].textContent = catFact
    })

    catModal.children[0].children[0].children[1].setAttribute('src', 'https://cataas.com/cat')

})

$(function () {
    $('.container').sortable({
        connectWith: ".container"
    });
});

