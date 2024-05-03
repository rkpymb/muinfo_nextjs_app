
import React, { useState, useEffect, useContext } from 'react';

import CheckloginContext from '/context/auth/CheckloginContext'
import Mstyles from '/styles/mainstyle.module.css'
import Skeleton from '@mui/material/Skeleton';
import { useRouter, useParams } from 'next/router'
import { BsChatSquareDots } from "react-icons/bs";
import Button from '@mui/material/Button';
import { ShortAbout, AppName, SocialHandles, MediaFilesFolder, MediaFilesUrl } from '/Data/config'
import { Router } from 'next/router';
import { FiMessageCircle, FiChevronRight } from 'react-icons/fi';
import LoadingButton from '@mui/lab/LoadingButton';

import Avatar from '@mui/material/Avatar';

import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Badge from '@mui/material/Badge';

import {

    styled
} from '@mui/material';

const PostBoxUser = ({ PostData }) => {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)

    const [OpenModal, setOpenModal] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [Cmtlist, setCmtlist] = useState([]);
    const [CmtText, setCmtText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [LoadingSubmitBtn, setLoadingSubmitBtn] = useState(false);




    const Dummydta = [
        {
            id: 1
        },
        {
            id: 2
        }

    ]



    const handleClickOpen = (scrollType) => () => {
        if (Contextdata.UserLogin) {

            GetCmtlistData()
            setOpenModal(true);
            setScroll(scrollType);
        } else {
            router.push('/account/user_login')
        }


    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const descriptionElementRef = React.useRef(null);

    useEffect(() => {
        if (OpenModal) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [OpenModal]);


    const GetCmtlistData = async () => {

        setIsLoading(true)

        const sendUM = {
            JwtToken: Contextdata.UserJwtToken,
            PostData: PostData
        }
        const data = await fetch("/api/user/post_cmt", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {

                setCmtlist(parsed.ReqData.CmtAllList)

                setTimeout(function () {
                    setIsLoading(false)
                }, 2000);
            })
    }



    const SubmitPost = async (e) => {
        e.preventDefault();

        if (CmtText !== '') {
            setLoadingSubmitBtn(true)
            const sendUM = {

                CmtText: CmtText,
                PostData: PostData,

            }
            const data = await fetch("/api/user/add_post_cmt", {
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
                    }, 2000);
                    if (parsed.ReqData.done) {
                        GetCmtlistData()
                        setCmtText('')
                        Contextdata.ChangeAlertData('Comment Added 😍', 'success')

                    } else {
                        Contextdata.ChangeAlertData('Something Went Wrong 😣', 'warning')


                    }


                })

        } else {
            Contextdata.ChangeAlertData(`Can't post Empty Comment 😣`, 'warning')
        }



    }

    const handleTextareaChange = (e) => {
        setCmtText(e.target.value);
    };

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));


    return (
        <div>


            <div className={Mstyles.FeedBtnitemA}>
                <IconButton aria-label="cart" onClick={handleClickOpen('paper')}>
                    <StyledBadge color="secondary" >
                        <Image
                            alt="i"
                            src='/svg/comment.svg'

                            height={30}
                            width={30}
                            blurDataURL={blurredImageData}
                            placeholder='blur'
                            style={{ objectFit: "cover" }}
                        />
                    </StyledBadge>
                </IconButton>


            </div>


            <React.Fragment>

                <Dialog
                    fullScreen={isMobile ? true : false}
                    open={OpenModal}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">Post Comments</DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>

                        <div>
                            <div>
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
                                    <div style={{ marginTop: 20 }}></div>
                                </div>


                            </div>


                            <div>
                                {isLoading ? <div>
                                    {Dummydta.map((item, index) => {
                                        return <div key={index} style={{ marginBottom: '20px' }}>
                                            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
                                            <div style={{ height: '5px' }}></div>
                                            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '50%' }} />
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
                                                        <span>{item.CmtData.CmtData.Text}</span>
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
