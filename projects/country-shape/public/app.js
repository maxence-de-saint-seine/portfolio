const scoreContainer = document.getElementById('scoreContainer')
const questionContainer = document.getElementById('questionContainer')
const answerForm = document.getElementById('answerForm')
const answerInput = document.getElementById('answerInput')
answerForm.addEventListener('submit', submit)


let listQuestions = []
let typeOfQuestion = 'none'
let typeofAnswer = 'none'
let correctAnswerIndex = -1

let attempts = 0
let maxAttempts = 2

let numberQuestions = listQuestions.length
let score = 0


function display(div, type, data){
    console.log(div, type, data)

    switch (type) {
        case 'shape':
            displayShape(data)
            break
        case 'flag.png':
            displayFlag(data)
            break
        default:
            questionContainer.innerText = data
    }
}

function displayShape(alpha2Code) {
    var img = document.createElement('img');

    questionContainer.setAttribute('class', 'shape')
    img.setAttribute('src', '/public/ressources/shape/' + alpha2Code.toLowerCase() + '/1024.png')

    console.log(img)

    removeAllChild(questionContainer)
    questionContainer.appendChild(img)
}
function displayFlag(alpha2Code) {
    var img = document.createElement('img');

    questionContainer.setAttribute('class', 'flag')
    img.setAttribute('src', '/country-shape/public/ressources/flag/' + alpha2Code.toLowerCase() + '.png')

    console.log(img)

    removeAllChild(questionContainer)
    questionContainer.appendChild(img)
}
function removeAllChild(div) {
    while (div.firstChild) {
        div.removeChild(div.firstChild)
    }
}

function submit(e) {
    e.preventDefault()

    const answer = answerInput.value
    answerInput.value = ''
    console.log('Your answer is ' + answer)

    attempts++

    if (answer.toLowerCase() == listQuestions[correctAnswerIndex].answer.toLowerCase()) {
        console.log('correct answer')
        updateScore(maxAttempts - attempts + 1)
        nextQuestion()
    } else {
        console.log('wrong answer, correct answer is ' + listQuestions[correctAnswerIndex].answer)
        if (attempts >= maxAttempts) {
            alert('too many attempts, the answer was ' + listQuestions[correctAnswerIndex].answer)
            nextQuestion()
        }
    }
}

function updateScore(point = 0) {
    console.log('score + ' + point)
    score += point
    console.log(`New score of ${score}/${numberQuestions * maxAttempts}`)
    scoreContainer.innerText = `Score = ${score}/${numberQuestions * maxAttempts}`
}

function nextQuestion() {
    attempts = 0

    if (correctAnswerIndex != -1) {
        listQuestions.splice(correctAnswerIndex, 1)
    }

    if (listQuestions == null || listQuestions.length == 0) {
        endGame();
    }
    else {
        correctAnswerIndex = Math.floor(Math.random() * listQuestions.length)
        console.log('The index of the correct answer is ' + correctAnswerIndex)
        display(questionContainer, typeOfQuestion, listQuestions[correctAnswerIndex].question)
    }
}

function endGame() {
    alert('Congrats!')
}

function listObjectContains(list = [], key, contain) {
    for (i = 0; i < list.length; i++){
        if (list[i][key].toLowerCase() == contain.toLowerCase()) {
            return i;
        }
    }
    return -1;
}

async function startGame(question, answer, filter) {
    typeOfQuestion = question
    typeofAnswer = answer
    
    let link = `https://restcountries.eu/rest/v2/all?fields=region;subregion;regionalBlocs;alpha2Code;${question};${answer}`
    console.log(link)
    let result = await fetch(link)
    let json = await result.json()
    console.log(json)
    
    listQuestions = [];
    json.forEach(country => {
        if (filter == 'none' || country.region == filter || country.subregion == filter) {
            addQuestion(country, question, answer)
        }
        else if (listObjectContains(country.regionalBlocs, 'acronym', filter) != -1) {
            addQuestion(country, question, answer)
        }
    });

    function addQuestion(country) {
        let q = {}
        if (q.question = country[question] != undefined) {
            q.question = country[question]
        } else {
            console.log('ok')
            q.question = country['alpha2Code']
        }
        if (q.answer = country[answer]) {
            q.answer = country[answer]
        } else {
            q.answer = country['alpha2Code']
        }
        listQuestions.push(q)
    }

    numberQuestions = listQuestions.length
    score = 0
    updateScore()

    console.log(listQuestions)
    nextQuestion()
}



startGame('flag.png', 'name', 'Africa')