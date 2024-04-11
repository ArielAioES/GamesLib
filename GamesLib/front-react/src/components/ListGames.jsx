//Imports necessários
import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { BiSearchAlt2 } from 'react-icons/bi';
import { useQuery } from 'react-query';
import axios from 'axios';

import './Css/ListGames.css';

function ListGames() {
    const [games, setGames] = useState([]); // Define o estado games e a função setGames
    const [searchTerm, setSearchTerm] = useState(''); // Define o estado searchTerm e a função setSearchTerm
    const navigate = useNavigate(); // Define a função navigate com o hook useNavigate
    

    // Consulta para buscar os dados dos jogos
    const { data: gamesData, isLoading: isQueryLoading } = useQuery("games", async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api");
            return response.data;
        } catch (error) {
            console.error("Houve um erro em acessar os jogos", error);
            throw error;
        }
    });

    useEffect(() => {
        if (gamesData) {
            // Atualiza o estado de games quando os dados são obtidos da consulta
            setGames(gamesData);
        }
    }, [gamesData]);

    // Função para navegar para os detalhes do jogo
    const goToGameDetails = (game) => {
        navigate(`/game/${game.slug}`, { state: { game } });
    };

    // Função para lidar com a pesquisa de jogos
    const handleSearch = async (event) => {
        event.preventDefault(); // Previne o comportamento padrão do formulário
        const searchTermTrimmed = searchTerm.trim();
        if (searchTermTrimmed === '') return; // Ignora a pesquisa se o termo estiver vazio

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/search/${searchTermTrimmed}`);
            const searchData = response.data;
            setGames(searchData);
        } catch (error) {
            console.error('Erro ao realizar a pesquisa:', error.message); // Exibe um erro no console em caso de falha
        }
    };

    return (
        <div className="container">
            <h1 className="title">Buscar</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Pesquisar jogos..."
                />
                <button type="submit">
                    <BiSearchAlt2 />
                </button>
            </form>
            {(isQueryLoading || !games.length) && (
                <div className="loading-container">
                    <div className="spinner"></div>
                </div>
            )}

            <div className='games-container'>
                {games.map((game, index) => (
                    <div key={game.id} className="game-card" onClick={() => goToGameDetails(game)}>
                        <h2 className='nameGame'>{game.name}</h2>
                        {game.background_image && (
                            <img src={game.background_image} alt="Imagem do jogo" />
                        )}
                        {game.rating !== undefined && (
                            <p className='rate'>
                                <FaStar className='star' /> {game.rating}
                            </p>
                        )}
                        <div className="genre-card">
                            {game.genres.map(genre => (
                                <li key={genre} className="genre">{genre}</li>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListGames;