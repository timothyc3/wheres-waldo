/// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {doc, getDoc, getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCe5RFoOne7gn-TEFlDb6q40PuBRc8vKvs",
    authDomain: "wheres-waldo-e8e98.firebaseapp.com",
    projectId: "wheres-waldo-e8e98",
    storageBucket: "wheres-waldo-e8e98.appspot.com",
    messagingSenderId: "741332337880",
    appId: "1:741332337880:web:af49e5cc8df4fcbe2403ad",
    measurementId: "G-JM05KH0DXR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const gameInfo = getFirestore(app);
const storage = getStorage(app);

// call the data from backend
async function getCharacterData(location) {
    const characterInfoDocument = doc(gameInfo, "character-info",
        `level-${location.state.level}`);
    const infoSnapshot = await getDoc(characterInfoDocument);

    if (infoSnapshot.exists()) {
        return infoSnapshot.data();
    } else {
        throw new Error('document not found');
    }
}

export {app, gameInfo, storage, getCharacterData}