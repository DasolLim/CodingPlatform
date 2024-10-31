// src/pages/ProblemPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MonacoEditor from 'react-monaco-editor';
import './ProblemPage.css';

function ProblemPage() {
    const [code, setCode] = useState('// Write your solution here');
    const [testResults, setTestResults] = useState([]);
    const [activeTab, setActiveTab] = useState('description'); // Track active tab

    // Sample problem data (you can replace it with dynamic data from your backend)
    const problem = {
        title: "Reverse Words in a String",
        description: "Given an input string s, reverse the order of the words...",
        difficulty: "Easy",
        examples: [
            { input: 's = "the sky is blue"', output: '"blue is sky the"' },
            { input: 's = "  hello world  "', output: '"world hello"' },
            { input: 's = "a good   example"', output: '"example good a"' }
        ],
        solution: "This is where the solution to the problem would be displayed.",
        constraints: [
            "1 <= s.length <= 10^4",
            "s contains printable ASCII characters."
        ]
    };

    const handleRun = () => {
        // Mock function to simulate code execution with test cases
        const results = [
            { input: 'the sky is blue', expected: 'blue is sky the', output: 'blue is sky the', status: 'Pass' },
            { input: '  hello world  ', expected: 'world hello', output: 'world hello', status: 'Pass' },
            { input: 'a good   example', expected: 'example good a', output: 'example good a', status: 'Pass' },
        ];
        setTestResults(results);
    };

    const handleSubmit = () => {
        // Submit logic, could update completion status in backend
        alert('Code submitted!');
    };

    return (
        <div className="problem-page">
            {/* Navbar */}
            <nav className="navbar">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/problems" className="nav-link">More Problems</Link>
                <button className="run-button" onClick={handleRun}>Run</button>
                <button className="submit-button" onClick={handleSubmit}>Submit</button>
                <Link to="/profile" className="nav-link">Profile</Link>
            </nav>

            {/* Main Content */}
            <div className="content">
                {/* Problem Description and Solution Tabs */}
                <div className="description">
                    <div className="tabs">
                        <button
                            className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
                            onClick={() => setActiveTab('description')}
                        >
                            Description
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'solution' ? 'active' : ''}`}
                            onClick={() => setActiveTab('solution')}
                        >
                            Solution
                        </button>
                    </div>
                    <div className="difficulty">
                        <span className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}>
                            {problem.difficulty}
                        </span>
                    </div>
                    <div className="tab-content">
                        {activeTab === 'description' && (
                            <div className="problem-description">
                                <h2>{problem.title}</h2>
                                <p>{problem.description}</p>
                                <h4>Examples</h4>
                                {problem.examples.map((example, index) => (
                                    <div key={index} className="example">
                                        <p><strong>Input:</strong> {example.input}</p>
                                        <p><strong>Output:</strong> {example.output}</p>
                                    </div>
                                ))}
                                <h4>Constraints</h4>
                                <ul>
                                    {problem.constraints.map((constraint, index) => (
                                        <li key={index}>{constraint}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {activeTab === 'solution' && (
                            <div className="solution">
                                <h2>Solution</h2>
                                <p>{problem.solution}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Code Editor Section */}
                <div className="code-editor">
                    <MonacoEditor
                        language="python"
                        theme="vs-dark"
                        value={code}
                        onChange={(newCode) => setCode(newCode)}
                    />
                </div>

                {/* Test Case Result Section */}
                <div className="test-cases">
                    <h4>Test Results</h4>
                    <div className="test-case-results">
                        {testResults.map((result, index) => (
                            <div key={index} className={`test-case ${result.status}`}>
                                <p><strong>Input:</strong> {result.input}</p>
                                <p><strong>Expected Output:</strong> {result.expected}</p>
                                <p><strong>Your Output:</strong> {result.output}</p>
                                <p><strong>Status:</strong> {result.status}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProblemPage;
