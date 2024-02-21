import React, { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router'

import CheckloginContext from '/context/auth/CheckloginContext'

import Mstyles from '/Styles/mainstyle.module.css';

import InfiniteScroll from 'react-infinite-scroll-component';

import CircularProgress from '@mui/material/CircularProgress';
import VendorItem from '../ListParts/VendorItem';


function Feedlist({ Catdata }) {
    const Contextdata = useContext(CheckloginContext)

    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()

    const [limit, setlimit] = useState(5);

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const GetData = async () => {

        setIsLoading(true)

        const sendUM = {
            JwtToken: Contextdata.UserJwtToken,
            page: page,
            limit: limit,
            Latitude: Contextdata.LocationData.lat,
            Longitude: Contextdata.LocationData.lng,
            MaxDistance: Contextdata.MapRadius,
            slug: Catdata.slug

        }
        const data = await fetch("/api/V3/List/VbyMainCat", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {

                if (parsed.ReqData.ListData.length === 0) {
                    setHasMore(false);
                    setIsLoading(false);
                } else {
                    if (page === 1) {
                        setRetdata([])
                    }

                    setRetdata(prevData => [...prevData, ...parsed.ReqData.ListData]);
                    setPage(page + 1)

                    setIsLoading(false);
                }


            })
    }
    useEffect(() => {
        console.log(Catdata)
        if (Contextdata.UserLogin && Contextdata.LocationData) {
            Contextdata.ChangeMainLoader(false)
            GetData();
          }
    }, [router.query,Contextdata.UserLogin]);

    const loadMoreData = () => {
        if (!isLoading) {
            setIsLoading(true);
            setTimeout(function () {
                GetData();
            }, 1000);

        }
    };

    return (<>
        <InfiniteScroll
            dataLength={Retdata.length}
            next={loadMoreData}
            hasMore={hasMore}
            scrollThreshold={0.5}
            loader={<div className={Mstyles.LoadingBox}><CircularProgress size={25} color="success" className={Mstyles.fadeinAnimation} /></div>}
            endMessage={
                <div style={{ textAlign: 'center', margin: '50px', }} className={Mstyles.fadeinAnimation}>
                    <b>Yay! You have seen it all 🎉</b>
                </div>
            }
        >
            <div className={Mstyles.VendorMaingrid}>
                {Retdata.map((item, index) => {
                    return <div key={index} onClick={() => router.push(`/v/${item.VendorData.username}`)}>
                        {item.username}
                        <VendorItem MData={item} />

                    </div>
                }
                )}
            </div>
        </InfiniteScroll>

        <div className={Mstyles.SecDevider}></div>
    </>
    );
}

export default Feedlist;
