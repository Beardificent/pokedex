//DOM OBJECTS
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

//CONSTANTS & VARIABLES

const TYPES = [
    'normal', 'fighting', 'flying', 'poison', 'ground',
    'rock', 'ghost', 'bug', 'steel', 'fire', 'water',
    'grass', 'electric', 'psychic', 'ice', 'dragon',
    'dark', 'fairy'
];


//functions
//function that calls on strings, to capitalize every first letter
const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

//This erases the classes that we would add if we kept on looking for pokemons.
const resetScreen = () => {
    mainScreen.classList.remove('hide');
    for (const type of TYPES) {
mainScreen.classList.remove(type);
    }
};
//Get Data leftside of screen (main screen)

fetch('https://pokeapi.co/api/v2/pokemon/1')
    .then(response => response.json())
    .then(data => {

        resetScreen();

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


        pokeName.textContent = capitalize(data['name']);
        //We change the id to a string and with padStart we say that it needs to be 3 digits. If no digit is present, replace with '0'
        pokeId.textContent = '#' + data['id'].toString().padStart(3, '0');
        pokeWeight.textContent = data['weight'];
        pokeHeight.textContent = data['height'];
        pokeFrontImage.src = data['sprites']['front_default'] || '';
        pokeBackImage.src = data['sprites']['back_default'] || '';
    });

//Get data right side of screen.
fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
    .then(response => response.json())
    .then(data => {
        //const { results } = data; IS THE SAME THING, CALLED DESTRUCTURING
        const results = data ['results'];


   //Loop through Pokelistitems and get an item.
        for( let i = 0; i < pokeListItems.length ; i++){
            const pokeListItem = pokeListItems[i];
            const resultData = results[i];



            if (resultData){
                //const name = resultData; IS THE SAME THING BUT NOT DESTRUCTURED
                const { name, url } = resultData;
                //THIS WILL MAKE THE URL SPLIT AFTER EVERY '/' AND THUS CREATING A LIST IF ELEMENTS WE CAN USE (SECOND TO LAST IS THE (pokemon)INDEX for example°
                const urlArray = url.split('/');
                const id = urlArray[urlArray.length - 2];
                pokeListItem.textContent = id + '. ' + capitalize(name);

            }else {
                pokeListItem.textContent = '';

            }
        }
    })
