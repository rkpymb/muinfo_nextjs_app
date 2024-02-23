// src/components/Video.js
import React, { useEffect, useState } from 'react';
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config';
import Skeleton from '@mui/material/Skeleton';
import Mstyles from '/Styles/mainstyle.module.css';


const Video = () => {
    const videoUrlData = [
        { url: '1.mp4' },

        { url: '2.mp4' },
        { url: '3.mp4' },

    ];



    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideoUrls = () => {
            setLoading(false);
        };

        fetchVideoUrls();

        const intervalId = setInterval(() => {
            setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoUrlData.length);
        }, 10000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        if (!loading) {
            setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoUrlData.length);
        }
    }, [loading]);

    return (
        <div>
            <div className={Mstyles.Loginvideo}>
                {loading ? (
                    <div>
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="rectangular" width={210} height={60} />
                    </div>
                ) : (
                    <div>
                        <video muted autoPlay key={videoUrlData[currentVideoIndex].url}>

                            <source src={`http://localhost:3005/Openendpoint/VideoStream/${videoUrlData[currentVideoIndex].url}`} type='video/mp4'></source>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Video;
