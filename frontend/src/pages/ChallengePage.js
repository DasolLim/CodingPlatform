import React, { useState, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ChallengePage() {
    const { challengeId } = useParams();
    const [challenge, setChallenge] = useState(null);
    const [result, setResult] = useState(null);
    const [code, setCode] = useState('// Write your code here');
    const [output, setOutput] = useState(null);
    const [error, setError] = useState(null);

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

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/challenges/submit', {
                challengeId,
                code
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setResult(response.data.status);
        } catch (error) {
            console.error("Submission failed:", error);
            setResult("Error submitting code.");
        }
    };

    const handleExecuteCode = async () => {
        try {
            const response = await axios.post('/api/challenges/execute', { code });
            setOutput(response.data.output);
            setError(null);
        } catch (err) {
            setError(err.response ? err.response.data.error : "Error executing code");
            setOutput(null);
        }
    };

    return (
        <div>
            <h1>{challenge.title}</h1>
            <MonacoEditor
                language="javascript"
                theme="vs-dark"
                value={code}
                onChange={(newCode) => setCode(newCode)}
            />
            <button onClick={handleExecuteCode}>Run Code</button>

            <div>{result && `Result: ${result}`}</div>

            <div>
                <h3>Output:</h3>
                {output && <pre>{output}</pre>}
                {error && <pre style={{ color: "red" }}>{error}</pre>}
            </div>
        </div>
    );

}

export default ChallengePage;
