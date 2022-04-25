import './App.css';
import Home from './components/Home.js';
import Game from './components/Game.js';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Navigation from "./components/Navigation";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/game" element={<Game />}/>
                </Routes>
            </BrowserRouter>
        </div>
    )

}

export default App;