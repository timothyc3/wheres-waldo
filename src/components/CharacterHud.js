import React, { useState, useEffect, useRef } from "react";
import './CharacterHud.css';
import {getDownloadURL, ref} from "firebase/storage";
import {storage, getCharacterData} from "../firebase";

export default function CharacterHud(props) {


    // when characterInfo state is updated, we initialize the HUD
    const div = props.data.map(character =>
        <img key={character.name} src={character.url} alt=""
            style={{filter: props.data.every(item => item.found === true) ? 'grayscale(90%)' : 'none'}}
        />
    );

    return (
        <div className='found-characters'>
            {div}
        </div>
        )
    }