import React, { useState, useEffect, useContext } from 'react';
import Skeleton from '@mui/material/Skeleton';
import {
    Typography,
    Box,

    Button,
    styled
} from '@mui/material';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { FiChevronRight, FiEdit } from 'react-icons/fi';
import Input from '@mui/material/Input';

const ariaLabel = { 'aria-label': 'description' };

import Image from 'next/image';

import { CiVideoOn, CiImageOn } from "react-icons/ci";
import IconButton from '@mui/material/IconButton';

import Avatar from '@mui/material/Avatar';
import CheckloginContext from '/context/auth/CheckloginContext'


import Mstyles from '/Styles/mainstyle.module.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import { useRouter, useParams } from 'next/router'


import UploadFiles from '../Upload/UploadFiles'



const PostBox = () => {

    const router = useRouter()
    const [Loading, setLoading] = useState(true);
    const [LoadingSubmitPost, setLoadingSubmitPost] = useState(false);
    const [DesabledButon, setDesabledButon] = useState(true);
    const [PostText, setPostText] = useState('');
   

    const Contextdata = useContext(CheckloginContext)
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';


    const notify = (T) => toast(T, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    useEffect(() => {
        if (Contextdata.VendorLogin == true) {
            setLoading(false)
        }
    }, [router.query, Contextdata.VendorLogin]);

    const SubmitPost = async (e) => {
        e.preventDefault();
        let FinalFileName = document.querySelector('#Feedfilename').value

        if (FinalFileName !== '') {
            setLoadingSubmitPost(true)
            const sendUM = {
                JwtToken: Contextdata.VendorJwtToken,
                PostFile: FinalFileName,
                PostText: PostText,
            }
            const data = await fetch("/api/Vendor/Auth/CreateFeedPost", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    setLoadingSubmitPost(false)
                    if (parsed.ReqData.done) {
                        setPostText('')
                        document.getElementById("Feedfilename").value = '';
                        notify('😍 Post Published ')

                        router.push('/Vendor/Dashboard/')
                    } else {
                        notify('Something Went Wrong ')
                    }




                })

        } else {

            notify('Please Upload Photo or Video to publish feed ')
        }


    }
    return (
        <div>
            <ToastContainer
                position="top-right"
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
            <div className={Mstyles.PostBoxVendor}>
                <div className={Mstyles.PostBoxMain}>
                    <div className={Mstyles.PostBoxMainA}>
                        <div className={Mstyles.PostUserbox}>
                            <div className={Mstyles.PostUserboxA}>
                                {Loading ?
                                    <div>
                                        <Skeleton variant="circular" width={40} height={40} />

                                    </div> : <Avatar
                                        alt={Contextdata.VendorData.name}
                                        src={`${MediaFilesUrl}${MediaFilesFolder}/${Contextdata.VendorData.dp}`}
                                        sx={{ width: 40, height: 40 }}
                                    />


                                }


                            </div>
                            <div className={Mstyles.PostUserboxB}>
                                <div>
                                    {Loading ?
                                        <div>

                                            <Skeleton variant="text" sx={{ fontSize: '1rem', width: 150 }} />
                                        </div> : <span>Create Feed Post</span>
                                    }


                                </div>
                                <div>
                                    {Loading ?
                                        <div>

                                            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '60%' }} />
                                        </div> : <small>post as <span className={Mstyles.primaryColor}> @{Contextdata.VendorData.username}</span></small>
                                    }


                                </div>

                            </div>

                        </div>
                    </div>
                    <div className={Mstyles.PostBoxMainB}>
                        <form onSubmit={SubmitPost}>
                            <div className={Mstyles.PostTextBox}>
                                <TextField
                                    id="standard-multiline-static"
                                    label="Write your Post"
                                    multiline
                                    rows={5}
                                    placeholder="Post your Talent and Services"
                                    fullWidth
                                    variant="standard"
                                    value={PostText}

                                    onChange={(e) => setPostText(e.target.value)}
                                />
                            </div>
                            <input type='hidden' id='Feedfilename' />
                        </form>



                        <div className={Mstyles.PostFooterbox}>
                            <div className={Mstyles.PostFooterboxA}>
                                {Loading ?
                                    <div>
                                        <Skeleton variant="text" style={{ height: 60, width: 100 }} />
                                    </div> :
                                    <div>
                                        <UploadFiles />

                                    </div>

                                }
                            </div>
                            <div className={Mstyles.PostFooterboxB}>

                                {Loading ?
                                    <div>
                                        <Skeleton variant="text" style={{ height: 60, width: 100 }} />
                                    </div> :
                                    <LoadingButton
                                        fullWidth
                                        onClick={SubmitPost}
                                        endIcon={<FiChevronRight />}
                                        loading={LoadingSubmitPost}
                                        loadingPosition="end"
                                        variant="contained"

                                    >
                                        <span>Publish</span>
                                    </LoadingButton>

                                }




                            </div>


                        </div>


                    </div>


                </div>

            </div>
        </div>
    )
}

export default PostBox
