import './Game.css';
import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import {getCharacterData, storage} from "../firebase";
import CharacterHud from '../components/CharacterHud.js'
import {getDownloadURL, ref} from "firebase/storage";

export default function Game() {
    const location = useLocation();

    // stores the coordinate of the players target
    const [playerClick, setPlayerClick] = useState({display: "none", x: 0, y: 0});
    // expected shape: [{name: waldo, url: some-url-to-backend}, {name: wilma, url: some-url-to-backend}],
    // characters not present should not be listed in this object.
    const [characterInfo, setCharacterInfo] = useState([]);

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

    // check the selection of the player's click with the backend to see if the player has selected a character
    function checkSelection(data) {

        // for each character we pass it through checkSelected to see if player selection overlaps
        // with character location. Returns an array containing two booleans that are both true
        // if the user has clicked on the character.
        function checkSelected(characterLocationObject) {

            const playerTargetLeftStart = playerClick.x - targetWidth/2;
            const playerTargetTopStart = playerClick.y - targetHeight/2;

            // check the selection on the Y axis
            function checkUp() {
                const playerTargetTopEnd = playerTargetTopStart + targetHeight;
                const characterTopEnd = characterLocationObject.top + characterLocationObject.height;

                return (playerTargetTopStart >= characterLocationObject.top &&
                    playerTargetTopStart <= characterTopEnd) ||
                    (playerTargetTopEnd >= characterLocationObject.top &&
                    playerTargetTopEnd <= characterTopEnd);
            }

            // check the selection on the X axis
            function checkSide() {
                const playerTargetLeftEnd = playerTargetLeftStart + targetWidth;
                const characterLeftEnd = characterLocationObject.left + characterLocationObject.width;

                return (playerTargetLeftStart >= characterLocationObject.left &&
                    playerTargetLeftStart <= characterLeftEnd) ||
                    (playerTargetLeftEnd >= characterLocationObject.left &&
                    playerTargetLeftEnd <= characterLeftEnd);
            }

            return [checkUp(), checkSide()]
        }

        // loop through nested object and check player selection
        for (const [key, object] of Object.entries(data)) {
            // if this Array.every returns true, it means for the character being checked, the user has passed all checks
            // to determine whether they clicked on the character
            if (checkSelected(object).every(test => test === true)) {
                const updatedCharacterInfo = characterInfo.map(character => character.name === key ?
                    {...character, found: true} : character);
                setCharacterInfo(updatedCharacterInfo);
            }
        }

    }

    // call the backend to check what are the present characters for the particular level
    async function initializeCharacterInfo(data) {
        const resultObjectArray = [];
        for (const [key,] of Object.entries(data)) {
            const iconUrl = await getDownloadURL(ref(storage, `${key}-icon.png`));
            resultObjectArray.push({name: key, url: iconUrl, found: false});
        }
        setCharacterInfo(resultObjectArray)
    }

    // initialize the characterInfo by calling the backend
    useEffect(() => {
        getCharacterData(location).then(data => initializeCharacterInfo(data));
    }, [])

    // whenever playerClick state is updated (player clicks on game), we check selection against the
    // location of the characters on the game.
    useEffect(() => {
        getCharacterData(location)
            .then(data => checkSelection(data));
    }, [playerClick]);

    return (
        <div className={'game'}>
            <img className='game-image' src={location.state.imageUrl} alt={''} onClick={clickImage}></img>
            <CharacterHud data={characterInfo}/>
            {playerClick && (<div className="target" style={
                {   width: `${targetWidth}px`,
                    height: `${targetHeight}px`,
                    left: playerClick.x - targetWidth/2,
                    top: playerClick.y - targetHeight/2,
                    display: playerClick.display}}></div>)}
        </div>
    )
}