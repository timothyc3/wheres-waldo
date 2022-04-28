import './LeaderboardForm.css';
import React, { useState } from "react";
import Timer from "./Timer";
import { Link } from "react-router-dom";
import { handleScoreSubmit } from "../firebase";

export default function LeaderboardForm(props) {

    const [name, setName] = useState('');
    const [submitted, setSubmitted] = useState(false);

    return (
        <div className='form-container' style={props.styles}>
            <form action="" style={props.displayMode}>
                <span className='accent'></span>
                <div className="score">
                    <h1>Your time</h1>
                    <Timer time={props.time}/>
                </div>
                <ul>
                    <li>
                        <label htmlFor="name">Add your name:</label>
                        <input type="text" name='name' id='name' onInput={(event) => {
                            setName(event.target.value)
                        }}/>
                    </li>
                    
                    <li>
                        <input type="submit" onClick={(event) => {
                            event.preventDefault();
                            if (submitted === false) {
                                handleScoreSubmit({name: name, time: props.time}).then( () => {
                                    setSubmitted(true);
                                });
                            }
                        }}/>
                        <h3>or <Link to='/'>return to main menu</Link></h3>
                    </li>

                    <li style={{visibility: submitted ? 'visible' : 'hidden'}}>
                        <h3>Submission Complete</h3>
                    </li>
                </ul>
            </form>
        </div>
    )
}