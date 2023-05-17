
var workingOnContainer = document.querySelector("#workingOnContainer");
var testContainer = document.querySelector("#testContainer");
var doneContainer = document.querySelector("#doneContainer");
var workingOnItems = document.querySelectorAll(".workingOnItems");
var testItems = document.querySelectorAll(".testItems");
var doneItems = document.querySelectorAll(".doneItems")
var workingArray = []
var testArray = []  // empty arrays to fill and save into local storage
var doneArray = []

retrieveLocal()

function retrieveLocal() {

    // retrieves and converts localstorage into objects
    workingArray = JSON.parse(localStorage.getItem("workingOn"))
    testArray = JSON.parse(localStorage.getItem("test"))
    doneArray = JSON.parse(localStorage.getItem("done"))
    
    // loops through arrays of objects to create new elements in the correct columns
    if(workingArray != null) for(let i=0;i<workingArray.length;i++) {
        workingOnContainer.appendChild(document.createElement("li"))
        workingOnContainer.lastElementChild.textContent = workingArray[i].text
        workingOnContainer.lastElementChild.classList.add(workingArray[i].class)
    }
    if(testArray != null) for(let i=0;i<testArray.length;i++) {
        testContainer.appendChild(document.createElement("li"))
        testContainer.lastElementChild.textContent = testArray[i].text
        testContainer.lastElementChild.classList.add(testArray[i].class)
    }
    if(doneArray != null) for(let i=0;i<doneArray.length;i++) {
        doneContainer.appendChild(document.createElement("li"))
        doneContainer.lastElementChild.textContent = doneArray[i].text
        doneContainer.lastElementChild.classList.add(doneArray[i].class)
    }

}

$(function () {
    $('.container').sortable({  // allows the items to be sorted
        connectWith: ".container",  // connects all of the containers together
        stop: save
    });
});

function save() {  // function runs when dragging element has stopped

    // for loops changes classes, converts elements into objects and pushes them into arrays
    workingArray = [] // working column
    for(let i=0;i<document.querySelector("#workingOnContainer").childElementCount;i++) {
        if(document.querySelector("#workingOnContainer").childElementCount == 0);
        else {
            document.querySelector("#workingOnContainer").children[i].classList.remove("testItems", "doneItems")
            document.querySelector("#workingOnContainer").children[i].classList.add("workingOnItems")
            let temp = {text: document.querySelector("#workingOnContainer").children[i].textContent,
                        class: "workingOn"}
            workingArray.push(temp)                    
        }
    }

    testArray = [] // testing column
    for(let i=0;i<document.querySelector("#testContainer").childElementCount;i++) {
        if(document.querySelector("#testContainer").childElementCount == 0);
        else {
            document.querySelector("#testContainer").children[i].classList.remove("workingOnItems", "doneItems")
            document.querySelector("#testContainer").children[i].classList.add("testItems")
            let temp = {text: document.querySelector("#testContainer").children[i].textContent,
                        class: "test"}
            testArray.push(temp)
        }
    }

    doneArray = [] // done column
    for(let i=0;i<document.querySelector("#doneContainer").childElementCount;i++) {
        if(document.querySelector("#doneContainer").childElementCount == 0);
        else {
            document.querySelector("#doneContainer").children[i].classList.remove("testItems", "workingOnItems")
            document.querySelector("#doneContainer").children[i].classList.add("doneItems")
            let temp = {text: document.querySelector("#doneContainer").children[i].textContent,
                        class: "done"}
            doneArray.push(temp)                    
        }
    }

    // deletes any elements that get dropped into the delete container
    if(document.querySelector("#deleteContainer").childElementCount == 0);
    else document.querySelector('#deleteContainer').removeChild(document.querySelector('#deleteContainer').children[0])

    // sets localstorage == to the prior created arrays
    localStorage.setItem("workingOn", JSON.stringify(workingArray))
    localStorage.setItem("test", JSON.stringify(testArray))
    localStorage.setItem("done", JSON.stringify(doneArray))
}


var timerEl = document.querySelector('#timer')
var unixDueDate = dayjs('2023-05-18').unix();

timer = setInterval(function() {

    // timer interval subtracts current unix from future unix
    var currentUnixtime = dayjs().unix();
    var time = unixDueDate - currentUnixtime  
    
    // converts remaining unix into minutes and then converts minutes into hours
    var minutes = Math.floor(time/60)
    var hours = Math.floor(minutes/60)

    // creates and sets a string element based on hours minutes and then seconds left
    var timer = ''
    if (hours != 0) timer = timer + hours + ":";
    if (minutes != 0) {
        if (minutes%60 < 10) timer = timer + "0" + minutes%60 + ":"
        else timer = timer + minutes%60 + ":";
    } else timer = timer + "0:";
    if (time%60 < 10) timer = timer + "0" + time%60
    else timer = timer + time%60

    timerEl.textContent = timer     
}, 1000); // runs every second

var addButton = document.querySelector('#addBtn');
var inputModalBG = document.querySelector('#inputModal-background');
var inputModal = document.querySelector('#inputModal');

var saveInput = document.querySelector("#saveInput");
var textInput = document.querySelector("#taskInput");
var saveTeam = document.querySelector("#saveTeam");
var textTeam = document.querySelector("#textTeam")

var addTeamBtn = document.querySelector('#addTeam');
var teamModalBG = document.querySelector('#teamModal-background');
var teamModal = document.querySelector('#teamModal');

addTeamBtn.addEventListener('click', () => {
    teamModal.classList.add('is-active');
});

teamModalBG.addEventListener('click', () => {
    teamModal.classList.remove('is-active')
});

saveInput.addEventListener('click', function() {

    // creates a new task element under the working on card
    event.preventDefault()
    if(textInput.value.trim() == '') return
    workingOnContainer.appendChild(document.createElement("li"))
    workingOnContainer.lastElementChild.textContent = textInput.value
    workingOnContainer.lastElementChild.classList.add("workingOn")
    textInput.value = '';
    inputModal.classList.remove('is-active')
    save()
})

saveTeam.addEventListener('click', function() {
    event.preventDefault()
    if(textTeam.value.trim() == '') return
    workingOnContainer.appendChild(document.createElement("li"))
    workingOnContainer.lastElementChild.textContent = textTeam.value
    workingOnContainer.lastElementChild.classList.add("teamMember")
    textTeam.value = '';
    teamModal.classList.remove('is-active')
    save()
})

addButton.addEventListener('click', () => { // event listener for the add button
    inputModal.classList.add('is-active'); // pops the modal onto the screen
});

inputModalBG.addEventListener('click', () => { // event listener to close the modal
    inputModal.classList.remove('is-active') // listenes for clicks on the background
});

var catBtn = document.querySelector('#cat-btn');
var catQuote = document.querySelector('#quote')
var catModal = document.querySelector('#catModal')
var catModalBg = document.querySelector('#catModal-background')

var catFactUrl = "https://cat-fact.herokuapp.com/facts"; // cat facts api url
var catPicUrl = "https://cataas.com/cat" // cat pictures api url

fetch(catFactUrl) // fetch cat fact url

.then(response => response.json()) // parse from json

.then(function(response){  // retrieve cat fact text from parsed json
    catFact = (response[getRandomInt(0, response.length)].text)
    catQuote.textContent = catFact // display cat fact at the top of page
})

function getRandomInt(min, max) { // function returns random integer copied from mdn
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

catModalBg.addEventListener('click', function(event) { // event listener to close cat modal
    console.log(event.target)                          // looks for clicks on the background or the close button
    if(event.target.id != 'catModal-background' && event.target.id != 'closeCatModal') return;
    catModal.classList.remove('is-active')
    catModal.children[0].children[0].children[0].setAttribute('src', '')
})

catBtn.addEventListener('click', function() { // event listener to open cat modal
    catModal.classList.add('is-active');       // opens the cat modal loads a cat fact and a cat picture
    var catFact
    fetch(catFactUrl) // fetch cat fact url

    .then(response => response.json()) // parse from json

    .then(function(response){ // get random cat fact from retrieved list
        catFact = (response[getRandomInt(0, response.length)].text)
        catModal.children[0].children[0].children[2].textContent = catFact
    })
    
    // retrieve and display cat picture
    catModal.children[0].children[0].children[1].setAttribute('src', 'https://cataas.com/cat')
})

