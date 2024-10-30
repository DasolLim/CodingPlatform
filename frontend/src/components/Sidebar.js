import React from 'react';
import './Sidebar.css';

function Sidebar() {
    return (
        <div className="sidebar">
            <button className="start-button">Start Coding</button>
            <nav>
                <ul>
                    <li>Search Pens</li>
                    <li>Challenges</li>
                    <li>Spark</li>
                </ul>
            </nav>
            <div className="pro-badge">CodePen PRO</div>
        </div>
    );
}

export default Sidebar;
