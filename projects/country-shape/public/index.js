//const srcPath = path.resolve('src');
//const filenames = glob.sync(srcPath + '/maps/**/*.svg')
const extesion = '.png'
const resolution = '1080'

const mapContainer = document.getElementById('mapContainer')
const guessForm = document.getElementById('guessForm')
const guessInput = document.getElementById('guessInput')
guessForm.addEventListener('submit', submit)
const filterSelection = document.getElementById('filterSelection')



async function startGame(filter) {
    let result = await fetch('https://restcountries.eu/rest/v2/all?fields=alpha2Code;name;region;subregion;regionalBlocs')
    let json = await result.json()
    
    countryList = [];
    json.forEach(country => {
        if (filter == 'none' || country.region == filter || country.subregion == filter) {
            countryList.push(country)
        }
        else if (listObjectContains(country.regionalBlocs, 'acronym', filter) != -1) {
            countryList.push(country)
        }
    });

    console.log(countryList)
    newCountryToGuess(countryList)
}

function listObjectContains(list = [], key, contain) {
    for (i = 0; i < list.length; i++){
        if (list[i][key].toLowerCase() == contain.toLowerCase()) {
            return i;
        }
    }
    return -1;
}

function endGame() {
    alert('You Won!')
}

function newCountryToGuess(countryList) {
    if (countryList == null || countryList.length == 0) {
        endGame();
    }
    else {
        countryToGuess = countryList[Math.floor(Math.random() * countryList.length)]
        displayMap(countryToGuess.alpha2Code)

        console.log(countryToGuess.name)
        return countryToGuess.name
    }
}

function displayMap(alpha2Code) {
    var map = document.createElement('img');
    map.setAttribute('src', '/public/all/' + alpha2Code.toLowerCase() + '/1024.png')
    console.log(map)

    while (mapContainer.firstChild) {
        mapContainer.removeChild(mapContainer.firstChild)
    }
    mapContainer.appendChild(map)
}

function submit(e) {
    e.preventDefault()
    const countryGuessed = guessInput.value
    guessInput.value = ''

    if (countryGuessed.toLowerCase() == countryToGuess.name.toLowerCase()) {
        attempts = 0
        console.log('yes')
        var index = listObjectContains(countryList, 'name', countryGuessed)
        countryList.splice(index, 1)
        newCountryToGuess(countryList)
    } else {
        attempts++
        console.log(`Wrong, attempts ${attempts}/5`)
        if (attempts >= 5) {
            attempts = 0
            alert(`Skipped, it was ${countryToGuess.name}`)
            var index = listObjectContains(countryList, 'name', countryToGuess.name)
            if (index == -1) {
                console.error('index invalid')
                return
            }
            countryList.splice(index, 1)
            newCountryToGuess(countryList)
        }
    }
}

function changeFilter() {
    const newFilter = filterSelection.value
    console.log(`New filter = ${newFilter}`)
    startGame(newFilter)
}



var countryList = []
var attempts = 0;
var filter = 'none'
startGame(filter)