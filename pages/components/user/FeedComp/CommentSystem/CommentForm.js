import React, { useState, useContext } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { FiChevronRight } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Mstyles from '/styles/mainstyle.module.css';
import CheckloginContext from '/context/auth/CheckloginContext';

const CommentForm = ({ PostData, getCommentsData, socket, roomId }) => {
    const [CmtText, setCmtText] = useState('');
    const [LoadingSubmitBtn, setLoadingSubmitBtn] = useState(false);
    const Contextdata = useContext(CheckloginContext);
    const router = useRouter();

    const handleTextareaChange = (e) => {
        setCmtText(e.target.value);
    };

    const SendSoketMsg = (SoketData) => {
        if (CmtText.trim() !== '') {
            socket.emit('NewComment', { SoketData, roomId });
            setCmtText('');
          }
    };

    const AddCmt = async (e) => {
        e.preventDefault();

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
        } else {
            Contextdata.ChangeAlertData(`Can't post Empty Comment 😣`, 'warning');
        }
    };

    return (
        <div>
            <div className={Mstyles.PostBoxUserHeader}>
                <span>Add Your <span className={Mstyles.RedColor}>Comment</span></span>
                <small>Your Comment Will be Visible in Public</small>
            </div>
            <div className={Mstyles.PostBoxUserInput}>
                <textarea
                    placeholder="Write your comment here..."
                    value={CmtText}
                    autoFocus
                    onChange={handleTextareaChange}
                />
            </div>
            <div style={{ marginTop: 20 }}></div>
            <div className={Mstyles.PostBoxFotter}>
                <LoadingButton
                    fullWidth
                    onClick={AddCmt}
                    endIcon={<FiChevronRight />}
                    loading={LoadingSubmitBtn}
                    loadingPosition="end"
                    className={Mstyles.MainBtn}
                    variant='outlined'
                >
                    <span>Post Comment</span>
                </LoadingButton>
                <div style={{ marginTop: 10 }}></div>
                <small style={{ fontSize: '10px' }}>
                    You agree to our
                    <span className={Mstyles.url} onClick={() => router.push('/terms_and_conditions')}> Terms & Conditions </span>
                    <span> & </span>
                    <span className={Mstyles.url} onClick={() => router.push('/privacy_policy')}> Privacy Policy</span>
                </small>
                <div style={{ marginTop: 20 }}></div>
            </div>
        </div>
    );
};

export default CommentForm;
