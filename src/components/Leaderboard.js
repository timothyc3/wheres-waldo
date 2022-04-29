import './Leaderboard.css';
import React, { useState, useEffect } from "react";
import { getLeaderboardData } from "../firebase";

export default function Leaderboard() {

    const [data, setData] = useState(null);

    useEffect(() => {
        getLeaderboardData()
            .then((result) => {setData(result)});
    }, []);

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <div className='leaderboard-page'>
            <div className='levels-filter'>

            </div>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Time</th>
                </tr>
            </table>
        </div>

    )

}