////1.  CREATE THE EVENT LISTENER FOR THE BUTTON YOU WANT TO USE AS 'START'/
////2. CREATE THE FUNCTION AND ADD IT AS PARAMETER FOR YOUR BUTTON EVENT LISTENER. (test with console.log if it works)

const MAX_MOVES = 4;
const pokeFront = document.querySelector('.pokemonFront');
const pokeBack = document.querySelector('.pokemonBack');
const pokeName = document.querySelector('.pokemonName');
const pokeId = document.querySelector('.pokemonId');
const pokeWeight = document.querySelector('.pokemonWeight');
const pokeHeight = document.querySelector('.pokemonHeight');
let pokeMoves = document.querySelector('.pokemonMoves');

//FUNCTIONS


// 2.
function getPoke() {
    console.log('getPokeButton works');

    let inputId = document.getElementById('pokeFind').value;
    let url = 'https://pokeapi.co/api/v2/pokemon/'

    fetch(url + inputId)
        .then((response) => response.json())
        .then((data) => {

            pokeName.textContent = data.name;
            pokeId.textContent = "#" + data.id.toString().padStart(3, '0');
            let weight = data.weight / 10;
            let height = data.height / 10;
            pokeWeight.textContent = weight + 'kg';
            pokeHeight.textContent = height + 'm';
            pokeFront.src = data['sprites']['front_default'] || '';
            pokeBack.src = data['sprites']['back_default'] || '';
        })
        .catch((error) => console.log(error))
    if (!inputId){
        console.error('NO CAN DO');
    }
    getMoves()
}

//WORK IN PROGRESS
function getMoves (pokeMoves){
    let moveArray = [];
    if (pokeMoves.length > MAX_MOVES) {
        for (let i = 0; i < MAX_MOVES; i++) {
            let min = 0;
            let max = pokeMoves.length;
            let random = Math.floor(Math.random() * (+max - +min)) + +min;
            moveArray = +pokeMoves[random].move.name + ', ';
        }
    }else {
        for (let i = 0; i <= pokeMoves.length; i++){
            moveArray += pokeMoves[i].move.name + ' ';
        }
    }
    return moveArray;
}

//EVENT LISTENERS
// 1.
document.getElementById('getPoke').addEventListener('click', getPoke);