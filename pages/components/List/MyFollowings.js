import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReatingStars from '/src/components/Parts/ReatingStars';
import Mstyles from '/Styles/mainstyle.module.css';
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config';
import CheckloginContext from '/context/auth/CheckloginContext';
import CircularProgress from '@mui/material/CircularProgress';
import FollowBtn from '/src/components/User/FollowBtn';
function Feedlist() {
    const Contextdata = useContext(CheckloginContext);
    const router = useRouter();
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [limit, setlimit] = useState(10);

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const GetData = async () => {
        const sendUM = {
            JwtToken: Contextdata.UserJwtToken,
            page: page,
            limit: limit,
        };

        try {
            const response = await fetch("/api/V3/List/MyFollowings", {
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
                if (parsed.ReqData.Followinglist.length === 0) {
                    setHasMore(false);
                    setIsLoading(false);
                } else {
                    if (page === 1) {
                        setRetdata([])
                    }

                    setRetdata(prevData => [...prevData, ...parsed.ReqData.Followinglist]);
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
            <div className={Mstyles.FGrid}>
                {Retdata.map((item, index) => (
                    <div className={`${Mstyles.FGridItem} ${Mstyles.SlideinAnimation}`} key={index}>
                        <div className={Mstyles.FGridItemA}>
                            <Avatar
                                alt={item.VD.name}
                                src={`${MediaFilesUrl}${MediaFilesFolder}/${item.VD.dp}`}
                                sx={{ width: 40, height: 40 }}
                            />
                            <div className={Mstyles.FGridItemAItle}>
                                <span>{item.VD.name}</span>
                                <small>{item.formattedDate}</small>

                            </div>
                        </div>
                        <div className={Mstyles.FGridItemB}>
                            <FollowBtn VD={item.VD} />
                        </div>

                    </div>
                ))}
            </div>
        </InfiniteScroll>
    );
}

export default Feedlist;
