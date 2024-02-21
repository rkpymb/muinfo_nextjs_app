import React, { useRef, useEffect } from 'react'

const VideoPlayer = ({ Filename }) => {
    const videoRef = useRef(null)

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.pause()
            videoRef.current.removeAttribute('src')
            videoRef.current.load()
        }
    })
    return (
        <video ref={videoRef} width='520' height='440' controls autoPlay>
            <source src={`http://localhost:3001/Openendpoint/FeedvideosStream/${Filename}`} type='video/mp4'></source>
            Your browser does not support the video tag.
        </video>
    )
}

export default VideoPlayer