import React from 'react';
import './HomeContent.css';

function HomeContent() {
    return (
        <div className="home-content">
            <h2>The best place to build, test, and discover front-end code.</h2>
            <p>
                CodingPlatform is a social development environment for front-end designers and developers.
                Build and deploy a website, show off your work, build test cases to learn and debug, and find inspiration.
            </p>
            <button className="sign-up-main">Sign Up for Free</button>
            <div className="code-snippets">
                <div className="code-snippet">
                    <h3>HTML</h3>
                    <p>&lt;div class="rect"&gt;&lt;/div&gt;</p>
                </div>
                <div className="code-snippet">
                    <h3>CSS</h3>
                    <p>.rect &#123; background: linear-gradient(…); &#125;</p>
                </div>
                <div className="code-snippet">
                    <h3>JavaScript</h3>
                    <p>var colors = ["#74B087", "#DE7300", "#74D087"];</p>
                </div>
            </div>
        </div>
    );
}

export default HomeContent;
