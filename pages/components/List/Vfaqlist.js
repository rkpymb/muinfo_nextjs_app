import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReatingStars from '/src/components/Parts/ReatingStars';
import Mstyles from '/Styles/mainstyle.module.css';
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config';
import CheckloginContext from '/context/auth/CheckloginContext';
import CircularProgress from '@mui/material/CircularProgress';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Feedlist({ username }) {
    const Contextdata = useContext(CheckloginContext);
    const router = useRouter();
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [limit, setlimit] = useState(5);

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const GetData = async () => {
        const sendUM = {
          
            page: page,
            limit: limit,
            username: username
        };

        try {
            const response = await fetch("/api/V3/List/Vfaqlist", {
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
                if (parsed.ReqData.Faqlist.length === 0) {
                    setHasMore(false);
                    setIsLoading(false);
                } else {
                    if (page === 1) {
                        setRetdata([])
                    }

                    setRetdata(prevData => [...prevData, ...parsed.ReqData.Faqlist]);
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
                <div className={`${Mstyles.FAQGrid}`}>
                    {Retdata.map((item, index) => (
                        <div className={`${Mstyles.AcordianItem} ${Mstyles.SlideinAnimation}`} key={index}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography>{item.FaqData[0].Title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        {item.FaqData[0].Desc}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>


        </>
    );
}

export default Feedlist;
