import React, { useState, useEffect } from 'react';
import Mstyles from '/Styles/mainstyle.module.css';
const RatingStars = ({ StarData }) => {
    const [Stars, setStars] = useState(null);

    useEffect(() => {
        if (StarData && StarData.Stars !== undefined) {
            setStars(StarData.Stars);
        }
    }, [StarData]);

    return (
        <div>
            {Stars !== null ? (
                <div className={Mstyles.StartBox}>
                    {Array.from({ length: Stars }, (_, index) => (
                        <span key={index}>⭐</span>
                    ))}
                    <small>{Stars}</small>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default RatingStars;
