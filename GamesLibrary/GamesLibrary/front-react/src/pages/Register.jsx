import './Css/Register.css'

function Register(){

    return(

        <div>
            <h1 className='title'>Cadastre-se na GamesLib!</h1>
            <form action="" className='form-register'>
            <p>Insira seu nome <input type="text" placeholder="Nome"/></p>
            <p>Insira seu email <input type="text" placeholder="Email"/></p>
            <p>Insira sua senha <input type="password" placeholder="Senha"/></p>
            <button type="submit" className='btn-register'>Cadastrar</button>
            </form>
            <p className='login'>Já tem uma conta? <a href='/login'>Clique aqui</a></p>
        </div>

    )

}

export default Register;