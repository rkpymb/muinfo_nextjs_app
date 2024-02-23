
import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import CheckloginContext from '/context/auth/CheckloginContext'
import Mstyles from '/Styles/mainstyle.module.css'
import Skeleton from '@mui/material/Skeleton';
import { useRouter, useParams } from 'next/router'
import Button from '@mui/material/Button';
import { ShortAbout, AppName, SocialHandles, MediaFilesFolder, MediaFilesUrl } from '/Data/config'
import { Router } from 'next/router';
import { FiMessageCircle, FiChevronRight } from 'react-icons/fi';
import LoadingButton from '@mui/lab/LoadingButton';

import Avatar from '@mui/material/Avatar';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { FiArrowRightCircle } from "react-icons/fi";
const PostBoxUser = ({ PostData }) => {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)

    const [OpenModal, setOpenModal] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [Cmtlist, setCmtlist] = useState([]);
    const [CmtText, setCmtText] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [LoadingSubmitBtn, setLoadingSubmitBtn] = useState(false);


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

    ]





    const handleClickOpen = (scrollType) => () => {
        GetCmtlistData()
        setOpenModal(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const descriptionElementRef = React.useRef(null);

    React.useEffect(() => {
        if (OpenModal) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [OpenModal]);


    const GetCmtlistData = async () => {
        console.log(PostData.PostID)
        setIsLoading(true)

        const sendUM = {
            JwtToken: Contextdata.VendorJwtToken,
            PostID: PostData.PostID
        }
        const data = await fetch("/api/Vendor/RfqCmtlist", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
               
                setCmtlist(parsed.ReqD.CmtAllList)
                setIsLoading(false)
            })
    }

    const SubmitPost = async (e) => {
        e.preventDefault();

        if (CmtText !== '') {
            setLoadingSubmitBtn(true)
            const sendUM = {
                JwtToken: Contextdata.VendorJwtToken,
                CmtText: CmtText,
                PostData: PostData,

            }
            const data = await fetch("/api/Vendor/AddRfqCmt", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    setTimeout(function () {
                        setLoadingSubmitBtn(false)
                    }, 1000);
                    if (parsed.ReqData.done) {
                        GetCmtlistData()
                        setCmtText('')
                        Contextdata.ChangeAlertData('😍 Comment Added', 'success')
                    } else {
                        Contextdata.ChangeAlertData('😣 Something Went Wrong', 'warning')
                    }
                })
        }
    }

    const handleTextareaChange = (e) => {
        setCmtText(e.target.value);
    };


    return (
        <div>


            <div className={Mstyles.FeedBtnitem} onClick={handleClickOpen('paper')}>
                <div className={Mstyles.FeedBtnitemA}>
                    <FiMessageCircle size={20} />
                </div>
                <div className={Mstyles.FeedBtnitemB}>
                    Comments
                </div>
            </div>


            <React.Fragment>

                <Dialog
                    open={OpenModal}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">RFQ Comments</DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>

                        <div className={Mstyles.Cmtmain}>
                            <div >
                                <div className={Mstyles.PostBoxUserHeader}>
                                    <span>Add Your <span className={Mstyles.RedColor}>Comment</span></span>
                                    <small>Your Comment Will be Visible in Public</small>

                                </div>
                                <div className={Mstyles.PostBoxUserInput}>
                                    <textarea
                                        placeholder="Write your post here..."
                                        value={CmtText}
                                        autoFocus
                                        onChange={handleTextareaChange}
                                    />
                                </div>




                                <div style={{ marginTop: 20 }}></div>

                                <div className={Mstyles.PostBoxFotter}>
                                    <LoadingButton
                                        fullWidth
                                        onClick={SubmitPost}
                                        endIcon={<FiChevronRight />}
                                        loading={LoadingSubmitBtn}
                                        loadingPosition="end"
                                        className={Mstyles.MainBtn}
                                    >
                                        <span>Post Comment</span>
                                    </LoadingButton>


                                    <div style={{ marginTop: 10 }}></div>

                                    <small style={{ fontSize: '10px' }}>You agree to our <span className={Mstyles.url} onClick={() => router.push('/TermsConditions')}>Terms & Conditions</span> and <span className={Mstyles.url} onClick={() => router.push('/PrivacyPolicy')}>Privacy Policy</span></small>
                                    <div style={{ marginTop: 10 }}></div>
                                </div>


                            </div>


                            <div>
                                {isLoading ? <div>

                                    {Dummydta.map((item, index) => {
                                        return <div className={Mstyles.CmtlistItem} key={index} >
                                            <div className={Mstyles.CmtlistItemA}>
                                                <Skeleton variant="circular" width={30} height={30} />
                                            </div>
                                            <div className={Mstyles.CmtlistItemB}>
                                                <div className={Mstyles.CmttextboxUser}>
                                                    <Skeleton variant="text" animation="vawe" width={100} height={10} />

                                                </div>

                                                <div className={Mstyles.Cmttextbox}>
                                                    <Skeleton variant="text" animation="vawe" width={'100%'} height={10} />
                                                    <Skeleton variant="text" animation="vawe" width={'50%'} height={10} />
                                                </div>
                                            </div>
                                        </div>

                                    }

                                    )}
                                </div> :
                                    <div>
                                        {Cmtlist.map((item, index) => {
                                            return <div className={Mstyles.CmtlistItem} key={index} >
                                                <div className={Mstyles.CmtlistItemA}>
                                                    <Avatar
                                                        alt={item.UserData.name}
                                                        src={`${MediaFilesUrl}${MediaFilesFolder}/${item.UserData.dp}`}
                                                        sx={{ width: 30, height: 30 }}
                                                    />
                                                </div>
                                                <div className={Mstyles.CmtlistItemB}>
                                                    <div className={Mstyles.CmttextboxUser}>
                                                        <span>{item.UserData.name}</span>
                                                        <div className={Mstyles.linedevider}>|</div>
                                                        <small>{item.formattedDate}</small>
                                                    </div>

                                                    <div className={Mstyles.Cmttextbox}>
                                                        {item.CmtData.CmtData[0].Text}
                                                    </div>
                                                </div>



                                            </div>

                                        }

                                        )}
                                    </div>

                                }

                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>

                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </div>
    )
}

export default PostBoxUser
