import './Game.css';
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import './Game.css'

export default function Game() {
    const location = useLocation()

    const waldoLocation = [
        {imageUrl: 'https://firebasestorage.googleapis.com/v0/b/wheres-waldo-e8e98.appspot.com/o/waldo-1.jpg?alt=media&token=137618d7-c242-4ea1-a52c-8d081d553eee',
        waldo: {top: 290, left: 1150, width: 50, height: 80}}
    ]

    const [playerClick, setPlayerClick] = useState({display: "none", x: 0, y: 0})

    function clickImage(event) {
        // get game div's location on the page, to get the coordinates in reference to within this div only
        // this is to offset the navigation menu
        const gameDiv = event.target.getBoundingClientRect().y

        setPlayerClick({...playerClick, x: event.pageX, y: event.pageY - gameDiv, display: 'inline'})

    }

    const targetWidth = 30;
    const targetHeight = 30;

    return (
        <div className={'game'}>
            <img className='gameImage' src={location.state.imageUrl} alt={''} onClick={clickImage}></img>
            {playerClick && (<div className="waldo" style={
                {   width: `${targetWidth}px`,
                    height: `${targetHeight}px`,
                    left: playerClick.x - targetWidth/2,
                    top: playerClick.y - targetHeight/2,
                    display: playerClick.display}}></div>)}
        </div>

    )
}