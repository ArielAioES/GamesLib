import React, { useState } from 'react';
import './Css/Register.css';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Obter o token CSRF
            await axios.get("http://localhost:8000/sanctum/csrf-cookie");

            // Enviar os dados de login para a rota /api/login
            const response = await axios.post("http://localhost:8000/api/login", {
                email: email,
                password: password
            });

            console.log('Login realizado com sucesso!', response.data);
            // Redirecionar para a página home após o login bem-sucedido
            window.location.href = '/'; // Redirecionar para a página home
        } catch (error) {
            console.error('Erro ao efetuar login:', error.response.data.message);
        }
    };

    return (
        <div>
            <h1 className='title'>Entrar na GamesLib!</h1>
            <form onSubmit={handleSubmit} className='form-register'>
                <p>Insira seu email <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /></p>
                <p>Insira sua senha <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} /></p>
                <button type="submit" className='btn-register'>Entrar</button>
            </form>
            <p className='login'>Ainda não tem uma conta? <a href='/register'>Clique aqui</a></p>
        </div>
    );
}

export default Login;
