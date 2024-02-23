import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import InfiniteScroll from 'react-infinite-scroll-component';

import Mstyles from '/Styles/mainstyle.module.css';
import { MediaFilesUrl, MediaFilesFolder,FeedimgFolder } from '/Data/config';
import CheckloginContext from '/context/auth/CheckloginContext';
import CircularProgress from '@mui/material/CircularProgress';

import ReportPost from '../../../pages/components/FeedVendor/ReportPost'

import { LuTrash2, LuPencilLine, LuEye, LuChevronRight } from "react-icons/lu";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import {
    FormControl,
    useTheme,

} from '@mui/material';



function Feedlist() {
    const Contextdata = useContext(CheckloginContext);
    const router = useRouter();
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [Btnloading, setBtnloading] = useState(false);
    const [CureentPost, setCureentPost] = useState(null);
    const [OpenEdit, setOpenEdit] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [StatusText, setStatusText] = React.useState('');
    const [PostText, setPostText] = useState('');
    const [PostStatus, setPostStatus] = useState(1);
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    const [limit, setlimit] = useState(5);

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);




    const handleChangePstatus = (event) => {
        setPostStatus(event.target.value);
    };

    const HandleOpenEdit = async (itemData) => {
        setCureentPost(itemData)

        setPostStatus(itemData.isActive)
        setPostText(itemData.PostText)
        if (itemData.isActive === 1) {
            setStatusText('Private')
        }
        if (itemData.isActive === 2) {
            setStatusText('Draft')
        }
        if (itemData.isActive === 3) {
            setStatusText('Public')
        }
        setOpenEdit(true);

        

    }


    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

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
        const data = await fetch("/api/Vendor/VGalarylist", {
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



    const UpdatePost = async (itemData) => {
        if (confirm("Do you Really Want to Update this post") == true) {
            setBtnloading(true);
            const sendUM = {
                JwtToken: Contextdata.VendorJwtToken,
                id: CureentPost._id,
                isActive: PostStatus,
                PostText: PostText,
                StatusText: StatusText,


            }
            const data = await fetch("/api/Vendor/UpdatePhoto", {
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
                        
                            Contextdata.ChangeAlertData('Photo Updated successfully', 'success')
                            handleCloseEdit()
                            GetData()
                        }, 2000);


                    } else {
                       
                        Contextdata.ChangeAlertData('Something went wrong 😒', 'warning')
                    }
                })


        }

    }

    const DeletePost = async (itemData) => {
        if (confirm("Do you Really Want to Delete this Photo") == true) {

            const sendUM = {
                JwtToken: Contextdata.VendorJwtToken,
                id: itemData._id,
            }
            const data = await fetch("/api/Vendor/DeletePhoto", {
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
                        Contextdata.ChangeAlertData('Photo Removed', 'success')
                        
                        setTimeout(function () {
                            router.push('/Vendor/Dashboard?Tabindex=2')
                        }, 2000);

                    } else {
                        Contextdata.ChangeAlertData('Something Went Wrong 😒', 'warning')
                    }
                })


        }

    }


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
            <div className={Mstyles.VGaleryGrid}>
                {Retdata.map((item, index) => {
                    return <div className={Mstyles.VGaleryGridItem} key={index} >
                        <div className={Mstyles.VGaleryGridItemImage}>


                            <Image
                                src={`${MediaFilesUrl}${FeedimgFolder}/${item.PostList[0].postData}`}
                                alt=""
                                fill
                                blurDataURL={blurredImageData}
                                placeholder='blur'
                                style={{ objectFit: "cover" }}
                            />
                            <div className={Mstyles.VGaleryGridFlott}>
                                <IconButton
                                    onClick={() => HandleOpenEdit(item)}
                                    aria-label="toggle password visibility"
                                    style={{ width: 40, height: 40, color: 'white' }}
                                >
                                    <LuPencilLine size={20} />
                                </IconButton>
                                <div style={{ width: '10px' }}></div>
                                <IconButton
                                    onClick={() => DeletePost(item)}
                                    aria-label="toggle password visibility"
                                    style={{ width: 40, height: 40, color: 'white' }}
                                >
                                    <LuTrash2 size={20} />
                                </IconButton>
                            </div>
                        </div>




                    </div>

                }

                )}



            </div>
        </InfiniteScroll>
        
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
        </>
    );
}

export default Feedlist;
