import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import InfiniteScroll from 'react-infinite-scroll-component';

import Mstyles from '/Styles/mainstyle.module.css';
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config';
import CheckloginContext from '/context/auth/CheckloginContext';
import CircularProgress from '@mui/material/CircularProgress';

import ReportPost from '../../../pages/components/FeedVendor/ReportPost'

import { LuTrash2, LuPencilLine, LuEye, LuChevronRight } from "react-icons/lu";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';

import RrqFooterbox from '../../../pages/components/Rfq/RrqFooterbox';
import { FiArrowRightCircle, FiMoreVertical, FiMessageCircle, FiHeart, FiShare2 } from "react-icons/fi";
function Feedlist() {
    const Contextdata = useContext(CheckloginContext);
    const router = useRouter();
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [limit, setlimit] = useState(3);

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);



    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const GetData = async () => {
        setIsLoading(true)

        const sendUM = {
            JwtToken: Contextdata.VendorJwtToken,
            page: page,
            limit: limit

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

                if (parsed.ReqData.FeedList.length === 0) {
                    setHasMore(false);
                    setIsLoading(false);
                } else {
                    if (page === 1) {
                        setRetdata([])
                    }

                    setRetdata(prevData => [...prevData, ...parsed.ReqData.FeedList]);
                    setPage(page + 1)

                    setIsLoading(false);
                }
            })
    }
    useEffect(() => {
        GetData()

    }, [router.query])

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
        <div className={Mstyles.Vtitlebox}>New Enquries</div>
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
            {Retdata.map((item, index) => {
                return <div className={Mstyles.Rfqitem} key={index} >

                    <div className={Mstyles.RfqItemTop}>
                        <div className={Mstyles.FeedItemTopA}>
                            <div className={Mstyles.FeedItemAvatar}>
                                <Avatar
                                    alt={item.UserData.name}
                                    src={`${MediaFilesUrl}${MediaFilesFolder}/${item.UserData.dp}`}
                                    sx={{ width: 40, height: 40 }}
                                />

                            </div>
                            <div className={Mstyles.NametextboxText}>
                                <div className={Mstyles.Nametextbox}>
                                    <span>{item.UserData.name} <small></small></span>
                                </div>
                                <div>
                                    <small className={Mstyles.timetext}>{item.formattedDate}</small>
                                </div>
                            </div>

                        </div>
                        <div className={Mstyles.FeedItemTopB}>
                            <div className={Mstyles.FeedItemMorebtn}>
                                <FiMoreVertical size={20} onClick={handleClick} />
                            </div>

                        </div>
                        <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}

                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&::before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                  <ReportPost PostData={item} />




                            </Menu>
                    </div>

                 
                    <div className={Mstyles.FeedItemMedium}>
                        <div>
                            <div> {item.PostData.PostText}</div>

                        </div>

                    </div>

                    <RrqFooterbox PostData={item} />
                </div>

            }

            )}
        </InfiniteScroll>
        </>
    );
}

export default Feedlist;
