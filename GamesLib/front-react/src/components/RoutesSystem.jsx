import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from '../App';
import Home from '../pages/Home';
import Game from '../pages/Game';
import WishList from '../pages/WishList';
import Register from '../pages/Register';
import Login from '../pages/Login';

function RoutesSystem() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<App />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/game/:id" element={<Game />} />
                    <Route path="/wishlist" element={<WishList />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesSystem;
