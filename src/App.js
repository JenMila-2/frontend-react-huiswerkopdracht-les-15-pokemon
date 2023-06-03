import React, {useEffect, useState} from 'react';
import logo from './assets/logo.png';
import './App.css';
import axios from "axios";
import PokemonCard from "./components/Pokemon/PokemonCard";
import Button from "./components/Button/Button";

function App() {
    const [pokemon, setPokemon] = useState([]);
    const [endpoint, setEndpoint] = useState('https://pokeapi.co/api/v2/pokemon/');
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState(false);

    //We are using useEffect to avoid a loop, this makes sure the function will only run when the endpoint is changed
    useEffect(() => {
        async function fetchData() {
            toggleLoading(true);
            setError(false);

            try {
                const response = await axios.get(`${endpoint}`);
                setPokemon(response.data);
            } catch (e) {
                console.error(e);
                setError(true)
            }
            toggleLoading(false);
        }
        void fetchData();
    }, [endpoint]);


  return (
    <div className="pokemon-overview">
        {pokemon &&
        <>
            <img src={logo} alt="pokemon-logo" width="400px" />
            <section className="navigation-buttons">
                <Button
                clickHandler={() => setEndpoint(pokemon.previous)}
                disabled={!pokemon.previous}
                >
                    Vorige
                </Button>
                <Button
                clickHandler={() => setEndpoint(pokemon.next)}
                disabled={!pokemon.next}
                >
                    Volgende
                </Button>
            </section>

            {pokemon.results && pokemon.results.map((pokemon) => {
                return <PokemonCard key={pokemon.name} endpoint={pokemon.url} />
            })}
        </>
        }
            {loading && <p>Loading...</p>}
            {error && <p>Oeps! Ophalen van data is niet gelukt...</p>}
    </div>
  );
}

export default App;
