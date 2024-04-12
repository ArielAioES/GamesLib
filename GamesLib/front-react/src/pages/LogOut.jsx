import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Css/LogOut.css';

function LogOut() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn'); // Remove o token de autenticação do localStorage
        navigate("/"); // Redireciona para a página de login após o logout
    };

    return (
        <div className="logout-container">
            <h1>Tem certeza de que deseja sair da sua conta?</h1>
            <div className="logout-buttons">
                <button onClick={handleLogout} className="logout-button">Sim, sair</button>
                <button onClick={() => navigate('/')} className="cancel-button">Cancelar</button>
            </div>
        </div>
    );
}

export default LogOut;
