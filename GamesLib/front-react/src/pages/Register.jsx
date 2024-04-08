import React, { useState } from 'react';
import './Css/Register.css';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
            if (response.ok) {
                console.log('Cadastro realizado com sucesso!');
                window.location.href = '/login';
            } else {
                console.error('Erro ao cadastrar:', await response.text());
            }
        } catch (error) {
            console.error('Erro ao enviar requisição:', error);
        }
    };

    return (
        <div>
            <h1 className='title'>Cadastre-se na GamesLib!</h1>
            <form onSubmit={handleSubmit} className='form-register'>
                <p>Insira seu nome <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} /></p>
                <p>Insira seu email <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /></p>
                <p>Insira sua senha <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} /></p>
                <button type="submit" className='btn-register'>Cadastrar</button>
            </form>
            <p className='login'>Já tem uma conta? <a href='/login'>Clique aqui</a></p>
        </div>
    );
}

export default Register;