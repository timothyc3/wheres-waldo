import React, {useEffect} from "react";
import './Timer.css';

export default function Timer(props) {

    return (
        <div className='timer'>
            <h1>
                {props.time/60 < 10 && props.time/60 >= 1 ? `0${~~(props.time/60)}`: ~~(props.time/60)}
                <span>:</span>
                {props.time < 10 || props.time%60 < 10 ? `0${props.time%60}`: props.time%60}
            </h1>
        </div>
    );
}