import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router'
import CheckloginContext from '/context/auth/CheckloginContext'
import Mstyles from '/Styles/mainstyle.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';
import FeedFooterbox from '../FeedUser/FeedFooterbox';
import FeedTopbox from '../FeedUser/FeedTopbox';
import FeedContentBox from '../FeedUser/FeedContentBox';
import { useTheme } from '@mui/material';

function Feedlist({ PostData }) {
    const Contextdata = useContext(CheckloginContext)
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()
    const [limit, setlimit] = useState(3);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const GetData = async () => {
        const MD = PostData.FeedList
        setHasMore(false);
        setRetdata(prevData => removeDuplicates([...prevData, ...MD]));
        setPage(page + 1)
    }

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

    const removeDuplicates = (arr) => {
        const uniqueArray = arr.filter((item, index) => {
            return (
                index ===
                arr.findIndex((obj) => JSON.stringify(obj) === JSON.stringify(item))
            );
        });
        return uniqueArray;
    };

    const theme = useTheme();

    return (
        <>
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
                {Retdata.map((item, index) => (
                    <div className={`${Mstyles.FeedItem} ${Mstyles.fadeinAnimation}`} key={index} >
                        <FeedTopbox PostData={item} />
                        <FeedContentBox PostData={item} />
                        <FeedFooterbox PostData={item} />
                    </div>
                ))}
            </InfiniteScroll>
        </>
    );
}

export default Feedlist;
