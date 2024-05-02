import React, { useState, useEffect, useContext } from 'react';
import CheckloginContext from '/context/auth/CheckloginContext'
import { useRouter } from 'next/router'

import Mstyles from '/Styles/mainstyle.module.css';
import { MediaFilesUrl, MediaFilesFolder, DomainURL } from '/Data/config'
import IconButton from '@mui/material/IconButton';
import PostCmt from './PostCmt'
import Sharebtn from '../ShareBox/Sharebtn'
import Badge from '@mui/material/Badge';

import {

    styled
} from '@mui/material';

import { BsHandThumbsUp, BsFillHandThumbsUpFill, BsStarFill, BsStar } from "react-icons/bs";

const FeedFooterbox = ({ PostData }) => {
    const router = useRouter();
    const Contextdata = useContext(CheckloginContext);
    const [Liked, setLiked] = useState(false);
    const [ShowData, setShowData] = useState(false);
    const [animate, setAnimate] = useState(false);


    const [AllLikes, setAllLikes] = useState(0);
    const [FavPost, setFavPost] = useState(false);



    useEffect(() => {
        setAllLikes(PostData.PostLikes)

        if (Contextdata.UserLogin) {
            MyLikeData()
        }

        setShowData(true)

    }, [router.query,]);

    const MyLikeData = async () => {


        AnimateData()
        const sendUM = {

            PostData: PostData.PostData
        }
        const data = await fetch("/api/user/like_data", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {

                if (parsed.ReqData && parsed.ReqData.MyLikeData) {
                    setAllLikes(parsed.ReqData.AllLikes)

                    if (parsed.ReqData.MyLikeData.length > 0) {
                        setLiked(true)
                    } else {
                        setLiked(false)
                    }
                    if (parsed.ReqData.FavPost > 0) {
                        setFavPost(true)
                    } else {
                        setFavPost(false)
                    }
                }


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

        if (Contextdata.UserLogin) {
            const sendUM = {

                PostData: PostData.PostData
            }
            const data = await fetch("/api/user/like_post", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    if (parsed.ReqData.Liked) {
                        Contextdata.ChangeAlertData('Post Liked 😍', 'success')
                        MyLikeData()
                    }
                    if (parsed.ReqData.UnLiked) {
                        Contextdata.ChangeAlertData('Post Unliked 😌', 'warning')
                        MyLikeData()
                    }
                    AnimateData()

                })
        } else {
            router.push('/account/user_login')
        }

    }
    const AddTofav = async () => {

        if (Contextdata.UserLogin) {
            const sendUM = {

                PostData: PostData.PostData
            }
            const data = await fetch("/api/user/like_post", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    if (parsed.ReqData.Liked) {
                        Contextdata.ChangeAlertData('Post Liked 😍', 'success')
                        MyLikeData()
                    }
                    if (parsed.ReqData.UnLiked) {
                        Contextdata.ChangeAlertData('Post Unliked 😌', 'warning')
                        MyLikeData()
                    }
                    AnimateData()

                })
        } else {
            router.push('/account/user_login')
        }

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

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    return (
        <div>
            {ShowData &&

                <div className={Mstyles.FeedItemBottomMain}>
                    <div className={Mstyles.FeedItemBottom}>
                        <div className={Mstyles.FeedBtnitem} >

                            <div className={Mstyles.FeedBtnitemA}>
                                {Liked ?
                                    <IconButton aria-label="cart" onClick={() => LikePost()}>
                                        <StyledBadge badgeContent={AllLikes} color="secondary">
                                            <BsFillHandThumbsUpFill size={20} />
                                        </StyledBadge>
                                    </IconButton>
                                    :

                                    <IconButton aria-label="cart" onClick={() => LikePost()}>
                                        <StyledBadge badgeContent={AllLikes} color="secondary">
                                            <BsHandThumbsUp size={20} />
                                        </StyledBadge>
                                    </IconButton>
                                }
                            </div>
                         

                        </div>

                        <PostCmt PostData={PostData.PostData} />

                        <div className={Mstyles.FeedBtnitem} >

                            <div className={Mstyles.FeedBtnitemA}>
                                {Liked ?


                                    <IconButton aria-label="cart" onClick={() => LikePost()}>
                                        <StyledBadge color="secondary">
                                            <BsStarFill size={20} />
                                        </StyledBadge>
                                    </IconButton>
                                    :

                                    <IconButton aria-label="cart">
                                        <StyledBadge color="secondary" onClick={() => LikePost()}>
                                            <BsStar size={20} />
                                        </StyledBadge>
                                    </IconButton>
                                }
                            </div>


                        </div>

                    </div>

                    <div className={Mstyles.FeedItemBottomB}>
                        <Sharebtn ContentUrl={`${DomainURL}p/${PostData.PostData.PostID}`} />
                    </div>

                    {/* 
                    <div className={Mstyles.Likete}>
                                <div className={`${animate ? Mstyles.AnimateData : Mstyles.AnimateDataTwo}`}>
                                  
                                  {AllLikes}
                                </div>

                                
                            </div> */}
                </div>
            }
        </div>
    );
};

export default FeedFooterbox;
