import './LeaderboardForm.css';
import React from "react";
import Timer from "./Timer";

export default function LeaderboardForm(props) {
    return (
        <div className='form-container' style={props.styles}>
            <form action="" style={props.displayMode}>
                <div className="score">
                    <h1>Your time:</h1>
                    <Timer time={props.time}/>
                </div>
                <ul>
                    <li>
                        <label htmlFor="name">Add your name:</label>
                        <input type="text" name='name' id='name'/>
                    </li>
                    
                    <li>
                        <input type="submit"/>
                    </li>
                </ul>
            </form>
        </div>
    )
}