import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';

//Importing Styles
import "./Home.css"

//Importing HOC
import CharacterCard from "../../HOC/CharacterCard/CharacterCard";
import AnimeCard from "../../HOC/AnimeCard/AnimeCard";

const Home = (props) => {
    const [animeList, setAnimeList] = useState(null);
    const [characterList, setCharacterList] = useState(null);

    const fetchAnime = async () => {
        const tempAnimeList = await Axios.get("https://api.jikan.moe/v3/search/anime?order_by=members&limit=10");
        const tempCharacterList = await Axios.get("https://kitsu.io/api/edge/characters");
        setAnimeList(tempAnimeList.data.results);
        setCharacterList(tempCharacterList.data.data);
    }
    useEffect(() => {
        fetchAnime();
    }, [])

    return (
        <div className="Home">
            <h1>Popular Anime</h1>
            <div className="card-list">
                {
                    animeList &&
                    animeList.map((anime) => (<AnimeCard item={anime} key={anime.mal_id} />))
                }
            </div>
            <h1 id="char-head" >Popular Characters</h1>
            <div className="card-list">
                {
                    characterList &&
                    characterList.map((character) => (<CharacterCard item={character} key={character.id} />))
                }
            </div>
        </div>
    )
}

export default withRouter(Home)
