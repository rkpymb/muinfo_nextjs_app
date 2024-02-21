import React, { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router'

import IconButton from '@mui/material/IconButton';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';
import Mstyles from '/Styles/mainstyle.module.css';
import { MediaFilesUrl, MediaFilesFolder, FeedimgFolder } from '/Data/config'
import Skeleton from '@mui/material/Skeleton';


import CheckloginContext from '/context/auth/CheckloginContext'
import { LuEye, } from "react-icons/lu";

import Image from 'next/image';

import {
    FormControl,
    useTheme,

} from '@mui/material';





function Feedlist({ username }) {
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setlimit] = useState(4);

    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';



    const ViewPhoto = async (e) => {
        const url = `${MediaFilesUrl}${FeedimgFolder}/${e.PostList[0].postData}`
        window.open(url, '_blank');
    }

    const GetData = async () => {
        const sendUM = {
            JwtToken: Contextdata.UserJwtToken,
            page: page,
            limit: limit,
            username: username
        };

        try {
            const response = await fetch("/api/V3/List/VGalarylist", {
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
                if (parsed.ReqData.VGalarylist.length === 0) {
                    setHasMore(false);
                    setIsLoading(false);
                } else {
                    if (page === 1) {
                        setRetdata([])
                    }

                    setRetdata(prevData => [...prevData, ...parsed.ReqData.VGalarylist]);
                    setPage(page + 1)
                 
                    setIsLoading(false);
                }


            }


        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        GetData();
    }, [router.query]);

    const loadMoreData = () => {
        if (!isLoading) {
            setIsLoading(true);
            setTimeout(function () {
                GetData();
            }, 1000);

        }
    };





    const theme = useTheme();

    return (<>
        <div>

            <InfiniteScroll
                dataLength={Retdata.length}
                next={loadMoreData}
                hasMore={hasMore}
                scrollThreshold={0.9}
                loader={<div className={Mstyles.LoadingBox}><CircularProgress size={25} color="success" className={Mstyles.fadeinAnimation} /></div>}
                endMessage={
                    <div style={{ textAlign: 'center', margin: '50px', }} className={Mstyles.fadeinAnimation}>
                    <b>Yay! You have seen it all 🎉</b>
                </div>
                }
            >
                  <div className={Mstyles.VGaleryGrid}>
                                {Retdata.map((item, index) => {
                                    return <div className={`${Mstyles.VGaleryGridItem} ${Mstyles.SlideinAnimation}`} key={index} >
                                        <div className={Mstyles.VGaleryGridItemImage}>


                                            <Image
                                                src={`${MediaFilesUrl}${FeedimgFolder}/${item.PostList[0].postData}`}
                                                alt=""
                                                fill
                                                blurDataURL={blurredImageData}
                                                placeholder='blur'
                                                style={{ objectFit: "cover" }}
                                            />
                                            <div className={Mstyles.VGaleryGridFlott}>
                                                <IconButton
                                                    onClick={() => ViewPhoto(item)}
                                                    aria-label="toggle password visibility"
                                                    style={{ width: 40, height: 40, color: 'white' }}
                                                >
                                                    <LuEye size={20} />
                                                </IconButton>
                                                <div style={{ width: '10px' }}></div>
                                                
                                            </div>
                                        </div>




                                    </div>

                                }

                                )}


                            </div>
            </InfiniteScroll>
        </div>




    </>
    );
}

export default Feedlist;
