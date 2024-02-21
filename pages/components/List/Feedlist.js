import React, { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router'
import Link from 'next/link';

import Avatar from '@mui/material/Avatar';
import CheckloginContext from '/context/auth/CheckloginContext'
import { FiArrowRightCircle, FiMoreVertical, FiMessageCircle, FiHeart, FiShare2 } from "react-icons/fi";
import Mstyles from '/Styles/mainstyle.module.css';
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import Skeleton from '@mui/material/Skeleton';

import FeedFooterbox from '../Feed/FeedFooterbox';
import FeedTopbox from '../Feed/FeedTopbox';
import FeedContentBox from '../Feed/FeedContentBox';

import {

    useTheme,

} from '@mui/material';

function Feedlist() {
    const Contextdata = useContext(CheckloginContext)
    const Dummydta = [
        {
            id: 1
        },
        {
            id: 2
        }
        ,
        {
            id: 3
        }
        ,
        {
            id: 4
        }
        ,
        {
            id: 5
        },
        {
            id: 4
        }
        ,
        {
            id: 5
        }
    ]

    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()
    const [Liked, setLiked] = useState([]);
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    const GetData = async () => {
        setIsLoading(true)
      
        const sendUM = {  JwtToken: Contextdata.UserJwtToken, }
        const data = await fetch("/api/V3/List/Feedlist", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {

                setRetdata(parsed.ReqD.FeedList)
                setIsLoading(false)
                
            })
    }
    useEffect(() => {
        GetData()

    }, [router.query])

    const theme = useTheme();

    return (<>
        <div>
            {isLoading ? <div className={Mstyles.MainCatGrid}>

                {Dummydta.map((item, index) => {
                    return <div className={Mstyles.MainCatGridItem} key={index} >
                        <div className={Mstyles.CatGridItemA}>
                            <Skeleton variant="circular" width={40} height={40} />
                        </div>
                        <div style={{ minHeight: '10px' }}></div>
                        <div className={Mstyles.CatGridItemB}>
                            <Skeleton variant="text" sx={{ fontSize: '1rem', width: 100 }} />
                        </div>



                    </div>

                }

                )}
            </div> :
                <div>
                    {Retdata.length > 0 &&
                        <div>
                            {Retdata.map((item, index) => {
                                return <div className={Mstyles.FeedItem} key={index} >

                                    <FeedTopbox PostData={item} />
                                   
                                    <FeedContentBox PostData={item} />
                                    <FeedFooterbox PostData={item}  />


                                </div>

                            }

                            )}

                        </div>

                    }
                </div>

            }

        </div>




    </>
    );
}

export default Feedlist;
