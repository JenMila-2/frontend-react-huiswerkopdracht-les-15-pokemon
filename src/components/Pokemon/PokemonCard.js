import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './PokemonCard.css';

function PokemonCard({endpoint}) {
    const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        console.log(endpoint);

        async function fetchData() {
            try {
                const response = await axios.get(`${endpoint}`);
                setPokemon(response.data);
            } catch (e) {
                console.error(e);
            }
        }
        //Only when there is an endpoint, the function will run
        if (endpoint) {
            void fetchData();
        }
        //The endpoint below is added for updating the life cycle
    }, [endpoint]);

    return (
        <section className="pokemon-cards">
            {Object.keys(pokemon).length > 0 &&
                <>
                <h2>{pokemon.name}</h2>
                    <img
                        src={pokemon.sprites.front_default}
                        alt="Picture of Pokemon"
                    />
                    <p><strong>Moves: </strong>{pokemon.moves.length}</p>
                    <p><strong>Weight: </strong>{pokemon.weight}</p>
                    <p><strong>Abilities: </strong></p>
                    <ul>
                        {pokemon.abilities.map((ability) => {
                            return (
                                <li key={`${ability.ability.name}-${pokemon.name}`}>
                                    {ability.ability.name}
                                </li>
                            )
                        })}
                    </ul>
                </>
            }
        </section>
    );
}

export default PokemonCard;