import React, { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router'

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import InputLabel from '@mui/material/InputLabel';
import { LuChevronRight } from "react-icons/lu";
import Select from '@mui/material/Select';
import CheckloginContext from '/context/auth/CheckloginContext'
import { LuTrash2, LuPencilLine, LuEye } from "react-icons/lu";
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';

import { FiArrowRightCircle, FiMoreVertical, FiMessageCircle, FiHeart, FiShare2 } from "react-icons/fi";
import Mstyles from '/Styles/mainstyle.module.css';


import {
    FormControl,
} from '@mui/material';


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { MediaFilesUrl, MediaFilesFolder, DomainURL } from '/Data/config'

const FeedTopbox = ({ PostData }) => {
    const router = useRouter()
    const [PostText, setPostText] = useState('');
    const [PostStatus, setPostStatus] = useState(1);
    const Contextdata = useContext(CheckloginContext)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [Btnloading, setBtnloading] = useState(false);
    const [OpenEdit, setOpenEdit] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [StatusText, setStatusText] = React.useState('');
    const [Loading, setLoading] = useState(true);

    const handleOpenEdit = (scrollType) => () => {
        setPostStatus(PostData.PostData.isActive)
        setPostText(PostData.PostData.PostText)
        if (PostData.PostData.isActive === 1) {
            setStatusText('Private')
        }
        if (PostData.PostData.isActive === 2) {
            setStatusText('Draft')
        }
        if (PostData.PostData.isActive === 3) {
            setStatusText('Public')
        }
        setOpenEdit(true);
        setScroll(scrollType);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const UpdatePost = async () => {
        if (confirm("Do you Really Want to Update this post") == true) {
            setBtnloading(true);
            const sendUM = {
                JwtToken: Contextdata.VendorJwtToken,
                id: PostData.PostData._id,
                isActive: PostStatus,
                PostText: PostText,
                StatusText: StatusText,


            }
            const data = await fetch("/api/Vendor/UpdatePost", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    if (parsed.ReqData.done) {


                        setTimeout(function () {
                            setBtnloading(false);
                            notify('Post Updated successfully ')

                            Contextdata.ChangeAlertData('Post Published 😍', 'success')
                            handleCloseEdit()
                            window.location.reload()
                        }, 2000);


                    } else {
                        notify('Something Went Wrong ')
                    }
                })


        }

    }

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

        setLoading(false)

    }, [router.query]);

    const DeletePost = async () => {
        if (confirm("Do you Really Want to Delete this post") == true) {
            handleClose()
            const sendUM = {
                JwtToken: Contextdata.VendorJwtToken,
                id: PostData.PostData._id,
            }
            const data = await fetch("/api/Vendor/DeleteFeedPost", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    if (parsed.ReqData.done) {
                        notify('Post Removed ')
                        setTimeout(function () {
                            router.push('/Vendor/Dashboard/')
                        }, 2000);

                    } else {
                        notify('Something Went Wrong ')
                    }
                })


        }

    }


    const handleChangePstatus = (event) => {
        setPostStatus(event.target.value);
    };

    return (
        <div>

            {!Loading &&
                <div>
                    <div className={Mstyles.FeedItemTop}>
                        <div className={Mstyles.FeedItemTopA} onClick={() => router.push(`/v/${PostData.VendorData.username}`)}>
                            <div className={Mstyles.FeedItemAvatar}>
                                <Avatar
                                    alt={PostData.VendorData.name}
                                    src={`${MediaFilesUrl}${MediaFilesFolder}/${PostData.VendorData.dp}`}
                                    sx={{ width: 40, height: 40 }}
                                />
                            </div>
                            <div className={Mstyles.NametextboxText}>
                                <div className={Mstyles.Nametextbox}>
                                    <span>{PostData.VendorData.name}  <small>@{PostData.VendorData.username}</small></span>

                                </div>
                                <div>
                                    <small className={Mstyles.timetext}>{PostData.formattedDate}</small>
                                </div>
                            </div>

                        </div>
                        <div className={Mstyles.FeedItemTopB}>
                            <div className={Mstyles.FeedItemMorebtn}>
                                <FiMoreVertical size={20} onClick={handleClick} />
                            </div>

                        </div>

                    </div>
                </div>

            }

            {!Loading &&

                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
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
                    <MenuItem onClick={() => router.push(`${DomainURL}post/${PostData.PostData.PostID}`)}>
                        <ListItemIcon>
                            <LuEye />
                        </ListItemIcon>
                        View Post
                    </MenuItem>
                    <MenuItem onClick={handleOpenEdit('paper')}>
                        <ListItemIcon>
                            <LuPencilLine />
                        </ListItemIcon>
                        Edit
                    </MenuItem>
                    <MenuItem onClick={DeletePost}>
                        <ListItemIcon>
                            <LuTrash2 />
                        </ListItemIcon>
                        Delete
                    </MenuItem>

                </Menu>
            }
            {!Loading &&
                <Dialog
                    open={OpenEdit}
                    onClose={handleCloseEdit}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">Edit Post</DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                        <form onSubmit={UpdatePost}>

                            <div className={Mstyles.PostTextBox}>
                                <TextField
                                    id="standard-multiline-static"
                                    label="Photo Description"
                                    multiline
                                    rows={5}
                                    placeholder="write Photo Description"
                                    fullWidth
                                    variant="standard"
                                    value={PostText}
                                    onChange={(e) => setPostText(e.target.value)}
                                />
                            </div>
                            <div className={Mstyles.inputlogin}>
                                <FormControl fullWidth required>
                                    <InputLabel id="demo-simple-select-label">Post Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={PostStatus}
                                        label="Profile Type"
                                        onChange={handleChangePstatus}
                                    >
                                        <MenuItem value={1}>Private</MenuItem>
                                        <MenuItem value={2}>Draft</MenuItem>
                                        <MenuItem value={3}>Public</MenuItem>

                                    </Select>
                                </FormControl>
                            </div>
                            <input type='hidden' id='Feedfilename' />
                        </form>

                    </DialogContent>
                    <DialogActions>

                        <div className={Mstyles.Postupdatefotter}>
                            <Button onClick={handleCloseEdit}>Cancel</Button>

                            <LoadingButton
                                fullWidth

                                onClick={UpdatePost}
                                endIcon={<LuChevronRight />}
                                loading={Btnloading}
                                loadingPosition="end"
                                variant="contained"
                            >
                                <span>Update Post</span>
                            </LoadingButton>

                        </div>
                    </DialogActions>
                </Dialog>


            }






        </div>
    );
};

export default FeedTopbox;
