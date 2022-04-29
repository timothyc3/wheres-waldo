import './LeaderboardForm.css';
import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import { Link } from "react-router-dom";
import { handleScoreSubmit } from "../firebase";

export default function LeaderboardForm(props) {

    const [name, setName] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [nameError, setNameError] = useState('invalid');
    const [minNameLength, maxNameLength] = [3, 20];

    useEffect(() => {
        if (name.length === 0) {
            setNameError('Please fill in name');
        }

        else if (name.length < minNameLength) {
            setNameError('Name needs to above 3 characters');
        }
    }, [name]);

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
                        <input type="text" name='name' id='name' autoComplete='off' required
                               minLength={minNameLength} maxLength={maxNameLength}
                               placeholder=''
                               onInput={(event) => {
                                   setName(event.target.value);
                                    console.log(submitted)}
                        }/>
                        <h4>* {nameError}</h4>
                    </li>
                    
                    <li>
                        <input type="submit"
                               disabled={submitted}
                               onClick={(event) => {
                                    event.preventDefault();
                                    if (submitted === false && name.length >= minNameLength && name.length <= maxNameLength) {
                                        handleScoreSubmit(
                                            {name: name, time: props.time, level: props.location.state.level})
                                            .then(() => {setSubmitted(true);});
                                    }
                                    else {
                                        console.log('invalid submission', submitted)}
                               }}/>
                        <h3>{submitted ? '' : 'or '}<Link to='/'>return to home</Link></h3>

                        <div className='submit-message'
                             style={{visibility: submitted ? 'visible' : 'hidden'}}>
                            <ion-icon name="checkmark-circle-outline"></ion-icon>
                            <h3>Submission Complete</h3>
                        </div>

                    </li>
                </ul>
            </form>
        </div>
    )
}