import React, { useState, useEffect, useContext } from 'react';
import CheckloginContext from '/context/auth/CheckloginContext'
import { useRouter } from 'next/router'
import Avatar from '@mui/material/Avatar';
import { FiArrowRightCircle, FiMoreVertical, FiMessageCircle, FiHeart, FiShare2 } from "react-icons/fi";
import Mstyles from '/Styles/mainstyle.module.css';
import { MediaFilesUrl, MediaFilesFolder,DomainURL } from '/Data/config'
import { FaRegHeart, FaHeart } from "react-icons/fa";
import RfqCmt from './RfqCmt'
const FeedFooterbox = ({ PostData }) => {
    const router = useRouter();
    const Contextdata = useContext(CheckloginContext);
    const [Liked, setLiked] = useState(false);
    const [LikedList, setLikedList] = useState([]);
    const [Alllikes, setAlllikes] = useState('0');
    const [Mymobile, setMymobile] = useState(null); // Initialize with null
    const [ShowData, setShowData] = useState(false)

    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';


    useEffect(() => {
      setShowData(true)

  }, [Contextdata.LocationData]);

    const handleShareClick = async () => {
        try {
          await navigator.share({
            title: 'Share Post',
            text: 'Check out this awesome content!',
            url: `${DomainURL}post/${PostData.PostData.PostID}`,
          });
        } catch (error) {
          console.error('Error sharing:', error);
        }
      };

    return (
        <div>
           {ShowData &&  
           
           <div className={Mstyles.RfqItemBottom}>
            <RfqCmt PostData={PostData.PostData} />
            <div style={{width:'20px'}}></div>

            <div className={Mstyles.EfqBtnitem} onClick={handleShareClick}>
                <div className={Mstyles.FeedBtnitemA}>
                    <FiShare2 size={20} />
                </div>
                <div className={Mstyles.FeedBtnitemB}>
                    Share
                </div>
            </div>
        </div>
           }
        </div>
    );
};

export default FeedFooterbox;
