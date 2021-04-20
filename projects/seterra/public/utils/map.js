var map = document.querySelector('#map');
var paths = map.querySelectorAll('.map__image path');
const instruction = document.getElementById("instruction");
const scoreContainer = document.getElementById('score');
const timerContainer = document.getElementById('timer');

//add the foreach methode if undefined
if (NodeList.prototype.forEach === undefined) {
    NodeList.prototype.forEach = function (callback) {
        [].forEach.call(this, callback)
    }
}

let current_region = null;
let seeked_region = null;
let guessed_region = [];
let wrong = 0;
let totalWrong = 0;
let timer = 0;

timerInterval = setInterval(updateTimer, 1000);
seekNewRegion();



paths.forEach(function (path) {
    path.style.fill = "green";
    path.addEventListener('mouseenter', () => {
        current_region = path;
        current_region.style.fillOpacity = 0.5;
    })
    path.addEventListener('mouseleave', () => {
        path.style.fillOpacity = 1;
    })
})

document.addEventListener('click', click)

function click() {
    if (current_region == seeked_region) {
        console.log('bravo');

        let color = null;
        switch (wrong) {
            case 0:
                color = 'lime';
                break;
            case 1:
                color = 'yellow';
                break;
            case 2:
                color = 'orange';
                break;
            case 3:
                color = 'red';
                break;
            case 4:
                color = 'darkred';
        }
        console.log(color);
        current_region.style.fill = color;
        seekNewRegion();
    }
    
    else {
        console.log('wrong, this is ' + current_region.getAttribute("title"));
        totalWrong++;
        wrong++;

        if (wrong >= 5) {
            seeked_region.style.fill = 'slategrey';
            seekNewRegion();
        }
    }
}

function seekNewRegion() {
    guessed_region.push(seeked_region);
    console.log(guessed_region.includes(seeked_region))

    updateScore();

    if (guessed_region.length -1 == paths.length) {
        gameOver();
        return;
    }

    wrong = 0;

    while (guessed_region.includes(seeked_region)) {
        let rand = Math.floor(Math.random() * paths.length);
        seeked_region = paths[rand];
    }

    instruction.innerText = "Click on " + seeked_region.getAttribute("title");   
}

function updateScore() {
    scoreContainer.innerText = ((paths.length * 5 - totalWrong) / (paths.length * 5)) * 100 + '%';
}

function gameOver() {
    instruction.innerText = 'Game Over - Well done';
    clearInterval(timerInterval);
    document.removeEventListener('click', click);
}

function updateTimer() {
    timer++;
    timerContainer.innerText = timer + 's';
}