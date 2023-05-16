
var workingOnContainer = document.querySelector("#workingOnContainer");
var testContainer = document.querySelector("#testContainer");
var doneContainer = document.querySelector("#doneContainer");
var workingOnItems = document.querySelectorAll(".workingOnItems");
var testItems = document.querySelectorAll(".testItems");
var doneItems = document.querySelectorAll(".doneItems")


var workingArray = []
var testArray = []
var doneArray = []

retrieveLocal()

function retrieveLocal() {
    workingArray = JSON.parse(localStorage.getItem("workingOn"))
    testArray = JSON.parse(localStorage.getItem("test"))
    doneArray = JSON.parse(localStorage.getItem("done"))
    
    if(workingArray != null) for(let i=0;i<workingArray.length;i++) {
        workingOnContainer.appendChild(document.createElement("li"))
        workingOnContainer.lastElementChild.textContent = workingArray[i].text
        workingOnContainer.lastElementChild.classList.add("workingOnItems")
    }
    if(testArray != null) for(let i=0;i<testArray.length;i++) {
        testContainer.appendChild(document.createElement("li"))
        testContainer.lastElementChild.textContent = testArray[i].text
        testContainer.lastElementChild.classList.add("testItems")
    }
    if(doneArray != null) for(let i=0;i<doneArray.length;i++) {
        doneContainer.appendChild(document.createElement("li"))
        doneContainer.lastElementChild.textContent = doneArray[i].text
        doneContainer.lastElementChild.classList.add("doneItems")
    }

}

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
var saveInput = document.querySelector("#saveInput")
var textInput = document.querySelector("#taskInput")

saveInput.addEventListener('click', function() {
    event.preventDefault()
    console.log(textInput.value)
    workingOnContainer.appendChild(document.createElement("li"))
    workingOnContainer.lastElementChild.textContent = textInput.value
    workingOnContainer.lastElementChild.classList.add("workingOnItems")
    inputModal.classList.remove('is-active')
})

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
        connectWith: ".container",
        stop: function() {
            workingArray = []
            for(let i=0;i<document.querySelector("#workingOnContainer").childElementCount;i++) {
                if(document.querySelector("#workingOnContainer").childElementCount == 0);
                else {
                    document.querySelector("#workingOnContainer").children[i].classList.remove("testItems", "doneItems")
                    document.querySelector("#workingOnContainer").children[i].classList.add("workingOnItems")
                    let temp = {text: document.querySelector("#workingOnContainer").children[i].textContent}
                    workingArray.push(temp)                    
                }
            }

            testArray = []
            for(let i=0;i<document.querySelector("#testContainer").childElementCount;i++) {
                if(document.querySelector("#testContainer").childElementCount == 0);
                else {
                    document.querySelector("#testContainer").children[i].classList.remove("workingOnItems", "doneItems")
                    document.querySelector("#testContainer").children[i].classList.add("testItems")
                    let temp = {text: document.querySelector("#testContainer").children[i].textContent}
                    testArray.push(temp)
                }
            }

            doneArray = []
            for(let i=0;i<document.querySelector("#doneContainer").childElementCount;i++) {
                if(document.querySelector("#doneContainer").childElementCount == 0);
                else {
                    document.querySelector("#doneContainer").children[i].classList.remove("testItems", "workingOnItems")
                    document.querySelector("#doneContainer").children[i].classList.add("doneItems")
                    let temp = {text: document.querySelector("#doneContainer").children[i].textContent}
                    doneArray.push(temp)                    
                }
            }

            document.querySelector('#deleteContainer').removeChild(document.querySelector('#deleteContainer').children[0])

            localStorage.setItem("workingOn", JSON.stringify(workingArray))
            localStorage.setItem("test", JSON.stringify(testArray))
            localStorage.setItem("done", JSON.stringify(doneArray))
        }
    });
});
