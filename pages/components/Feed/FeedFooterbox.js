import React, { useState, useEffect, useContext } from 'react';
import CheckloginContext from '/context/auth/CheckloginContext'
import { useRouter } from 'next/router'
import Avatar from '@mui/material/Avatar';
import { FiArrowRightCircle, FiMoreVertical, FiMessageCircle, FiHeart, FiShare2 } from "react-icons/fi";
import Mstyles from '/Styles/mainstyle.module.css';
import { MediaFilesUrl, MediaFilesFolder,DomainURL } from '/Data/config'
import { FaRegHeart, FaHeart } from "react-icons/fa";
import IconButton from '@mui/material/IconButton';
import FeedCmt from '../Rfq/RfqCmt'
const FeedFooterbox = ({ PostData }) => {
    const router = useRouter();
    const Contextdata = useContext(CheckloginContext);
    const [Liked, setLiked] = useState(false);
    const [LikedList, setLikedList] = useState([]);
  
    const [Alllikes, setAlllikes] = useState('0');
    const [Mymobile, setMymobile] = useState(null); // Initialize with null
    const [DarkMode, setDarkMode] = useState(false); // Initialize with null

    const [MD, setMD] = useState([]);

    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    useEffect(() => {
        // Assuming UserData is an array with a single element
setMD(PostData)
        setAlllikes(PostData.LikeList.length);
        setLikedList(PostData.LikeList);
        if (PostData.LikeList.length > 0) {
            const LikeDta = PostData.LikeList;
            if (LikeDta[0].UserData[0].mobile == Contextdata.UserData.mobile) {
                setLiked(true)
            }

        }


    }, [router.query, Mymobile]);


    useEffect(() => {
        const storedTheme = window.localStorage.getItem('appTheme');
        if (storedTheme) {
            if (storedTheme === 'DarkMain') {
                setDarkMode(true);
               
            } else {
               
                setDarkMode(false);
            }
        }
    }, []);


    const LikePost = async () => {
        setLiked(true)
        setAlllikes(Alllikes + 1)
        const sendUM = {
            JwtToken: Contextdata.UserJwtToken,
            PostData: PostData.PostData
        }
        const data = await fetch("/api/User/LikePost", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                if (parsed.ReqD.Liked) {
                    setLiked(true)
                }

            })
    }


    const handleShareClick = async () => {
        try {
          await navigator.share({
            title: 'Share Post',
            text: 'Check out this awesome content!',
            url: `${DomainURL}post/${MD.PostData.PostID}`,
          });
        } catch (error) {
          console.error('Error sharing:', error);
        }
      };

    return (
        <div className={Mstyles.FeedItemBottom}>
            <div className={Mstyles.FeedBtnitem} onClick={() => LikePost()}>
                <div className={Mstyles.FeedBtnitemA}>
                    {Liked ?   <IconButton><FaHeart size={20} style={{ color: 'red' }} /></IconButton> : <IconButton><FaRegHeart size={20} /></IconButton>}
                </div>
                <div className={Mstyles.FeedBtnitemB}>
                    {Alllikes}
                </div>


            </div>
            <FeedCmt PostData={MD.PostData} />

            <div className={Mstyles.FeedBtnitem} onClick={handleShareClick}>
                <div className={Mstyles.FeedBtnitemA}>
                    <FiShare2 size={20} />
                </div>
                <div className={Mstyles.FeedBtnitemB}>
                    Share
                </div>
            </div>
        </div>
    );
};

export default FeedFooterbox;
