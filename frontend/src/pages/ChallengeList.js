import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ChallengeList() {
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const response = await axios.get('/api/challenges');
                setChallenges(response.data);
            } catch (error) {
                console.error("Failed to fetch challenges:", error);
            }
        };
        fetchChallenges();
    }, []);

    return (
        <div>
            <h2>Challenges</h2>
            <ul>
                {challenges.map((challenge) => (
                    <li key={challenge._id}>
                        <Link to={`/challenges/${challenge._id}`}>{challenge.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ChallengeList;
