//DOM OBJECTS - WE GRAB THE ELEMENTS FROM HTML TO USE IN JAVASCRIPT
const mainScreen = document.querySelector('.main-screen');
const pokeName = document.querySelector('.poke-name');
const pokeId = document.querySelector('.poke-id');
const pokeFrontImage = document.querySelector('.poke-front-image');
const pokeBackImage = document.querySelector('.poke-back-image');
const pokeTypeOne = document.querySelector('.poke-type-one');
const pokeTypeTwo = document.querySelector('.poke-type-two');
const pokeWeight = document.querySelector('.poke-weight');
const pokeHeight = document.querySelector('.poke-height');
const pokeListItems = document.querySelectorAll('.list-item');
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');
const leftDPad = document.querySelector('.d-pad__cell.left');
const rightDPad = document.querySelector('.d-pad__cell.right');
const pokeListMoves = document.querySelectorAll('.list-move');

//CONSTANTS & VARIABLES

const TYPES = [
    'normal', 'fighting', 'flying', 'poison', 'ground',
    'rock', 'ghost', 'bug', 'steel', 'fire', 'water',
    'grass', 'electric', 'psychic', 'ice', 'dragon',
    'dark', 'fairy'
];

const MAX_MOVES = 4;

// WE USE 'LET' BECAUSE THESE WILL UPDATE (REMINDER: CONSTANTS CANT CHANGE)
let prevUrl = null;
let nextUrl = null;


//FUNCTIONS


function getMoves (moves){
    let moveArray = [];
    if (moves.length > MAX_MOVES) {
        for (let i = 0; i < MAX_MOVES; i++) {
            let min = 0;
            let max = moves.length;
            let random = Math.floor(Math.random() * (+max - +min)) + +min;
            moveArray = +moves[random].move.name + ', ';
        }
    }else {
        for (let i = 0; i <= moves.length; i++){
            moveArray += moves[i].move.name + ' ';
        }
    }
}


//function that calls on strings, to capitalize every first letter
const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

//This erases the classes that we would add if we kept clicking on pokemons.
const resetScreen = () => {
    mainScreen.classList.remove('hide');
    for (const type of TYPES) {
        mainScreen.classList.remove(type);
    }
};

//Get data right side of screen.
const fetchPokeList = url => {


    fetch(url)
        .then(response => response.json())
        .then(data => {
            // const results = data ['results']; IS THE SAME THING, CALLED DESTRUCTURING
            const { results, previous, next, moveResult} = data;
            prevUrl = previous;
            nextUrl = next;

           /* const dataMove = data['abilities']
            const moveOne = dataMove [0];
            const moveTwo = dataMove [1];
            const moveThree = dataMove [2];
            const moveFour = dataMove [3];


            pokeListMoves.textcontent = capitalize(moveOne['name']);

            for(let i = 0; i < pokeListMoves.length; i++){
                const pokeListMove = pokeListMoves[i];
                const moveResults = moveResult[i];



 */

            //Loop through Poke list items and get an item.
            for( let i = 0; i < pokeListItems.length ; i++){
                const pokeListItem = pokeListItems[i];
                const resultData = results[i];

                if (resultData){
                    //const name = resultData; IS THE SAME THING BUT NOT DESTRUCTURED
                    const { name, url } = resultData;
                    //THIS WILL MAKE THE URL SPLIT AFTER EVERY '/' AND THUS CREATING A LIST OF ELEMENTS WE CAN USE (SECOND TO LAST IS THE (pokemon)INDEX for example°
                    const urlArray = url.split('/');
                    const id = urlArray[urlArray.length - 2];
                    pokeListItem.textContent = id + '. ' + capitalize(name);

                }else {
                    pokeListItem.textContent = '';

                }
            }
        });
};

//LEFT HAND SCREEN

const fetchPokeData = id =>{

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(data => {
         /*   function getMoveList (moveList){
                let moveArray = [];

                for( let i = 0; i < moveList.length; i++){
                    moveArray.push(moveList[i].move.name);

                }
            }*/
            resetScreen();

            let moveList = data.moves;
            const dataType = data['types'];
            const dataFirstType = dataType[0];
            const dataSecondType = dataType[1];
            pokeTypeOne.textContent = capitalize(dataFirstType['type']['name']);
            if (dataSecondType) {
                pokeTypeTwo.classList.remove('hide');
                pokeTypeTwo.textContent = capitalize(dataSecondType['type']['name']);
            } else {
                pokeTypeTwo.classList.add('hide');
                pokeTypeTwo.textContent = '';
            }

            mainScreen.classList.add(dataFirstType['type']['name']);

            let weight = (data['weight'] / 10);
            let height = (data['height'] / 10);

            pokeName.textContent = capitalize(data['name']);
            pokeWeight.textContent = data['weight'];
            pokeHeight.textContent = data['height'];
            //We change the id to a string and with padStart we say that it needs to be 3 digits. If no digit is present, replace with '0'
            pokeId.textContent = '#' + data['id'].toString().padStart(3, '0');
            pokeWeight.textContent = weight;
            pokeHeight.textContent = height;
            pokeFrontImage.src = data['sprites']['front_default'] || '';
            pokeBackImage.src = data['sprites']['back_default'] || '';

        });


}

//button handlers
const handleRightButtonClick = () => {
    if (nextUrl){
        fetchPokeList(nextUrl);
    }
};

const handleLeftButtonClick = () => {
    if (prevUrl){
        fetchPokeList(prevUrl);
    }
};

const handleListItemClick = (e) => {
    if(!e.target) return;

    const listItem = e.target;
    if (!listItem.textContent) return;

    const id = listItem.textContent.split('.')[0];
    fetchPokeData(id);
};
const handleLeftDPadClick = () => {

const handleRightDPadClick = () =>{

const  handleAButton =  () => {
    getMoves()
    }

}
};


//EVENT LISTENERS



rightButton.addEventListener('click',handleRightButtonClick);
leftButton.addEventListener('click',handleLeftButtonClick);
for (const pokeListItem of pokeListItems){
    pokeListItem.addEventListener('click', handleListItemClick);
};

leftDPad.addEventListener('click', handleLeftDPadClick);
rightDPad.addEventListener('click', handleRightButtonClick);


//BOOT UP POKEDEX
fetchPokeList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10');
