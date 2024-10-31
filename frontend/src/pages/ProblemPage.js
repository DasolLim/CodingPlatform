// src/pages/ProblemPage.js
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MonacoEditor from 'react-monaco-editor';
import './ProblemPage.css';

// Import the profile icon
import profileIcon from '../image/profile_icon.png';

function ProblemPage() {
    const defaultCode = `class RecentCounter(object):\n\n    def __init__(self):\n        pass\n\n    def ping(self, t):\n        """\n        :type t: int\n        :rtype: int\n        """\n        # Your code here\n\n# Example usage:\n# obj = RecentCounter()\n# param_1 = obj.ping(t)\n`;

    const [code, setCode] = useState(defaultCode);
    const [testResults, setTestResults] = useState([]);
    const [activeTab, setActiveTab] = useState('description');
    const [view, setView] = useState('Testcase'); // Toggle between Testcase and Test Result
    const [selectedCase, setSelectedCase] = useState(0); // Track selected test case
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    // Define handleSubmit to avoid the error
    const handleSubmit = () => {
        alert("Code submitted!");
        // Add your submission logic here if needed
    };

    const profileMenuRef = useRef(null);

    const handleProfileClick = () => {
        setShowProfileMenu((prevState) => !prevState); // Toggle menu visibility
    };

    // Close profile menu if clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [profileMenuRef]);

    // Sample problem data (you can replace it with dynamic data from your backend)
    const problem = {
        title: "Reverse Words in a String",
        description: "Given an input string s, reverse the order of the words...",
        difficulty: "Easy",
        examples: [
            { input: '["RecentCounter", "ping", "ping", "ping", "ping"]', output: '[null, 1, 2, 3, 3]', explanation: "Example 1" },
            { input: '["RecentCounter", "ping", "ping"]', output: '[null, 1, 2]', explanation: "Example 2" },
            { input: '["RecentCounter", "ping", "ping", "ping"]', output: '[null, 1, 2, 3]', explanation: "Example 3" },
        ],
    };

    const handleRun = () => {
        // Simulated test execution; replace with real code execution logic
        const simulatedResults = problem.examples.map((example, index) => {
            const isCorrect = Math.random() > 0.5; // Randomly mark as correct or incorrect
            return {
                input: example.input,
                expectedOutput: example.output,
                actualOutput: isCorrect ? example.output : '[error message]', // Example actual output
                status: isCorrect ? 'Correct' : 'Incorrect'
            };
        });
        setTestResults(simulatedResults);
    };

    const handleReset = () => {
        setCode(defaultCode);
        setTestResults([]); // Clear test results on reset
    };

    return (
        <div className="problem-page">
            {/* Navbar */}
            <nav className="navbar">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/problems" className="nav-link">More Problems</Link>
                <button className="run-button" onClick={handleRun}>Run</button>
                <button className="submit-button" onClick={handleSubmit}>Submit</button>

                {/* Profile Icon and Name Wrapper */}
                <div className="profile-wrapper" onClick={handleProfileClick}>
                    <img src={profileIcon} alt="User Icon" className="profile-icon" />
                    <span className="profile-name">Dasol_Lim</span>
                </div>

                {/* Profile Dropdown Menu */}
                {showProfileMenu && (
                    <div className="profile-menu" ref={profileMenuRef}>
                        <div className="profile-header">
                            <img src={profileIcon} alt="User Icon" className="profile-image" />
                            <div className="profile-name">Dasol_Lim</div>
                            <p className="profile-subscription">Access all features with our Premium subscription!</p>
                        </div>
                        <div className="profile-options">
                            <Link to="/my-lists" className="profile-link">My Lists</Link>
                            <Link to="/notebook" className="profile-link">Notebook</Link>
                            <Link to="/submissions" className="profile-link">Submissions</Link>
                            <Link to="/progress" className="profile-link">Progress</Link>
                            <Link to="/points" className="profile-link">Points</Link>
                        </div>
                        <hr />
                        <div className="profile-actions">
                            <Link to="/settings" className="profile-link">Settings</Link>
                            <Link to="/appearance" className="profile-link">Appearance</Link>
                            <button className="profile-link" onClick={() => alert("Logged out")}>Sign Out</button>
                        </div>
                    </div>
                )}
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

                {/* Code Editor Section with Navbar */}
                <div className="code-editor">
                    <div className="code-navbar">
                        <span className="language-selector">
                            <label>Language:</label>
                            <select value={'Python'} onChange={() => { }}>
                                <option value="Python">Python</option>
                            </select>
                        </span>
                        <button className="reset-button" onClick={handleReset}>Reset</button>
                    </div>
                    <MonacoEditor
                        language="python"
                        theme="vs-dark"
                        value={code}
                        onChange={(newCode) => setCode(newCode)}
                    />
                </div>

                {/* Testcase and Test Result Section */}
                <div className="test-section">
                    <div className="test-tabs">
                        <button
                            className={`test-tab ${view === 'Testcase' ? 'active' : ''}`}
                            onClick={() => setView('Testcase')}
                        >
                            Testcase
                        </button>
                        <button
                            className={`test-tab ${view === 'Test Result' ? 'active' : ''}`}
                            onClick={() => setView('Test Result')}
                        >
                            Test Result
                        </button>
                    </div>

                    {view === 'Testcase' && (
                        <div className="test-cases">
                            <div className="case-tabs">
                                {problem.examples.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`case-tab ${selectedCase === index ? 'active' : ''}`}
                                        onClick={() => setSelectedCase(index)}
                                    >
                                        Case {index + 1}
                                    </button>
                                ))}
                            </div>
                            <div className="case-content">
                                <p><strong>Input:</strong> {problem.examples[selectedCase].input}</p>
                                <p><strong>Expected Output:</strong> {problem.examples[selectedCase].output}</p>
                            </div>
                        </div>
                    )}

                    {view === 'Test Result' && (
                        <div className="test-results">
                            {testResults.length > 0 ? (
                                testResults.map((result, index) => (
                                    <div key={index} className={`test-result-item ${result.status.toLowerCase()}`}>
                                        <p><strong>Input:</strong> {result.input}</p>
                                        <p><strong>Expected Output:</strong> {result.expectedOutput}</p>
                                        <p><strong>Actual Output:</strong> {result.actualOutput}</p>
                                        <p><strong>Status:</strong> {result.status}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="no-result">Click "Run" to execute test cases.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProblemPage;
