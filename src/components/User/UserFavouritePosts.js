import { useState, useEffect, useContext } from 'react';
import Mstyles from '/styles/mainstyle.module.css'
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';


import FeedFooterbox from '/src/components/user/FeedComp/FeedFooterbox';
import FeedTopbox from '/src/components/user/FeedComp/FeedTopbox';
import FeedContentBox from '/src/components/user/FeedComp/FeedContentBox';


import { useRouter, useParams } from 'next/router'
const FeedlistMain = () => {
    const router = useRouter()
    const [FeedList, setFeedList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [AllData, setAllData] = useState(0);
    const [limit, setlimit] = useState(2);
    const [PostID, setPostID] = useState('Demo1234');
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const GetData = async () => {

        const sendUM = {

            page: page,
            limit: limit,
           

        };

        try {
            const data = await fetch("/api/user/user_favourite_posts", {
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
        setPage(1)
        GetData();

    }, [router.query])

    return (
        <div>


            <InfiniteScroll
                dataLength={FeedList.length}
                next={loadMoreData}
                hasMore={hasMore}
                scrollThreshold={0.2}
                loader={<div style={{ textAlign: 'center', margin: 'auto', marginTop: '20px' }} >
                    <CircularProgress size={25} color="success" />
                </div>}
                endMessage={
                    <div style={{ textAlign: 'center', margin: 'auto', marginTop: '20px' }} >
                        <b>Yay! You have seen it all 🎉</b>
                    </div>
                }
            >

                {FeedList.map((item, index) => {
                    return <div hover key={index} className={Mstyles.FeedItem}>
                        <div>
                            <FeedTopbox PostData={item} />

                            <FeedContentBox PostData={item} />
                        </div>
                        <div>
                            <FeedFooterbox PostData={item} />
                        </div>

                    </div>
                }

                )}
            </InfiniteScroll>

        </div>
    )
}

export default FeedlistMain
