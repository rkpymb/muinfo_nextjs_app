import React, { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router'
import Link from 'next/link';

import Avatar from '@mui/material/Avatar';
import CheckloginContext from '/context/auth/CheckloginContext'
import { FiArrowRightCircle, FiMoreVertical, FiMessageCircle, FiHeart, FiShare2 } from "react-icons/fi";
import Mstyles from '/Styles/mainstyle.module.css';
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import Skeleton from '@mui/material/Skeleton';
import InfiniteScroll from 'react-infinite-scroll-component';
import RrqFooterbox from '../../../pages/components/Rfq/RrqFooterbox';


import {

    useTheme,

} from '@mui/material';

function Feedlist() {
    const Contextdata = useContext(CheckloginContext)
  
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()

    const [totalUsers, setTotalUsers] = useState(0);
    const [size, setSize] = useState(5);
    const [activePage, setActivePage] = useState(1);


    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    const GetData = async () => {
        setIsLoading(true)

        const sendUM = {
            JwtToken: Contextdata.VendorJwtToken,
            size: size,
            page: activePage

        }
        const data = await fetch("/api/Vendor/RFQFeedlist", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                console.log(parsed.ReqData.FeedList)

                setActivePage(activePage + 1);
                setRetdata([...Retdata, ...parsed.ReqData.FeedList]);
                setTotalUsers(parsed.ReqData.total)
                setTimeout(function () {
                    setIsLoading(false)
                }, 1000);

            })
    }
    useEffect(() => {
        GetData()

    }, [router.query])

    const theme = useTheme();

    return (<>
        <InfiniteScroll
            dataLength={Retdata.length}
            next={GetData}
            hasMore={Retdata.length < totalUsers}
            loader={<div> <Skeleton variant="text" sx={{ fontSize: '2rem', width: 100, margin: 10 }} /></div>}
            endMessage={
                <p style={{ textAlign: 'center', marginTop: '10px' }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            {Retdata.map((item, index) => {
                return <div className={Mstyles.FeedItem} key={index} >

                    <div className={Mstyles.FeedItemTop}>
                        <div className={Mstyles.FeedItemTopA}>
                            <div className={Mstyles.FeedItemAvatar}>
                                {isLoading ? <div className={Mstyles.CatGridItemA}>
                                    <Skeleton variant="circular" width={40} height={40} />
                                </div> : <Avatar
                                    alt={item.UserData.name}
                                    src={`${MediaFilesUrl}${MediaFilesFolder}/${item.UserData.dp}`}
                                    sx={{ width: 40, height: 40 }}
                                />}

                            </div>
                            <div className={Mstyles.NametextboxText}>
                                <div className={Mstyles.Nametextbox}>
                                    {isLoading ? <div className={Mstyles.CatGridItemA}>
                                        <Skeleton variant="text" sx={{ fontSize: '1rem', width: 100 }} />
                                    </div> : <span>{item.UserData.name}  <small>@{item.UserData.username}</small></span>}


                                </div>
                                <div>

                                    {isLoading ? <div className={Mstyles.CatGridItemA}>
                                        <Skeleton variant="text" sx={{ fontSize: '1rem', width: 50 }} />
                                    </div> : <small className={Mstyles.timetext}>{item.formattedDate}</small>}
                                </div>
                            </div>

                        </div>
                        <div className={Mstyles.FeedItemTopB}>

                            {isLoading ? <div className={Mstyles.CatGridItemA}>
                                <Skeleton variant="text" sx={{ fontSize: '2rem', width: 10 }} />
                            </div> : <div className={Mstyles.FeedItemMorebtn}>
                                <FiMoreVertical size={20} />
                            </div>}

                        </div>

                    </div>
                    <div className={Mstyles.FeedItemMedium}>
                        <div>
                            {isLoading ? <div className={Mstyles.CatGridItemA}>
                                <Skeleton variant="text" sx={{ fontSize: '1rem', width: 200 }} />
                            </div> : <div> {item.PostData.PostText}</div>}

                        </div>

                    </div>

                    {isLoading ? <div className={Mstyles.CatGridItemA}>
                        <Skeleton variant="text" sx={{ fontSize: '1rem', width: 100 }} />
                    </div> : <div>  <RrqFooterbox PostData={item} /></div>}




                </div>

            }

            )}
        </InfiniteScroll>
    </>
    );
}

export default Feedlist;
