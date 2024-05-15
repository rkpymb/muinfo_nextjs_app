import { useState, useEffect, useContext } from 'react';
import Mstyles from '/styles/mainstyle.module.css'
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';

import { TiPin } from "react-icons/ti";
import FeedFooterbox from './FeedComp/FeedFooterbox';
import FeedTopbox from './FeedComp/FeedTopbox';
import FeedContentBox from './FeedComp/FeedContentBox';


import { useRouter, useParams } from 'next/router'
const FeedlistMain = () => {
    const router = useRouter()
    const [FeedList, setFeedList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [AllData, setAllData] = useState(0);
    const [limit, setlimit] = useState(2);
    const [PostID, setPostID] = useState('Demo1234');
    const [hasMore, setHasMore] = useState(false);
    const [ShowComments, setShowComments] = useState(false);
    const [count, setCount] = useState(1);
    const [page, setPage] = useState(1);

    const GetData = async () => {

        const sendUM = {

            page: page,
            limit: limit,



        };

        try {
            const data = await fetch("/api/user/Pinned_posts_list", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            });

            if (!data.ok) {
                throw new Error('Failed to fetch data');
            }
            const parsed = await data.json();

            if (parsed.ReqData) {

                if (parsed.ReqData.DataList.length === 0) {
                    setHasMore(false);
                    setIsLoading(false);

                } else {
                    if (page === 1) {
                        setFeedList([])
                    }

                    setFeedList(prevData => [...prevData, ...parsed.ReqData.DataList]);
                    setPage(page + 1)

                    if (parsed.ReqData.DataList.length < limit) {
                        setHasMore(false);

                    }
                    setIsLoading(false);
                }


            } else {
                setHasMore(false);
            }


        } catch (error) {
            console.error('Error fetching data:', error);

        }
    };

    const loadMoreData = () => {
        if (!isLoading) {
            setIsLoading(true);
            setTimeout(function () {
                GetData();
            }, 1000);

        }
    };


    useEffect(() => {

        GetData();



    }, [count])

    return (
        <div >
            {FeedList.length > 0 &&

                <div className={Mstyles.PinDeboxm}>
                    <InfiniteScroll
                        dataLength={FeedList.length}
                        next={loadMoreData}
                        hasMore={hasMore}
                        scrollThreshold={0.2}

                    >

                        <div className={Mstyles.FeedItemGrid}>

                            {FeedList.map((item, index) => {
                                return <div hover key={index} className={Mstyles.FeedItem}>

                                    <div>
                                        <FeedTopbox PostData={item} />
                                        <div className={Mstyles.shapeItem}>
                                            <div className={Mstyles.shapetext}>
                                                <div className={Mstyles.shapetextA}>
                                                    <TiPin size={18} />
                                                </div>
                                                <div className={Mstyles.shapetextB}>
                                                    Pinned Post
                                                </div>
                                            </div>
                                        </div>

                                        <FeedContentBox PostData={item} />
                                    </div>
                                    <div>
                                        <FeedFooterbox PostData={item} ShowComments={ShowComments} />
                                    </div>

                                </div>
                            }

                            )}
                        </div>


                    </InfiniteScroll>
                </div>

            }





        </div>
    )
}

export default FeedlistMain
