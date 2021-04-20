const answerContainer = document.getElementById('answer')
const questionContainer = document.getElementById('question')

const scoreContainer = document.getElementById('score')

const answerForm = document.getElementById('answerForm')
const answerInput = document.getElementById('answerInput')
answerForm.addEventListener('submit', submitText)

let correctAnswerIndex = -1
let listQuestion = []
let attempts = 0
let maxAttempts = 3
let score = 0
let maxScore = 0

async function startGame() {
    let params = getParams()
    console.log(params)

    switch (params.mode) {
        case 'flags':
            params.question = 'alpha2Code'
            params.answer = 'name'
            displayQuestion = displayFlag
            break
        case 'capital':
            params.question = 'capital'
            params.answer = 'name'
            break
        case 'alpha2Code':
            params.question = 'alpha2Code'
            params.answer = 'name'
            break
        case 'currencies':
            params.question = 'name'
            params.answer = 'currencies'
            displayAnswer = displayCurrencies
            break
        case 'shape':
            params.question = 'alpha2Code'
            params.answer = 'name'
            displayQuestion = displayShape
        default:
            console.error('mode not valid')
    }

    listQuestion = await getListQuestion(params)
    console.log(listQuestion)

    maxScore = listQuestion.length
    updateScore()

    correctAnswerIndex = nextQuestion()
}

function getParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const keys = urlParams.keys()

    let mode = ''
    let filter = {}
    for (const key of keys) {
        let x = { key: key, value: urlParams.get(key) }
        if (x.key == 'mode') { mode = x.value }
        else { filter = x }
    }

    return {mode, filter}
}

function listObjectContains(list = [], key, contain) {
    console.log(contain.toLowerCase())
    for (i = 0; i < list.length; i++){
        console.log(list[i][key].toLowerCase())
        if (list[i][key].toLowerCase() == contain.toLowerCase()) {
            return i;
        }
    }
    return -1;
}

async function getListQuestion(params) {
    let link = `https://restcountries.eu/rest/v2/all?fields=${params.filter.key};${params.answer};${params.question}`

    let result = await fetch(link)
    let json = await result.json()

    let listQuestion = []
    json.forEach(country => {
        if (params.filter.key == 'regionalBlocs') {
            if (listObjectContains(country[params.filter.key], 'acronym', params.filter.value) != -1) {
                addQuestion(country)
            }
        }
        else if (params.filter.key == 'languages') {
            if (listObjectContains(country[params.filter.key], 'name', params.filter.value) != -1) {
                addQuestion(country)
            }
        }
        else if (country[params.filter.key] == params.filter.value) {
            addQuestion(country)
        }
    });

    function addQuestion(country) {
        listQuestion.push({
            question: country[params.question],
            answer: country[params.answer]
        })
    }


    return listQuestion
}

function nextQuestion() {
    attempts = 0

    if (correctAnswerIndex != -1) {
        listQuestion.splice(correctAnswerIndex, 1)
    }

    if (listQuestion == null || listQuestion.length == 0) {
        endGame();
    }
    else {
        correctAnswerIndex = Math.floor(Math.random() * listQuestion.length)
        console.log(listQuestion[correctAnswerIndex])
        displayQuestion(questionContainer, listQuestion[correctAnswerIndex].question)
        displayAnswer(answerContainer, listQuestion[correctAnswerIndex].answer)

        return correctAnswerIndex
    }
}


function submitText(e) {
    e.preventDefault()
    const guess = answerInput.value
    answerInput.value = ''
    console.log('Your answer is: ' + guess)
    submitGuess(guess)
}

function submitGuess(guess) {
    attempts++

    if (typeof (listQuestion[correctAnswerIndex].answer) == 'string') {
        if (guess.toLowerCase() == listQuestion[correctAnswerIndex].answer.toLowerCase()) {
            console.log('correct answer')
            updateScore(maxAttempts - attempts + 1)
            nextQuestion()
            return
        }
    }
    else if (typeof (listQuestion[correctAnswerIndex].answer) == 'object') {
        if (listObjectContains(listQuestion[correctAnswerIndex].answer, 'code', guess) != -1) {
            console.log('correct answer')
            updateScore(maxAttempts - attempts + 1)
            nextQuestion()
            return
        }
    }

    console.log('wrong answer, correct answer is ' + listQuestion[correctAnswerIndex].answer[0].name)
    if (attempts >= maxAttempts) {
        alert('too many attempts, the answer was ' + listQuestion[correctAnswerIndex].answer)
        nextQuestion()
    }
}

function endGame() {
    alert('Congrats!')
}

function updateScore(point = 0) {
    score += point
    scoreContainer.innerText = `Score = ${score}/${maxScore * maxAttempts}`
}

//#region display
function displayQuestion(container, text) {
    container.innerText = text
}
function displayAnswer(container, text) {
    
}
const displayFlag = function (container, alpha2Code) {
    let img = document.createElement('img')
    img.setAttribute('src', `ressources/flag/${alpha2Code}.png`)
    console.log(img)
    container.innerText = ''
    container.appendChild(img)
}
const displayShape = function (container, alpha2Code) {
    let img = document.createElement('img')
    img.setAttribute('src', `ressources/shape/${alpha2Code}/512.png`)
    console.log(img)
    container.innerText = ''
    container.appendChild(img)
}
const displayCurrencies = function (container, currencies) {    
    let options = []
    options.push(currencies[0])
    for (i = 0; i < 3; i++){
        options.push(randomOptionCurrency(options))
    }
    shuffleArray(options)
    
    container.innerHTML = ''
    options.forEach(option => {
        console.log(option.code)
        let btn = createButton(option.code)
        btn.innerText = `${option.code} | ${option.symbol}`
        container.appendChild(btn)
    })
}

function randomOption(currentOptions) {
    let i = 0
    option = ''
    while (i<100) {
        rand = Math.floor(Math.random() * listQuestion.length)
        option = listQuestion[rand].answer[0]
        if (currentOptions.indexOf(option) == -1) {
            return option
        }
        i++
    }
    return option
}

function randomOptionCurrency(options) {
    let i = 0
    option = ''
    while (i<100) {
        rand = Math.floor(Math.random() * listQuestion.length)
        option = listQuestion[rand].answer[0]
        if (options.indexOf(option) == -1) {
            return option
        }
        i++
    }
    return option
}
function createButton(guess) {
    let btn = document.createElement('button')
    btn.setAttribute('onclick', `submitGuess('${guess}')`)
    return btn
}
function shuffleArray(arr) {
    arr.sort(() => Math.random() - 0.5);
}
//#endregion



startGame();