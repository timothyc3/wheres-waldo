import './Game.css';
import React, {useState, useEffect, useRef} from "react";
import { useLocation } from "react-router-dom";
import './Game.css';
import {gameInfo, storage} from "../firebase";
import { doc, getDoc } from "firebase/firestore";
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
    async function initializeCharacterInfo(data) {
        const resultObjectArray = [];
        for (const [key,] of Object.entries(data)) {
            const iconUrl = await getDownloadURL(ref(storage, `${key}-icon.png`));
            resultObjectArray.push({name: key, url: iconUrl});
        }
        setCharacterInfo(resultObjectArray)
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
            if (checkSelected(object).every(test => test === true)) {console.log(`${key} found`)}
        }

    }

    // initialize the characterInfo state for the first and only time
    useEffect( () => {
        getCharacterData()
            .then( data => initializeCharacterInfo(data));
    }, [])

    // this useEffect is only called when characterInfo state is updated, not on mount.
    const isInitialMount = useRef(true);
    const characterHud = useRef(null);

    useEffect(() => {
        if (isInitialMount.current === true) {
            isInitialMount.current = false;
        }
        else if (isInitialMount.current === false) {
            characterHud.current = characterInfo.map(character =>
                <img key={character.name} src={character.url} alt=""/>
            );
        }

    }, [characterInfo])

    // whenever playerClick state is updated (player clicks on game), we check selection against the
    // location of the characters on the game.
    useEffect(() => {
        getCharacterData()
            .then(data => checkSelection(data));
    }, [playerClick]);

    return (
        <div className={'game'}>
            <img className='game-image' src={location.state.imageUrl} alt={''} onClick={clickImage}></img>
            <div className="found-characters">
                {characterHud.current}
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