import React from "react";
import './CharacterHud.css';

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