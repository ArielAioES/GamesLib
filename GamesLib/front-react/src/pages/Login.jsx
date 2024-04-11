import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import './Css/Register.css';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginError, setLoginError] = useState(null); // Estado para armazenar o erro de login

    const mutation = useMutation(
        async (formData) => {
            const response = await axios.post("http://localhost:8000/api/login", formData);
            return response.data; // Retornar os dados da resposta para o callback onSuccess
        },
        {
            onSuccess: (data) => {
                console.log("Usuário logado com sucesso!");
                const accessToken = data.access_token; // Acessar access_token diretamente dos dados retornados
                localStorage.setItem('accessToken', accessToken); // Armazenar o token de acesso no localStorage
                navigate("/"); // Redirecionar após o login bem-sucedido
            },
            onError: (error) => {
                console.error(error);
                setLoginError("Email ou senha inválidos, tente novamente."); // Define a mensagem de erro
            }
        }
    );

    const onSubmit = async (data) => {
        setLoginError(null); // Limpa a mensagem de erro ao tentar fazer login novamente
        mutation.mutate(data);
    }

    return (
        <div>
            <h1 className='title'>Entrar na GamesLib!</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='form-register'>
                <p className='label'>Insira seu email <input type="text" className='input' placeholder="Email" {...register('email', { required: true })} /></p>
                {errors.email && <p className='error'>Insira um email válido!</p>}
                <p className='label'>Insira sua senha <input type="password" className='input' placeholder="Senha" {...register('password', { required: true })} /></p>
                {errors.password && <p className='error'>Insira uma senha válida!</p>}
                <button type="submit" className='btn-register'>Entrar</button>
                {loginError && <p className="error-message">{loginError}</p>}
            </form>
            <p className='login'>Ainda não tem uma conta? <a href='/register'>Clique aqui</a></p>
        </div>
    );
}

export default Login;