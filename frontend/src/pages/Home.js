import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import HomeContent from '../components/HomeContent';
import './Home.css';

function Home() {
    return (
        <div className="home-page">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <HomeContent />
            </div>
        </div>
    );
}

export default Home;