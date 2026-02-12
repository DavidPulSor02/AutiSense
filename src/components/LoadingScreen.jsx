import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ isLoading }) => {
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        if (!isLoading) {
            // Wait for the transition to finish before unmounting (optional logic if we were unmounting)
            // But here we might just rely on CSS opacity hiding.
            const timer = setTimeout(() => setShouldRender(false), 800); // Match CSS transition
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (!shouldRender) return null;

    return (
        <div className={`loading-screen ${!isLoading ? 'hidden' : ''}`}>
            <div className="loading-content pulse-container">
                <div className="infinity-container">
                    <svg viewBox="0 0 200 100" className="w-full h-full">
                        <defs>
                            <linearGradient id="rainbowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#FF0000" />    {/* Red */}
                                <stop offset="20%" stopColor="#FF9900" />   {/* Orange */}
                                <stop offset="40%" stopColor="#FFFF00" />   {/* Yellow */}
                                <stop offset="60%" stopColor="#00FF00" />   {/* Green */}
                                <stop offset="80%" stopColor="#0000FF" />   {/* Blue */}
                                <stop offset="100%" stopColor="#800080" />  {/* Purple */}
                            </linearGradient>
                        </defs>
                        <path
                            className="infinity-path"
                            d="M50,50 C20,50 20,20 50,20 C80,20 80,50 100,50 C120,50 120,20 150,20 C180,20 180,50 150,50 C120,50 120,80 100,80 C80,80 80,50 50,50 Z" /* Approximation of infinity loop path */
                            stroke="url(#rainbowGradient)"
                        />
                    </svg>
                </div>
                <h1 className="loading-text">AutiSense</h1>
                <p className="loading-subtext">Detección temprana, futuro sin límites.</p>
            </div>
        </div>
    );
};

export default LoadingScreen;
