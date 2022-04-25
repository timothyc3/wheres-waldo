import './Game.css';
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import './Game.css'
import { gameInfo } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Game() {
    const location = useLocation()

    const [playerClick, setPlayerClick] = useState({display: "none", x: 0, y: 0})

    const targetWidth = 30;
    const targetHeight = 30;

    function clickImage(event) {
        // get game div's location on the page, to get the coordinates in reference to within this div only
        // this is to offset the navigation menu
        const gameDiv = event.target.getBoundingClientRect().y

        setPlayerClick({...playerClick, x: event.pageX, y: event.clientY- gameDiv, display: 'inline'})
        async function getCharacterData() {
            const characterInfoDocument = doc(gameInfo, "character-info",
                `level-${location.state.level}`);
            const infoSnapshot = await getDoc(characterInfoDocument)

            if (infoSnapshot.exists()) {
                return infoSnapshot.data()
            } else {
                throw new Error('document not found')
            }
        }

        function checkSelection(data) {
            const playerTargetLeft = playerClick.x - targetWidth/2;
            const playerTargetRight = playerClick.y - targetWidth/2;



        }

        getCharacterData().then(data => console.log(data))


    }

    return (
        <div className={'game'}>
            <img className='gameImage' src={location.state.imageUrl} alt={''} onClick={clickImage}></img>
            {playerClick && (<div className="target" style={
                {   width: `${targetWidth}px`,
                    height: `${targetHeight}px`,
                    left: playerClick.x - targetWidth/2,
                    top: playerClick.y - targetHeight/2,
                    display: playerClick.display}}></div>)}
        </div>

    )
}