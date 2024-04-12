import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from '../App';
import Home from '../pages/Home';
import Game from '../pages/Game';
import WishList from '../pages/WishList';
import Register from '../pages/Register';
import Login from '../pages/Login';
import LogOut from '../pages/LogOut';

function RoutesSystem() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<App />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/game/:id" element={<Game />} />
                    <Route path="/wishlist" element={<RenderWishList isLoggedIn={isLoggedIn} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<LogOut />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

function RenderWishList({ isLoggedIn }) {
    return isLoggedIn ? <WishList /> : <Navigate to='/login' />;
}

export default RoutesSystem;