const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;


const fetchPokemon = async (pokemon)=> {
    const APIRespnse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIRespnse.status == 200){
        const data = await APIRespnse.json();
        return data;
    } 
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'

    const data = await fetchPokemon(pokemon)

    if (data) {
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        if (data.id <= 649) pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        if (data.id >= 650) pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['front_default']
        
        input.value = '';
        searchPokemon = data.id
    } else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not Foun :C';
        pokemonNumber.innerHTML = '';
    }
} 

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
})

buttonPrev.addEventListener('click', (event) => {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon)
    } 
})

buttonNext.addEventListener('click', (event) => {
    searchPokemon += 1;
    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon);