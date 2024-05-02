import React, { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router'

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';

import CheckloginContext from '/context/auth/CheckloginContext'
import { LuEye } from "react-icons/lu";

import ReportPost from './ReportPost'

import Avatar from '@mui/material/Avatar';

import { FiArrowRightCircle, FiMoreVertical, FiMessageCircle, FiHeart, FiShare2 } from "react-icons/fi";
import Mstyles from '/styles/mainstyle.module.css';


import { MediaFilesUrl, MediaFilesFolder, DomainURL } from '/Data/config'

const FeedTopbox = ({ PostData }) => {

    const router = useRouter()
    const [PostText, setPostText] = useState('');
    const [PostStatus, setPostStatus] = useState(1);
    const Contextdata = useContext(CheckloginContext)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [Btnloading, setBtnloading] = useState(false);
    const [ShowData, setShowData] = useState(false);
    const [MData, setMData] = useState();
    const [OpenEdit, setOpenEdit] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [StatusText, setStatusText] = React.useState('');


    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (OpenEdit) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [OpenEdit]);


    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    useEffect(() => {
        setShowData(true)
    }, [router.query]);




    return (
        <div>
            {ShowData &&
                <div>
                    <div className={Mstyles.FeedItemTop}>
                        <div className={Mstyles.FeedItemTopA}>
                            <div className={Mstyles.FeedItemAvatar}>
                                <Avatar
                                    alt={PostData.Profile.name}
                                    src={`${MediaFilesUrl}${MediaFilesFolder}/${PostData.Profile.dp}`}
                                    sx={{ width: 40, height: 40 }}
                                />
                            </div>
                            <div className={Mstyles.NametextboxText}>
                                <div className={Mstyles.Nametextbox}>
                                    <span>{PostData.Profile.name} </span>

                                </div>
                                <div>
                                <small className={Mstyles.Cattagboxtext} onClick={() => router.push(`/feeds/interests/${PostData.PostData.CatData.category}`)}>{PostData.CatData.title}</small> 🔸 <small className={Mstyles.timetext}>{PostData.formattedDate}  </small>
                                </div>
                            </div>

                        </div>
                        <div className={Mstyles.FeedItemTopB}>
                            <div className={Mstyles.FeedItemMorebtn}>
                                <FiMoreVertical size={20} onClick={handleClick} />
                            </div>

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
                        <MenuItem onClick={() => router.push(`${DomainURL}p/${PostData.PostData.PostID}`)}>
                            <ListItemIcon>
                                <LuEye />
                            </ListItemIcon>
                            View Post
                        </MenuItem>

                        

                        <ReportPost PostData={PostData} />

                    </Menu>
                </div>
            }








        </div>
    );
};

export default FeedTopbox;
