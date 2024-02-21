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
    const [Retdata, setRetdata] = useState(Dummydta);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()
    const [users, setUsers] = useState([]);
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
                console.log(parsed.ReqData.size)
                console.log(parsed.ReqData.page)
                console.log(parsed.ReqData.total)
                setActivePage(activePage+ 1);
                setRetdata([...Retdata, parsed.ReqData.FeedList]);
                setTotalUsers(parsed.ReqData.total)
                
            //     setTimeout(function(){
            //         setIsLoading(false)
            //    }, 1000);

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
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center', marginTop: '10px' }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            {Retdata.map(user => (
                <div className="card mt-2" >
                    <div className="card-body">
                        <div className="userIntro">
                            <div className="userTitles">
                                <h5 className="card-title">{user._id + ' ' + user.PostText}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{"@" + user.username}</h6>
                            </div>
                            <div>
                                <img src={user.image} height={150} />
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </InfiniteScroll>
    </>
    );
}

export default Feedlist;
