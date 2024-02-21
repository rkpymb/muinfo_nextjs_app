import React, { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router'
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';


import Avatar from '@mui/material/Avatar';

import { FiArrowRightCircle, FiMoreVertical, FiMessageCircle, FiHeart, FiShare2 } from "react-icons/fi";
import Mstyles from '/Styles/mainstyle.module.css';
import { MediaFilesUrl, MediaFilesFolder, FeedimgFolder } from '/Data/config'
import Skeleton from '@mui/material/Skeleton';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

import Image from 'next/image';

import {
    FormControl,
    useTheme,

} from '@mui/material';



import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function Feedlist() {
    const Contextdata = useContext(CheckloginContext)
    const [PostText, setPostText] = useState('');
    const [PostStatus, setPostStatus] = useState(1);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [Btnloading, setBtnloading] = useState(false);
    const [CureentPost, setCureentPost] = useState(null);
    const [OpenEdit, setOpenEdit] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [StatusText, setStatusText] = React.useState('');

    const Dummydta = [
        {
            id: 1
        },
        {
            id: 2
        }
        ,
        {
            id: 3
        }
        ,
        {
            id: 4
        }
        ,
        {
            id: 5
        },
        {
            id: 4
        }
        ,
        {
            id: 5
        }
    ]

    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()
    const [Liked, setLiked] = useState([]);
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    const GetData = async () => {
        setIsLoading(true)

        const sendUM = { JwtToken: Contextdata.VendorJwtToken, }
        const data = await fetch("/api/V3/List/VGalarylist", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {

                console.log(parsed.ReqD.VGalarylist)
                setRetdata(parsed.ReqD.VGalarylist)
                setIsLoading(false)

            })
    }
    useEffect(() => {
        GetData()

    }, [router.query])


    const notify = (T) => toast(T, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

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
                        notify('Photo Removed ')
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
                            notify('Post Updated successfully ')
                            handleCloseEdit()
                            GetData()
                        }, 2000);


                    } else {
                        notify('Something Went Wrong ')
                    }
                })


        }

    }




    const theme = useTheme();

    return (<>
        <div>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <ToastContainer />
            {isLoading ? <div className={Mstyles.VGaleryGrid}>

                {Dummydta.map((item, index) => {
                    return <div className={Mstyles.VGaleryGridItem} key={index} >
                        <div className={Mstyles.CatGridItemA}>
                            <Skeleton variant="circular" width={40} height={40} />
                        </div>
                        <div style={{ minHeight: '10px' }}></div>
                        <div className={Mstyles.CatGridItemB}>
                            <Skeleton variant="text" sx={{ fontSize: '1rem', width: 100 }} />
                        </div>



                    </div>

                }

                )}
            </div> :
                <div>
                    {Retdata.length > 0 &&

                        <div>
                            <div  >
                                <div style={{ height: '20px' }}></div>
                            </div>
                            <div className={Mstyles.VGaleryGridTitle}>
                                <span>All Photos ({Retdata.length})</span>
                            </div>
                            <div style={{ height: '10px' }}></div>
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
                        </div>

                    }
                </div>

            }

        </div>


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
