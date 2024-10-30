import React, { useState, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ChallengePage() {
    const { challengeId } = useParams();
    const [challenge, setChallenge] = useState(null);
    const [code, setCode] = useState('// Start coding here');
    const [result, setResult] = useState(null);

    // Fetch the challenge details
    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const response = await axios.get(`/api/challenges/${challengeId}`);
                setChallenge(response.data);
            } catch (error) {
                console.error("Failed to fetch challenge:", error);
            }
        };
        fetchChallenge();
    }, [challengeId]);

    // Handle code submission
    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token'); // Assuming the token is stored here
            const response = await axios.post('/api/challenges/submit', {
                challengeId,
                code
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setResult(response.data.message);
        } catch (error) {
            console.error("Submission failed:", error);
            setResult("Error submitting code.");
        }
    };

    return (
        <div>
            {challenge && (
                <>
                    <h1>{challenge.title}</h1>
                    <p>{challenge.description}</p>
                    <h4>Difficulty: {challenge.difficulty}</h4>
                    <MonacoEditor
                        language="javascript"
                        theme="vs-dark"
                        value={code}
                        onChange={(newCode) => setCode(newCode)}
                        options={{ automaticLayout: true }}
                    />
                    <button onClick={handleSubmit}>Submit Code</button>
                    <div>{result && `Result: ${result}`}</div>
                </>
            )}
        </div>
    );
}

export default ChallengePage;
