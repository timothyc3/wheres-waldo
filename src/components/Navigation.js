import React from "react";
import './Navigation.css';
import WaldoLogo from './assets/waldo-logo.png'

export default function Navigation() {
    return (
        <div className="navigation">
            <img src={WaldoLogo} alt=""/>
            <ul>
                <li>Home</li>
                <li>Leaderboard</li>
            </ul>
        </div>
    )
}