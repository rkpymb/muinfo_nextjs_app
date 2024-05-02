import { useState, useEffect, useContext } from 'react';
import Mstyles from '/styles/mainstyle.module.css'
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';

import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import Image from 'next/image';

const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
import { useRouter, useParams } from 'next/router'
const NotiListMain = () => {
    const router = useRouter()
    const [NotiList, setNotiList] = useState([]);
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
            const data = await fetch("/api/user/notifications", {
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



                    setNotiList(prevData => [...prevData, ...parsed.ReqData.DataList]);
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

    const NotiClick = async (ClickData) => {
      
        const TragetUrl = ClickData.url
        if (TragetUrl) {
            window.open(`${TragetUrl}`, "_blank");
        }

    };


    return (
        <div>
           

            <InfiniteScroll
                dataLength={NotiList.length}
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
                <div className={Mstyles.NotiGrid}>
                    {NotiList.map((item) => {
                        return <div className={Mstyles.NotiItem} key={item._id}
                        onClick={() => NotiClick(item.NotiItem)}
                        >
                            <div className={Mstyles.NotiItemTop}>
                                <div className={Mstyles.NotiItemTopA}>
                                    <div className={Mstyles.Notiimg}>
                                        <Image
                                            src={`${MediaFilesUrl}${MediaFilesFolder}/${item.NotiItem.img}`}
                                            alt="image"
                                            layout="responsive"
                                            placeholder='blur'
                                            width={30}
                                            height={30}
                                            quality={100}
                                            blurDataURL={blurredImageData}
                                            style={{ borderRadius:"5px", objectFit: "cover" }}

                                        />
                                    </div>
                                </div>
                                <div className={Mstyles.NotiItemTopB}>
                                
                                <div className={Mstyles.NotitextDate}>
                                        <span>{item.formattedDate}</span>
                                        
                                    </div>
                                    <div className={Mstyles.Notitext}>
                                        <span>{item.NotiItem.title}</span>
                                        <div style={{height:"5px"}}></div>
                                        <small>{item.NotiItem.details}</small>
                                    </div>
                                    
                                </div>


                            </div>

                        </div>
                    }

                    )}
                </div>
            </InfiniteScroll>

        </div>
    )
}

export default NotiListMain
