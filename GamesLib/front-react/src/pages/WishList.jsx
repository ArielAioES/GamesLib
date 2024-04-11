import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pages/Css/WishList.css'; // Importar arquivo de estilos CSS

const WishList = () => {
    const [wishlist, setWishlist] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchWishlist = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/wishlist');
                setWishlist(response.data);
            } catch (error) {
                console.error('Erro ao obter a lista de desejos:', error);
            }
            setIsLoading(false);
        };
        fetchWishlist();
    }, []);

    const removeFromWishlist = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/wishlist/${id}`);
            setWishlist(wishlist.filter(item => item.id !== id)); // Remove o jogo da lista de desejos localmente
        } catch (error) {
            console.error('Erro ao remover o jogo da lista de desejos:', error);
        }
    };

    return (
        <div className="wishlist-container">
            <h1 className="wishlist-title">Lista de Desejos</h1>
            {isLoading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                </div>
            ) : wishlist.length === 0 ? (
                <p>Nenhum jogo na lista de desejos.</p>
            ) : (
                <ul className="wishlist-list">
                    {wishlist.map((item, index) => (
                        <li key={index} className="wishlist-item">
                            <span>{item.name_game}</span>
                            <button onClick={() => removeFromWishlist(item.id)}>Remover</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default WishList;
