import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import './Css/Register.css';
import axios from 'axios';

function Login() {
    const navigate = useNavigate(); // Define a função navigate com o hook useNavigate
    const { register, handleSubmit, formState: { errors } } = useForm();


    const mutation = useMutation(
        async (formData) => {
            await axios.post("http://localhost:8000/api/login", formData)
        },
        {
            onSuccess: () => {
                console.log("Usuário logado com sucesso!")
                navigate("/")
            },
            onError: (error) => {
                console.error("Não foi possível logar-se", error)
            }
        }

    );

    const onSubmit = async (data) => {
        mutation.mutate(data);
    }

    return (
        <div>
            <h1 className='title'>Entrar na GamesLib!</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='form-register'>
                <p>Insira seu email <input type="text" placeholder="Email" {...register('email', { required: true })} /></p>
                {errors.email && <p>Insira um email válido!</p>}
                <p>Insira sua senha <input type="password" placeholder="Senha" {...register('password', { required: true })} /></p>
                {errors.password && <p>Insira uma senha válida!</p>}
                <button type="submit" className='btn-register'>Entrar</button>
            </form>
            <p className='login'>Ainda não tem uma conta? <a href='/register'>Clique aqui</a></p>
        </div>
    );
}

export default Login;
