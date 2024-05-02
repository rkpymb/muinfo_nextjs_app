
import React, { useState, useEffect, useContext } from 'react';

import CheckloginContext from '/context/auth/CheckloginContext'
import Mstyles from '/styles/mainstyle.module.css'
import Skeleton from '@mui/material/Skeleton';
import { useRouter, useParams } from 'next/router'
import { LuFlag, LuShare2, LuStar, LuEye } from "react-icons/lu";
import Button from '@mui/material/Button';
import { ShortAbout, AppName, SocialHandles, MediaFilesFolder, MediaFilesUrl } from '/Data/config'
import { Router } from 'next/router';
import { FiMessageCircle, FiChevronRight } from 'react-icons/fi';
import LoadingButton from '@mui/lab/LoadingButton';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';


import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';


import {
    FormControl,
    TextField,


} from '@mui/material';

const PostBoxUser = ({ PostData }) => {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)

    const [OpenModal, setOpenModal] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
   
    const [ReportText, setReportText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [LoadingSubmitBtn, setLoadingSubmitBtn] = useState(false);
    const [RType, setRType] = useState('');




    const handleClickOpen = (scrollType) => () => {
        if (Contextdata.UserLogin) {

            setOpenModal(true);
        setScroll(scrollType);
        } else {
            router.push('/account/user_login')
        }
       
    };

    const handleCloseModal = () => {
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

    const ChangeReportTYpe = (event) => {
        setRType(event.target.value);
    };




    const SubmitPost = async (e) => {
        e.preventDefault();

        if (ReportText !== '' && RType !== '') {
            setLoadingSubmitBtn(true)
            const sendUM = {
                JwtToken: Contextdata.UserJwtToken,
                PostData: PostData,
                ReportType: RType,
                ReportText: ReportText,

            }
            const data = await fetch("/api/user/report_post", {
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
                        Contextdata.ChangeAlertData(parsed.ReqData.done, 'success')
                        handleCloseModal()
                        setRType('')
                        setReportText('')
                       

                    } else {
                        Contextdata.ChangeAlertData('Something Went Wrong 😣', 'warning')


                    }


                })

        } else {
            Contextdata.ChangeAlertData(`All Fields are required`, 'warning')
        }

    }

    const handleTextareaChange = (e) => {
        setReportText(e.target.value);
    };


    return (
        <div>
            <MenuItem onClick={handleClickOpen('paper')}>
                <ListItemIcon>
                    <LuFlag />
                </ListItemIcon>
                Report
            </MenuItem>

            <React.Fragment>

                <Dialog
                    open={OpenModal}
                    onClose={handleCloseModal}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">Report</DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>

                        <div>
                            <div>
                                <div className={Mstyles.PostBoxUserHeader}>
                                    <span>Every <span className={Mstyles.RedColor}> Report</span> is  <span className={Mstyles.primaryColor}> Important</span> to us.</span>
                                    <small>If someone is in immediate danger, get help before reporting to Facebook. Don't wait.</small>

                                </div>

                                <div className={Mstyles.inputlogin}>
                                    <FormControl fullWidth>
                                        <InputLabel>Select a Problem</InputLabel>
                                        <Select

                                            value={RType}
                                            label="Select a Problem"
                                            onChange={ChangeReportTYpe}
                                        >
                                            <MenuItem value="False Information">False Information</MenuItem>
                                            <MenuItem value="Spam">Spam</MenuItem>
                                            <MenuItem value="Unauthorized Sales">Unauthorized Sales</MenuItem>
                                            <MenuItem value="Hate Speech">Hate Speech</MenuItem>
                                            <MenuItem value="Nudity">Nudity</MenuItem>
                                            <MenuItem value="Violence">Violence</MenuItem>
                                            <MenuItem value="Harassment">Harassment</MenuItem>
                                            <MenuItem value="Involves a child">Involves a child</MenuItem>
                                            <MenuItem value="Terrorism">Terrorism</MenuItem>
                                            <MenuItem value="Suicide or self-injury">Suicide or self-injury</MenuItem>
                                            <MenuItem value="Something else">Something else</MenuItem>

                                        </Select>
                                    </FormControl>
                                </div>
                                <div className={Mstyles.PostBoxUserInput}>
                                    <textarea
                                        placeholder="Write Description  here..."
                                        value={ReportText}
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
                                        <span>Submit Report</span>
                                    </LoadingButton>





                                    <small style={{ fontSize: '10px' }}>You agree to our <span className={Mstyles.url} onClick={() => router.push('/TermsConditions')}>Terms & Conditions</span> and <span className={Mstyles.url} onClick={() => router.push('/PrivacyPolicy')}>Privacy Policy</span></small>

                                </div>


                            </div>



                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal}>Close</Button>

                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </div>
    )
}

export default PostBoxUser
