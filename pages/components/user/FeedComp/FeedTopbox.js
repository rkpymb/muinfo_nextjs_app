import React, { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router'

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';

import CheckloginContext from '/context/auth/CheckloginContext'
import { LuEye, LuPencilLine, LuTrash2 } from "react-icons/lu";

import ReportPost from './ReportPost'
import PostAdminMenu from './PostAdminMenu'

import Avatar from '@mui/material/Avatar';

import { FiArrowRightCircle, FiMoreVertical, FiMessageCircle, FiHeart, FiShare2 } from "react-icons/fi";
import Mstyles from '/styles/mainstyle.module.css';


import { MediaFilesUrl, MediaFilesFolder, DomainURL } from '/Data/config'

const FeedTopbox = ({ PostData }) => {

    const router = useRouter()

    const Contextdata = useContext(CheckloginContext)
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [ShowData, setShowData] = useState(false);

    const [OpenEdit, setOpenEdit] = React.useState(false);


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


    const ViewPost = async (PostData) => {

        if (Contextdata.AppMode) {
           
            if (PostData.PostData.PostID) {
                const PostID = PostData.PostData.PostID
                window.open(`/post_view/${PostID}`, '_blank');
            }
        } else {
            router.push(`${DomainURL}p/${PostData.PostData.PostID}`)
        }

    }

    return (
        <div>
            {ShowData &&
                <div>
                    <div className={Mstyles.FeedItemTop}>
                        <div className={Mstyles.FeedItemTopA}>
                            <div className={Mstyles.FeedItemAvatar}>
                                <Avatar
                                    alt={'M'}
                                    src={`${MediaFilesUrl}${MediaFilesFolder}/${PostData.Profile.dp}`}
                                    sx={{ width: 40, height: 40 }}
                                />
                            </div>
                            <div className={Mstyles.NametextboxText}>
                                <div className={Mstyles.Nametextbox}>
                                    <span>Magadh University Info</span>  | 
                                    <small onClick={() => router.push(`/feeds/interests/${PostData.PostData.CatData.category}`)}> {PostData.CatData.title}</small>
                                </div>
                               
                                <div className={Mstyles.Cattagboxtext}>
                                    
                                   
                                    <div className={Mstyles.CattagboxtextB}>
                                        <span className={Mstyles.timetext}>{PostData.Profile.name}  </span>
                                    </div>
                                    <div className={Mstyles.LineDevider}>
                                    ●
                                    </div>

                                    <div className={Mstyles.CattagboxtextB}>
                                        <span className={Mstyles.timetext}>{PostData.formattedDate}  </span>
                                    </div>

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
                        <MenuItem  onClick={() => ViewPost(PostData)}>
                            <ListItemIcon>
                                <LuEye />
                            </ListItemIcon>
                            View Post
                        </MenuItem>



                        <PostAdminMenu PostData={PostData} />
                        <ReportPost PostData={PostData} />


                    </Menu>
                </div>
            }








        </div>
    );
};

export default FeedTopbox;
