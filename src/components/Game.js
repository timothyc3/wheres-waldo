import './Game.css';
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import './Game.css';
import { gameInfo } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Game() {
    const location = useLocation();

    // stores the coordinate of the players target
    const [playerClick, setPlayerClick] = useState({display: "none", x: 0, y: 0});

    // expected shape: {waldo: true, wilma: true}, characters not present should not be listed in this object.
    const [characterInfo, setCharacterInfo] = useState();

    // width and height of the player's click check range
    const targetWidth = 30;
    const targetHeight = 30;

    // set the location player's click
    function clickImage(event) {
        // get game div's location on the page, to get the coordinates in reference to within this div only
        // this is to offset the navigation menu
        const gameDiv = event.target.getBoundingClientRect().y;

        setPlayerClick({...playerClick, x: event.pageX, y: event.clientY- gameDiv, display: 'inline'});

    }

    // call the data from backend
    async function getCharacterData() {
        const characterInfoDocument = doc(gameInfo, "character-info",
            `level-${location.state.level}`);
        const infoSnapshot = await getDoc(characterInfoDocument);

        if (infoSnapshot.exists()) {
            return infoSnapshot.data();
        } else {
            throw new Error('document not found');
        }
    }

    // call the backend to check what are the present characters for the particular level
    function initializeCharacterInfo(data) {
        const resultObjectArray = {};
        for (const [key,] of Object.entries(data)) {
            resultObjectArray[key] = true;
        }
        setCharacterInfo(resultObjectArray)
    }

    // check the selection of the player's click with the backend to see if the player has selected a character
    function checkSelection(data) {
        const playerTargetLeft = playerClick.x - targetWidth/2;
        const playerTargetTop = playerClick.y - targetWidth/2;


        // loop through nested object and check player selection
        for (const [key, object] of Object.entries(data)) {
            // only check against player selection if the character is tagged as existing on firestore
            if (object.exists === true) {
            }
        }

    }

    // initialize the characterInfo state for the first and only time
    useEffect( () => {
        getCharacterData().then( data => initializeCharacterInfo(data));
    }, [])

    useEffect(() => {
        getCharacterData().then(data => checkSelection(data));
    }, [playerClick])

    return (
        <div className={'game'}>
            <img className='game-image' src={location.state.imageUrl} alt={''} onClick={clickImage}></img>
            <div className="found-characters">

            </div>
            {playerClick && (<div className="target" style={
                {   width: `${targetWidth}px`,
                    height: `${targetHeight}px`,
                    left: playerClick.x - targetWidth/2,
                    top: playerClick.y - targetHeight/2,
                    display: playerClick.display}}></div>)}
        </div>

    )
}