import './App.css';
import Home from './components/Home.js';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Navigation from "./components/Navigation";

function App() {
    return (
        <div className="app">
            <Navigation />
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/game" />
                </Routes>
            </BrowserRouter>
        </div>
    )

}

export default App;