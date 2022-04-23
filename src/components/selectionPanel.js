import React, {useState, useEffect} from "react";
import {getDownloadURL, ref} from "firebase/storage";
import {storage} from '../firebase';
import './selectionPanel.css'

export default function SelectionPanel() {

    const [imageState, setImageState] = useState([
            {urlName: 'waldo-1.jpg', loading: false, result: null},
            {urlName: 'waldo-2.jpg', loading: false, result: null},
            {urlName: 'waldo-3.png', loading: false, result: null},
            {urlName: 'waldo-4.jpg', loading: false, result: null},
            {urlName: 'waldo-5.jpg', loading: false, result: null},
            {urlName: 'waldo-6.jpg', loading: false, result: null},
        ]
    );

    async function getImages() {

        let imageStateCopy = imageState;

        setImageState(imageStateCopy.map(item => Object.assign(item, {loading: true})));

        for (let imageObject of imageStateCopy) {
            const url = await getDownloadURL(ref(storage, imageObject.urlName));

            imageStateCopy = imageStateCopy.map(item => item.urlName === imageObject.urlName ?
                {...item, result: url} : item);
        }

        setImageState(imageStateCopy.map(item => Object.assign(item, {loading: false})));
        setImageState(imageStateCopy);
    }

    useEffect(() => {
        getImages().catch(console.error)
        }, []);

    const selectionList = imageState.map((item, index) =>
        <div key={item.urlName} className={'selection'}>
        {(item.loading === true && item.result === null) ?
            <ion-icon name="reload-outline"></ion-icon> :
            <img src={item.result} alt=""/>
        }
        <h3>level {index + 1}</h3>
        </div>);


    return (
        <div className={'selection-panel'}>
            <h1>Choose your map</h1>
            {selectionList}
        </div>
    )
}