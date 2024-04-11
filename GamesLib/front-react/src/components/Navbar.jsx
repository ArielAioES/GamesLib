//Imports necessários
import { Link, useNavigate } from "react-router-dom";
import { IoGameController } from "react-icons/io5";
import { CiCircleList } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";

import "./Css/Navbar.css";

function Navbar() {
  const navigate = useNavigate(); // Define a função navigate com o hook useNavigate

  // Função para recarregar a página ao clicar no logo
  const handleReloadPage = () => {
    // Navegar para a página inicial e recarregar a página
    navigate("/")
    window.location.reload();
  };

  // Renderiza a Navbar
  return (
    <nav id="navbar">
      <h2>
        <Link onClick={handleReloadPage}>
          <IoGameController />GamesLib
        </Link>
      </h2>

      <Link to="/wishlist">
        <CiCircleList className="wishlist" />
      </Link>

      <Link to="/register">
        <h2> <FaUserCircle className="profile" /></h2>
      </Link>
    </nav>
  );

};

export default Navbar;