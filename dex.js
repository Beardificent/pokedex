const mainScreen = document.querySelector('.main-screen');
const pokeName = document.querySelector('.poke-name');
const pokeId = document.querySelector('.poke-id');
const pokeFrontImage = document.querySelector('.poke-front-image');
const pokeBackImage = document.querySelector('.poke-back-image');
const pokeTypeOne = document.querySelector('.poke-type-one');
const pokeTypeTwo = document.querySelector('.poke-type-two');
const pokeWeight = document.querySelector('.poke-weight');
const pokeHeight = document.querySelector('.poke-height');
const pokeListItems = document.querySelector('.list-item');
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');

fetch('https://pokeapi.co/api/v2/pokemon/1')
    .then (response => response.json())
    .then(data => {
        console.log(data);
    mainScreen.classList.remove('hide');
        pokeName.textContent = data['name'];
        pokeId.textContent = data['id'];
        pokeWeight.textContent = data['weight'];
        pokeHeight.textContent = data['height'];

        const dataType = data['types'];
        const dataFirstType = dataType[0];
        const dataSecondType = dataType[1];
        pokeTypeOne.textContent = dataFirstType['type']['name'];
        if (dataSecondType){
            pokeTypeTwo.classList.remove('hide');
            pokeTypeTwo.textContent = dataSecondType['type']['name'];
        } else {
            pokeTypeTwo.classList.add('hide');
            pokeTypeTwo.textContent = '';
        }
pokeFrontImage.src = data['sprites']['front_default'] || '';
pokeBackImage.src = data['sprites']['back_default']        || '';
    });