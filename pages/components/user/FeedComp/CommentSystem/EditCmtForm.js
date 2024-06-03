import React, { useState, useEffect, useContext } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { FiChevronRight } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Mstyles from '/styles/mainstyle.module.css';
import CheckloginContext from '/context/auth/CheckloginContext';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';

import TextField from '@mui/material/TextField';

import { LuX } from "react-icons/lu";
const CommentForm = ({ PostData, OpenReplay, ReplayForMsg, socket, roomId, CloseReplay, MainCmt, OpenCmtEdit, ClickEditCmt, CloseEditCmt, EditCmt }) => {
    const [CmtText, setCmtText] = useState('');
    const [LoadingBtn, setLoadingBtn] = useState(false);
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
        if (CmtText.trim() !== '') {
            setLoadingBtn(true);
            try {
                const response = await fetch("/api/user/update_comment", {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ Text: CmtText, CmtData: EditCmt.CmtData })
                });
                const data = await response.json();

                const updatedData = { text: CmtText };
                if (data.ReqData.updated) {
                    const Data = data.ReqData.updated
                    socket.emit('CommentUpdated', { Data, roomId });
                
                }

            } catch (error) {
                console.error('Error updating comment:', error);
            } finally {
                setLoadingBtn(false);
            }
        } else {
            console.warn("Can't update with an empty text");
        }
    };



    useEffect(() => {
        setCmtText(EditCmt.CmtData.CmtData.Text)
    }, [EditCmt]);



    return (
        <div className={Mstyles.CommentForm}>
            {OpenCmtEdit &&


                <div className={Mstyles.ReplayBox}>
                    <div className={Mstyles.ReplayBoxTop}>
                        <div className={Mstyles.ReplayBoxTopA}>
                            <div>
                                <span style={{ fontWeight: 700 }}>Edit Comment </span>
                            </div>

                        </div>
                        <div className={Mstyles.ReplayBoxTopB}>
                            <IconButton
                                style={{ width: 40, height: 40, }}
                                onClick={CloseEditCmt}
                            >
                                <LuX />
                            </IconButton>

                        </div>
                    </div>

                </div>

            }


            <form onSubmit={AddCmt}>

                <div className={Mstyles.CmtWritebox}>
                    <TextField
                        required
                        placeholder='Edit your comment here'
                        fullWidth
                        value={CmtText}

                        onInput={e => setCmtText(e.target.value)}
                        InputProps={{
                            endAdornment: <IconButton

                                onClick={AddCmt}

                                pending={true}
                                desabled={LoadingBtn}

                            >
                                {LoadingBtn ?

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
