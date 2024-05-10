import { useState, useEffect, useRef } from 'react';
import { MediaFilesUrl, MediaFilesFolder, FeedimgFolder, FeedVideosBaseUrl } from '/Data/config';
import Mstyles from '/styles/mainstyle.module.css';

import { FiPlay, FiPause, FiVolume1, FiVolumeX, FiMaximize } from "react-icons/fi";
import IconButton from '@mui/material/IconButton';

function VideoPlayer({ item }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [PlayerOverlay, setPlayerOverlay] = useState(false);
  const [progress, setProgress] = useState(0);
  const [VideoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    setVideoUrl(item.postData)
   
    const video = videoRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsPlaying(true);
          } else {
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);

    return () => {
      observer.unobserve(video);
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

 

  const togglePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const toggleSound = () => {
    setIsMute((prevIsMute) => !prevIsMute);
    videoRef.current.muted = !videoRef.current.muted;
  };

  const handleMouseOver = () => {
    setPlayerOverlay(true);
  };

  const handleMouseOut = () => {
    setPlayerOverlay(false);
  };

  const Handlefullscreen = () => {
    const video = videoRef.current;
  
    if (document.fullscreenElement) {
      document.exitFullscreen();
      video.classList.remove('videoFullScreen');
    } else {
      video.requestFullscreen().catch((error) => {
        console.error('Error attempting to enable fullscreen:', error);
      });
      video.classList.add('videoFullScreen');
    }
  };
 


  return (
    <>
      <div
        className={Mstyles.FVPlayerOverlayContainer}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}

      >
        <div className={Mstyles.FeedVideo} >

          <video 
          controlsList={'nodownload'}
            ref={videoRef}
            src={`${FeedVideosBaseUrl}${VideoUrl}`}
            
            type={'video/mp4'}
            loop
            className={Mstyles.FeedVideoPlayer}
            onClick={togglePlayPause}
          />

        </div>
        {PlayerOverlay && (
          <div className={Mstyles.FVPlayerOverlay}>
            <div>
              <IconButton style={{ color: 'white' }}>
                {isPlaying ? (
                  <FiPause size={30} onClick={togglePlayPause} />
                ) : (
                  <FiPlay size={30} onClick={togglePlayPause} />
                )}
              </IconButton>
            </div>
            <div>
              <IconButton
               
                style={{ color: 'white' }}
              >
                {isMute ? (
                  <FiVolumeX size={30} onClick={toggleSound} />
                ) : (
                  <FiVolume1 size={30} onClick={toggleSound} />
                )}
              </IconButton>
            </div>
            <div>
              <IconButton
               
                style={{ color: 'white' }}
              >
               <FiMaximize size={30} onClick={Handlefullscreen} />
              </IconButton>
            </div>


          </div>
        )}

      </div>

    </>
  );
}

export default VideoPlayer;
