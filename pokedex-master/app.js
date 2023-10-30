const getPokemonurl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(150).fill().map((_, index) => 
        fetch(getPokemonurl(index + 1)).then(response => response.json()))

const generateHTML = pokemons =>  pokemons.reduce((acc, {name, id, types, sprites}) => {
        const elementsTypes = types.map(typeInfo => typeInfo.type.name)

        acc += `
            <li class="card  ${elementsTypes[0]}">
                <img class="card-image" alt="${name}" src="${sprites.front_default}"></img>
                <h2 class="card-title">${id}.${name}</h2>
                <p class="card-subtitle">${elementsTypes.join(' | ')}</p>
            </li>
        `
        return acc
    }, '')


const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}

const fatchPokemon = () => {

    const pokemonPromises = generatePokemonPromises()

    Promise.all(pokemonPromises)
        .then(generateHTML)
        .then(insertPokemonsIntoPage)
}

fatchPokemon()