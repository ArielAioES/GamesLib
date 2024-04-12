import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './Css/Register.css';

function Register() {

    const navigate = useNavigate(); // Define a função navigate com o hook useNavigate
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginError, setLoginError] = useState(null); // Estado para armazenar o erro de login


    const mutation = useMutation(
        async (formData) => {
            await axios.post('http://127.0.0.1:8000/api/users', formData);
        },
        {
            onSuccess: () => {
                console.log("Cadastro realizado com sucesso!");
                navigate("/login");
            },
            onError: (error) => {
                console.error(error)
                setLoginError("Email existente, tente outro."); // Define a mensagem de erro
            }
        }
    );

    const onSubmit = async (data) => {
        setLoginError(null); // Limpa a mensagem de erro ao tentar fazer login novamente
        mutation.mutate(data);
    };

    return (
        <div>
            <h1 className='title'>Cadastre-se na GamesLib!</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='form-register'>
                <p>Insira seu nome <input type="text" className='input' placeholder="Nome" {...register('name', { required: true })} /></p>
                {errors.name && <p className='error'>É obrigatório inserir um nome de usuário</p>}
                <p>Insira seu email <input type="text" className='input' placeholder="Email" {...register('email', { required: true })} /></p>
                {errors.email && <p className='error'>É obrigatório inserir um email</p>}
                <p>Insira sua senha <input type="password" className='input' placeholder="Senha" {...register('password', { required: true })} /></p>
                {errors.password && <p className='error'>É obrigatório inserir uma senha</p>}
                <button type="submit" className='btn-register'>Cadastrar</button>
                {loginError && <p className="error-message">{loginError}</p>}
            </form>
            <p className='login'>Já tem uma conta? <a href='/login'>Clique aqui</a></p>
        </div>
    );
}

export default Register;