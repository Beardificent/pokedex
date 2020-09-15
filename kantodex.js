////1.  CREATE THE EVENT LISTENER FOR THE BUTTON YOU WANT TO USE AS 'START'/
////2. CREATE THE FUNCTION AND ADD IT AS PARAMETER FOR YOUR BUTTON EVENT LISTENER. (test with console.log if it works)



//FUNCTIONS

// 2.
function getPoke(){
console.log('getPokeButton works');
fetch ('https://pokeapi.co/api/v2/pokemon/4')
    .then ((response)  => response.json())
    .then((data) => {
        document.getElementById('showPokemon').innerHTML = data.sprites;
        document.getElementById('pokemonName').innerHTML = data.name;
        document.getElementById('pokemonId').innerHTML = data.id;
        document.getElementById('pokemonWeight').innerHTML = data.weight + 'kg';
        document.getElementById('pokemonHeight').innerHTML = data.height + 'm';
    })
    .catch((error)=> console.log(error))

}


//EVENT LISTENERS
// 1.
document.getElementById('getPoke').addEventListener('click', getPoke);