import React, { useState, useContext } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { FiChevronRight } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Mstyles from '/styles/mainstyle.module.css';
import CheckloginContext from '/context/auth/CheckloginContext';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';

import TextField from '@mui/material/TextField';

import { LuX } from "react-icons/lu";
const CommentForm = ({ PostData, OpenReplay, ReplayForMsg, socket, roomId, CloseReplay,MainCmt }) => {
    const [CmtText, setCmtText] = useState('');
    const [LoadingSubmitBtn, setLoadingSubmitBtn] = useState(false);
    const Contextdata = useContext(CheckloginContext);
    const router = useRouter();

    const handleTextareaChange = (e) => {
        setCmtText(e.target.value);
    };

    const SendSoketMsg = (SoketData) => {
      
        socket.emit('NewComment', { SoketData, roomId });
    };

    const AddCmt = async (e) => {
        e.preventDefault();
        if (OpenReplay) {
            SendCmtReplay()
        } else {
            SendCmt()
        }
    };
    const SendCmt = async () => {
       

        if (CmtText.trim() !== '') {
            setLoadingSubmitBtn(true);
            const sendUM = { CmtText, PostData };

            const data = await fetch("/api/user/add_post_cmt", {
                method: "POST",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(sendUM)
            }).then((a) => a.json()).then((parsed) => {
                setLoadingSubmitBtn(false);
                if (parsed.ReqData.done) {
                    const SoketData = parsed.ReqData.NewCmt
                    SendSoketMsg(SoketData)

                    
                    setCmtText('');
                    Contextdata.ChangeAlertData('Comment Added 😍', 'success');
                } else {
                    Contextdata.ChangeAlertData('Something Went Wrong 😣', 'warning');
                }
            });
        }
    };
    const SendCmtReplay = async () => {

        if (CmtText.trim() !== '') {
            setLoadingSubmitBtn(true);
            try {
                const response = await fetch("/api/user/add_cmt_replay", {
                    method: "POST",
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({ CmtText: CmtText, PostData, 
                        ParentCmt: { 
                            ParentCmtID: ReplayForMsg.CmtData.CmtID,
                            MainCmt: MainCmt
                        } 
                    
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                if (data && data.ReqData.done) {
                    setLoadingSubmitBtn(false);
                    const SoketData = data.ReqData.NewCmt;
                    SendSoketMsg(SoketData);
                    setCmtText('');
                    CloseReplay()
                } else {
                    console.error('Error adding reply:', data.message || 'Unknown error');
                }
            } catch (error) {
                console.error('Error adding reply:', error);
            }

        }

    };



    return (
        <div className={Mstyles.CommentForm}>
            {OpenReplay &&


                <div className={Mstyles.ReplayBox}>
                    <div className={Mstyles.ReplayBoxTop}>
                        <div className={Mstyles.ReplayBoxTopA}>
                            <div>
                                <span>Replying to </span> <span style={{ fontWeight: 700 }}> {ReplayForMsg && ReplayForMsg.UserData.name}</span>
                            </div>

                        </div>
                        <div className={Mstyles.ReplayBoxTopB}>
                            <IconButton
                                style={{ width: 40, height: 40, }}
                                onClick={CloseReplay}
                            >
                                <LuX />
                            </IconButton>

                        </div>
                    </div>
                    <div className={Mstyles.ReplayMsgFor}>
                        {ReplayForMsg && ReplayForMsg.CmtData.CmtData.Text}
                    </div>


                </div>

            }


            <form onSubmit={AddCmt}>

                <div className={Mstyles.CmtWritebox}>
                    <TextField
                        required
                        placeholder='Write your comment here'
                        fullWidth
                        value={CmtText}

                        onInput={e => setCmtText(e.target.value)}
                        InputProps={{
                            endAdornment: <IconButton

                                onClick={AddCmt}

                                pending={true}
                                desabled={LoadingSubmitBtn}

                            >
                                {LoadingSubmitBtn ?

                                    <div >
                                        <CircularProgress color="secondary" size="1rem" />
                                    </div> : <FiChevronRight />
                                }


                            </IconButton>
                        }}

                    />
                </div>

            </form>


        </div>
    );
};

export default CommentForm;
