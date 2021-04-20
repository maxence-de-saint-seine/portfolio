# APP
## Shape
shape => nom\

## Cartes
carte => nom parmi 4/6/entrer\
nom => carte

## Drapeaux
drapeau => nom parmi 4/6/entrer\
nom => drapeau parmi 4/6/entrer

## Capitales
nom => capitale parmi 4/6/entrer\
capitale =>nom parmi 4/6/enter

## Devises
nom => devise parmi 4/6/entrer

## SubRegion
nom => subregion parmi 4/6/entrer

## Regional Block
nom => regional block parmi 4/6/entrer

## Alpha-2 Code
nom => alpha-2 code\
alpha-2 code => nom


# Server
envoyer text ou cliquer sur un des proposition\

socket listToGuess = ['fr', 'au']\
socket toGuess = 'FR'

to send

    sendToDisplay('toGuess',{\
        type: carte subregion / text / image (shape, flag),
        data: 'fr' / '/map/au.png' / 'https://restcountries.eu/data/fra.svg'
    })

to receive

    receive('guessed', (data) => {

        if( data == toGuess ){
            updateScore(true);
            newToGuess();
        }
        else{
            updateScore(false)
            if(attemp > x){
                sendAnswer()
                newGuess()
            }
        }
    })

new guess

    newGuess(bool){
        listToGuess.pop()
        toGuess = rand from listToGuess
    }

create listToGuess

    createListToGuess(gameMode, filter){
        listFiltered = filterCoutries(filter)
        listFiltered.foreach(country => {
            switch(gameMode){
                case 'shapeToName':
                    list.push(
                        guess: getShape(country.name),
                        answer: country.name
                    )
                case 'flagToName':
                    list.push(
                        guess: country.flag,
                        answer: country.name
                    )
            }
        })
    }

# BUILD