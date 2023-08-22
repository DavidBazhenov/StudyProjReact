import React, { useContext } from "react";
import {Link} from 'react-router-dom'
import MyButton from "../button/MyButton";
import { AuthContext } from "../../../context";

const Navbar = () => {

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth')
    }

    const {isAuth, setIsAuth} = useContext(AuthContext);
       return (
        <div className='navbar'>
            <MyButton onClick={logout}>
                Выйти
            </MyButton>
            <div className='navbar_links'>
                <div className="link">
                    <Link to='/about'> О сайте</Link>
                </div>
                <div className="link">
                    <Link to='/posts'> Посты</Link>
                </div>
                
            </div>
        </div>
    );
}

export default Navbar;