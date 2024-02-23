import React, { useState, useEffect, useContext } from 'react';
import CheckloginContext from '/context/auth/CheckloginContext'
import { useRouter } from 'next/router'
import Avatar from '@mui/material/Avatar';
import { FiArrowRightCircle, FiMoreVertical, FiMessageCircle, FiHeart, FiShare2 } from "react-icons/fi";
import Mstyles from '/Styles/mainstyle.module.css';
import { MediaFilesUrl, MediaFilesFolder, DomainURL } from '/Data/config'
import { FaRegHeart, FaHeart } from "react-icons/fa";
import PostCmt from './PostCmt'
import Sharebtn from '../ShareBox/Sharebtn'

const FeedFooterbox = ({ PostData }) => {
    const router = useRouter();
    const Contextdata = useContext(CheckloginContext);
    const [Liked, setLiked] = useState(false);
    const [ShowData, setShowData] = useState(false);
    const [animate, setAnimate] = useState(false);

    const [DarkMode, setDarkMode] = useState(false); 
    const [AllLikes, setAllLikes] = useState(0);

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

    useEffect(() => {

        MyLikeData()
        setShowData(true)

    }, [router.query,]);

    const MyLikeData = async () => {
        const sendUM = {
            JwtToken: Contextdata.VendorJwtToken,
            PostData: PostData.PostData
        }
        const data = await fetch("/api/Vendor/MyLikeData", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                console.log(parsed.ReqD.AllLikes)
                setAllLikes(parsed.ReqD.AllLikes)
                if (parsed.ReqD.MyLikeData) {
                    if (parsed.ReqD.MyLikeData.length > 0) {
                        setLiked(true)
                    } else {
                        setLiked(false)
                    }
                }

                AnimateData()

            })
    }
    const AnimateData = async () => {
        if (animate == true) {
            setAnimate(false)
        } else {
            setAnimate(true)
        }
    }


    const LikePost = async () => {
        const sendUM = {
            JwtToken: Contextdata.VendorJwtToken,
            PostData: PostData.PostData
        }
        const data = await fetch("/api/Vendor/LikePost", {
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
                    Contextdata.ChangeAlertData('Post Liked 😍', 'success')
                    MyLikeData()
                }
                if (parsed.ReqD.UnLiked) {
                    Contextdata.ChangeAlertData('Post Unliked 😌', 'warning')
                    MyLikeData()
                }
                AnimateData()

            })
    }


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

                <div className={Mstyles.FeedItemBottom}>
                    <div className={Mstyles.FeedBtnitem} onClick={() => LikePost()}>

                        <div className={Mstyles.FeedBtnitemA}>

                            {Liked ? <FaHeart size={20} style={{ color: 'red' }} /> : <FaRegHeart size={20} />}
                        </div>
                        <div className={Mstyles.FeedBtnitemB}>

                            <div className={`${animate ? Mstyles.AnimateData : Mstyles.AnimateDataTwo}`}>
                                {AllLikes}
                            </div>
                        </div>
                    </div>
                    <PostCmt PostData={PostData.PostData} />

                    <Sharebtn ContentUrl={`${DomainURL}p/${PostData.PostData.PostID}`} />

                </div>
            }
        </div>
    );
};

export default FeedFooterbox;
