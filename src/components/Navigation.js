import React from "react";
import './Navigation.css';
import WaldoLogo from './assets/waldo-logo.png';
import { Link } from 'react-router-dom';

export default function Navigation() {
    return (
        <div className="navigation">
            <img src={WaldoLogo} alt=""/>
            <ul>
                <Link to='/'>
                    <li>Home</li>
                </Link>
                <Link to='/Leaderboard'>
                    <li>Leaderboard</li>
                </Link>
            </ul>
        </div>
    )
}