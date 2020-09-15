////1.  CREATE THE EVENT LISTENER FOR THE BUTTON YOU WANT TO USE AS 'START'/
////2. CREATE THE FUNCTION AND ADD IT AS PARAMETER FOR YOUR BUTTON EVENT LISTENER. (test with console.log if it works)


const pokeFront = document.querySelector('.pokemonFront');
const pokeBack = document.querySelector('.pokemonBack');
const pokeName = document.querySelector('.pokemonName');
const pokeId = document.querySelector('.pokemonId');
const pokeWeight = document.querySelector('.pokemonWeight');
const pokeHeight = document.querySelector('.pokemonHeight');

//FUNCTIONS



// 2.
function getPoke(){
console.log('getPokeButton works');

let inputId = document.getElementById('pokeFind').value;
let url = 'https://pokeapi.co/api/v2/pokemon/'

fetch (url + inputId)
    .then ((response)  => response.json())
    .then((data) => {
        pokeFront.src = data.sprites['front_default'] || " ";
        pokeBack.src = data.sprites['back_default'] || " ";
        pokeName.textContent = data.name;
        pokeId.textContent = "#" + data.id;
        weight = data.weight / 10;
        height = data.height / 10;
        pokeWeight.textContent = weight + 'kg';
        pokeHeight.textContent = height + 'm';
    })
    .catch((error)=> console.log(error))

}


//EVENT LISTENERS
// 1.
document.getElementById('getPoke').addEventListener('click', getPoke);