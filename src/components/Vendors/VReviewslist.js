import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReatingStars from '/src/components/Parts/ReatingStars';
import Mstyles from '/Styles/mainstyle.module.css';
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config';
import CheckloginContext from '/context/auth/CheckloginContext';
import CircularProgress from '@mui/material/CircularProgress';

function Feedlist({ username }) {
    const Contextdata = useContext(CheckloginContext);
    const router = useRouter();
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [limit, setlimit] = useState(2);

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const GetData = async () => {
        const sendUM = {
            JwtToken: Contextdata.VendorJwtToken,
            page: page,
            limit: limit,

        };

        try {
            const response = await fetch("/api/Vendor/VReviewslist", {
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
                if (parsed.ReqData.ReviewList.length === 0) {
                    setHasMore(false);
                    setIsLoading(false);
                } else {
                    if (page === 1) {
                        setRetdata([])
                    }

                    setRetdata(prevData => [...prevData, ...parsed.ReqData.ReviewList]);
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

    return (
        <>
            <div className={Mstyles.Vtitlebox}>Reviews</div>
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
                <div className={Mstyles.ReviewItemGrid}>
                    {Retdata.map((item, index) => (
                        <div className={`${Mstyles.ReviewItem} ${Mstyles.SlideinAnimation}`} key={index}>
                            <div className={Mstyles.ReviewItemTop}>
                                <Avatar
                                    alt={item.UD.name}
                                    src={`${MediaFilesUrl}${MediaFilesFolder}/${item.UD.dp}`}
                                    sx={{ width: 40, height: 40 }}
                                />
                                <div className={Mstyles.ReviewItemNamebox}>
                                    <span>{item.UD.name}</span>
                                    <small>{item.formattedDate}</small>
                                    <ReatingStars StarData={item.PostData.Rating[0]} />
                                </div>
                            </div>
                            <div className={Mstyles.ReviewItemCenter}>
                                <div>{item.PostData.Rating[0].Comments}</div>
                            </div>
                            <div className={Mstyles.ReviewItemFooter}></div>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </>
    );
}

export default Feedlist;
