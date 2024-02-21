import React, { useState, useEffect, useContext } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import CheckloginContext from '/context/auth/CheckloginContext'
import { useRouter, useParams } from 'next/router'


import Mstyles from '/Styles/mainstyle.module.css'

import { FaRegHeart,FaHeart } from "react-icons/fa6";
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
const FollowBtn = ({ VD }) => {
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true);
    const [LoadingBtn, setLoadingBtn] = useState(false);
    const [Following, setFollowing] = useState(false);

    const CheckFollowData = async () => {
        const sendUM = {
            JwtToken: Contextdata.UserJwtToken,
            username: VD.username
        };

        try {
            const response = await fetch("/api/User/CheckFollow", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            });


            const parsed = await response.json();

            if (parsed.ReqData) {
                setIsLoading(false)
                setLoadingBtn(false)
                if (parsed.ReqData.CheckData) {
                    if (parsed.ReqData.CheckData.length == 1) {
                        setFollowing(true);
                    } else {
                        setFollowing(false);

                    }
                  

                }


            }


        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        CheckFollowData();
    }, [router.query]);


    const ManageFollow = async () => {
        setLoadingBtn(true)
        const sendUM = {
            JwtToken: Contextdata.UserJwtToken,
            username: VD.username,
            mobile: VD.mobile
        };
        try {
            const response = await fetch("/api/User/ManageFollow", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const parsed = await response.json();

            if (parsed.ReqData) {
                setTimeout(function () {
                    if (parsed.ReqData.Following) {
                        CheckFollowData()
                        Contextdata.ChangeAlertData('Following Now 😍', 'success')
                        router.push(`/v/${VD.username}`)
                    }
                    if (parsed.ReqData.Unfollow) {
                        router.push(`/v/${VD.username}`)
                        Contextdata.ChangeAlertData('unfollowed 😐', 'warning')
                        CheckFollowData()

                    }
                    if (parsed.ReqData.msg) {
                        Contextdata.ChangeAlertData('Somthing Went Worn 😣', 'warning')


                    }

                }, 2000);

            }


        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };
    return (
        <div>
            {isLoading ?
                <Skeleton variant="text" sx={{ fontSize: '1rem', width: 100 }} /> :
                <div
                    onClick={ManageFollow}
                    className={Following ? `${Mstyles.VpBtnItemActive}` : `${Mstyles.VpBtnItem}`}
                >
                    <div className={Mstyles.VpBtnItemA}>
                        {LoadingBtn ? <CircularProgress size={15} color="success" /> : <div>
                            {Following ? <FaHeart />
                                :
                                <FaRegHeart />
                            }

                        </div>}
                    </div>
                    <div className={Mstyles.VpBtnItemB}>
                        {Following ? <span>Following</span>
                            :
                            <span>Follow</span>
                        }

                    </div>

                </div>}

        </div>
    )
}

export default FollowBtn
