import React, { useState, useEffect, useContext } from 'react';
import CheckloginContext from '/context/auth/CheckloginContext'
import { useRouter } from 'next/router'

import Mstyles from '/styles/mainstyle.module.css';
import { MediaFilesUrl, FeedimgFolder, DomainURL } from '/Data/config';
import IconButton from '@mui/material/IconButton';
import PostCmtBox from './PostCmtBox';
import Sharebtn from '../ShareBox/Sharebtn';
import Badge from '@mui/material/Badge';
import Image from 'next/image';

import {

    styled
} from '@mui/material';



import { BsHandThumbsUp, BsFillHandThumbsUpFill, BsStarFill, BsStar, BsArrowsFullscreen } from "react-icons/bs";

const FeedFooterbox = ({ PostData, ShowComments }) => {
    const router = useRouter();
    const Contextdata = useContext(CheckloginContext);
    const [Liked, setLiked] = useState(false);
    const [ShowData, setShowData] = useState(false);
    const [animate, setAnimate] = useState(false);



    const [AllLikes, setAllLikes] = useState(0);
    const [TotalCmt, setTotalCmt] = useState(0);
    const [FavPost, setFavPost] = useState(false);

    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    const [ShareFeed, setShareFeed] = useState({});

    useEffect(() => {

        setShareFeed(
            {
                title: `${PostData.PostData.MetaTagData.og_title}`,
                text: `${PostData.PostData.MetaTagData.og_description}`,
                url: `${DomainURL}p/${PostData.PostData.PostID}`,

            }


        )


        setAllLikes(PostData.PostLikes)
        setTotalCmt(PostData.TotalCmt)

        if (Contextdata.UserLogin) {
            MyLikeData()
        }

        setShowData(true)

    }, [router.query, Contextdata.UserData]);

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

                if (parsed.ReqData) {

                    setAllLikes(parsed.ReqData.AllLikes)

                    if (parsed.ReqData.MyLikeData) {
                        setLiked(true)
                    } else {
                        setLiked(false)
                    }
                    if (parsed.ReqData.FavPost) {
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
    const ViewPost = async (PostData) => {

        if (Contextdata.AppMode) {
           
            if (PostData.PostData.PostID) {
                const PostID = PostData.PostData.PostID
                window.open(`/p/${PostID}`, '_blank');
            }
        } else {
            router.push(`${DomainURL}p/${PostData.PostData.PostID}`)
        }

    }


    const LikePost = async () => {

        if (Contextdata.UserLogin) {
            if (Liked) {
                setLiked(false)
            } else {
                setLiked(true)
            }
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

            if (FavPost) {
                setFavPost(false)
            } else {
                setFavPost(true)
            }
            const sendUM = {

                PostData: PostData.PostData
            }
            const data = await fetch("/api/user/save_post", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    if (parsed.ReqData.Saved) {
                        Contextdata.ChangeAlertData(parsed.ReqData.Saved, 'success')
                        MyLikeData()
                    }
                    if (parsed.ReqData.UnSaved) {
                        Contextdata.ChangeAlertData(parsed.ReqData.UnSaved, 'warning')
                        MyLikeData()
                    }
                    AnimateData()

                })
        } else {
            router.push('/account/user_login')
        }

    }




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
            <div className={Mstyles.PostCounter}>
                <div className={Mstyles.PostCounterItem}>
                    <span>{AllLikes} Likes</span>
                </div>
                <div style={{ width: '20px' }}></div>
                <div className={Mstyles.PostCounterItem}  onClick={() => ViewPost(PostData)}>
                    <span>{TotalCmt} Comments</span>
                </div>
            </div>
            {ShowData &&

                <div className={Mstyles.FeedItemBottomMain}>
                    <div className={Mstyles.FeedItemBottom}>
                        <div className={Mstyles.FeedBtnitem} >

                            <div className={Mstyles.FeedBtnitemA}>
                                {Liked ?
                                    <div onClick={() => LikePost()} >
                                        <Image
                                            src='/svg/like_fill.svg'
                                            alt="i"

                                            height={30}
                                            width={30}
                                            blurDataURL={blurredImageData}
                                            placeholder='blur'
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                    :

                                    <div onClick={() => LikePost()} >
                                        <Image
                                            src='/svg/like.svg'
                                            alt="i"

                                            height={30}
                                            width={30}
                                            blurDataURL={blurredImageData}
                                            placeholder='blur'
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                }
                            </div>


                        </div>



                        <div className={Mstyles.FeedBtnitem} >

                            {!ShowComments &&
                                <div className={Mstyles.FeedBtnitemA}>
                                    <div>
                                        <Image
                                            alt="i"
                                            src='/svg/comment.svg'
                                            onClick={() => ViewPost(PostData)}
                                            height={30}
                                            width={30}
                                            blurDataURL={blurredImageData}
                                            placeholder='blur'
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>


                                </div>
                            }



                        </div>
                        <div className={Mstyles.FeedBtnitem} >

                            <div className={Mstyles.FeedBtnitemA}>
                                {FavPost ?


                                    <div onClick={() => AddTofav()} >
                                        <Image
                                            src='/svg/saved.svg'
                                            alt="i"

                                            height={30}
                                            width={30}
                                            blurDataURL={blurredImageData}
                                            placeholder='blur'
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                    :

                                    <div onClick={() => AddTofav()} >
                                        <Image
                                            src='/svg/save.svg'
                                            alt="i"

                                            height={30}
                                            width={30}
                                            blurDataURL={blurredImageData}
                                            placeholder='blur'
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                }
                            </div>


                        </div>



                    </div>

                    <div className={Mstyles.FeedItemBottomB}>
                        <Sharebtn ShareFeed={ShareFeed} />
                    </div>


                </div>
            }

            {ShowComments &&
                <div>
                    <PostCmtBox PostData={PostData.PostData} />
                </div>

            }

        </div>
    );
};

export default FeedFooterbox;
