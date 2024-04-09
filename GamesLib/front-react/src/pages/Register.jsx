import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import './Css/Register.css';
import axios from 'axios';

function Register() {

    const navigate = useNavigate(); // Define a função navigate com o hook useNavigate
    const { register, handleSubmit, formState: { errors } } = useForm();



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
                console.error("Houve um erro ao enviar a requisição", error)
            }
        }
    );

    const onSubmit = async (data) => {
        mutation.mutate(data);
    };

    return (
        <div>
            <h1 className='title'>Cadastre-se na GamesLib!</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='form-register'>
                <p>Insira seu nome <input type="text" placeholder="Nome" {...register('name', { required: true })} /></p>
                {errors.name && <p>É obrigatório inserir um nome de usuário</p>}
                <p>Insira seu email <input type="text" placeholder="Email" {...register('email', { required: true })} /></p>
                {errors.email && <p>É obrigatório inserir um email</p>}
                <p>Insira sua senha <input type="password" placeholder="Senha" {...register('password', { required: true })} /></p>
                {errors.password && <p>É obrigatório inserir uma senha</p>}
                <button type="submit" className='btn-register'>Cadastrar</button>
            </form>
            <p className='login'>Já tem uma conta? <a href='/login'>Clique aqui</a></p>
        </div>
    );
}

export default Register;