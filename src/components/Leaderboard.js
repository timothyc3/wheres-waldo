import './Leaderboard.css';
import React, { useState, useEffect, useRef } from "react";
import { getLeaderboardData } from "../firebase";

export default function Leaderboard() {

    // data is used to store data that is called from the backend from useEffect.
    const [data, setData] = useState([]);

    // stores the current level being filtered by the user, defaults to the first level
    const [levelFilter, setLevelFilter] = useState(1);

    useEffect(() => {
        getLeaderboardData()
            .then((result) => {setData(result)});
    }, []);

    // generate the rows to display on the jsx.
    const tableRows = data.filter(entry => entry.level === levelFilter).map(
        filteredEntry => <tr>
            <td>{filteredEntry.name}</td>
            <td>{filteredEntry.time}</td>
        </tr>
    )

    function handleFilterClick(event) {
        setLevelFilter(parseInt(event.target.textContent));
    }

    return (
        <div className='leaderboard-page'>
            <ul className='levels-filter'>
                <li onClick={(event) => {handleFilterClick(event)}}>1</li>
                <li onClick={(event) => {handleFilterClick(event)}}>2</li>
                <li onClick={(event) => {handleFilterClick(event)}}>3</li>
                <li onClick={(event) => {handleFilterClick(event)}}>4</li>
            </ul>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>

            </table>
        </div>

    )

}