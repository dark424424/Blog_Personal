import React from 'react';
import { Link } from 'react-router-dom';
import './topbar.css';
import { useContext } from 'react';
import { Context } from '../../context/Context';

export default function TopBar() {
    const { user, dispatch } = useContext(Context);
    const PF = 'http://localhost:5000/images/';

    const handleLogout = (e) => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <div className="top">
            <div className="topLeft">
                <i className="topIcon fa-solid fa-flask"></i>
                <i className="topIcon fa-brands fa-square-twitter"></i>
                <i className="topIcon fa-brands fa-square-instagram"></i>
                <i className="topIcon fa-brands fa-square-pinterest"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link to={`/`}>HOME</Link>
                    </li>
                    <li className="topListItem">
                        <Link to={`/`}>ABOUT</Link>
                    </li>
                    <li className="topListItem">
                        <Link to={`/`}>CONTACT</Link>
                    </li>
                    <li className="topListItem">
                        <Link to={`/write`}>WRITE</Link>
                    </li>
                    <li className="topListItem" onClick={handleLogout}>
                        {user && 'LOGOUT'}
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {user ? (
                    <Link to="/settings">
                        <img className="topImage" src={PF + user.profilePicture} alt="" />
                    </Link>
                ) : (
                    <ul className="topList">
                        <li className="topListItem">
                            <Link to={`/login`}>LOGIN</Link>
                        </li>
                        <li className="topListItem">
                            <Link to={`/register`}>REGISTER</Link>
                        </li>
                    </ul>
                )}
                {/* <i className="topSearchIcon fa-solid fa-magnifying-glass"></i> */}
            </div>
        </div>
    );
}
