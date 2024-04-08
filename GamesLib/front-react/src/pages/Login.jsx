// import './Css/Register.css'

// function Register() {

//     const form = ref({
//         email: null,
//         password: null
//     });

//     async function onLogin() {
//         await axios.get("http://localhost:8000/sanctum/csrf-cookie")
//         await axios.post("http://localhost:8000/login", {
//             email: form.value.email,
//             password: form.value.password
//         });
//     }

//     return (

//         <div>
//             <h1 className='title'>Entrar na GamesLib!</h1>
//             <form action="" className='form-register' onSubmit={onLogin}>
//                 <p>Insira seu email <input type="text" placeholder="Email" /></p>
//                 <p>Insira sua senha <input type="password" placeholder="Senha" /></p>
//                 <button type="submit" className='btn-register'>Entrar</button>
//             </form>
//             <p className='login'>Ainda não tem uma conta? <a href='/register'>Clique aqui</a></p>

//         </div>

//     )

// }

// export default Register;