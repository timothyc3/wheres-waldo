import React, { useState, useEffect, useRef } from "react";
import './CharacterHud.css';
import {getDownloadURL, ref} from "firebase/storage";
import {storage, getCharacterData} from "../firebase";

export default function CharacterHud(props) {

    // expected shape: [{name: waldo, url: some-url-to-backend}, {name: wilma, url: some-url-to-backend}],
    // characters not present should not be listed in this object.
    const [characterInfo, setCharacterInfo] = useState([]);

    // call the backend to check what are the present characters for the particular level
    async function initializeCharacterInfo(data) {
        const resultObjectArray = [];
        for (const [key,] of Object.entries(data)) {
            const iconUrl = await getDownloadURL(ref(storage, `${key}-icon.png`));
            resultObjectArray.push({name: key, url: iconUrl});
        }
        setCharacterInfo(resultObjectArray)
    }

    // this useEffect is only called when characterInfo state is updated, not on mount.
    const isInitialMount = useRef(true);
    const characterHud = useRef(null);

    // initialize the characterInfo by calling the backend
    useEffect(() => {
        getCharacterData(props.location).then(data => initializeCharacterInfo(data));
    }, [])

    // when characterInfo state is updated, we initialize the HUD
    useEffect(() => {
        if (isInitialMount.current === true) {
            isInitialMount.current = false;
        }
        else if (isInitialMount.current === false) {
            characterHud.current = characterInfo.map(character =>
                <img key={character.name} src={character.url} alt=""/>
            );
        }

        console.log(characterHud.current)

    }, [characterInfo])


 return (
     <div className='found-characters'>
         {characterHud.current}
     </div>
 )
}