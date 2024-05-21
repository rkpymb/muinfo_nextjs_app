import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Mstyles from '/styles/mainstyle.module.css';

const EditCommentForm = ({ initialText, onUpdate, onCancel, comment }) => {
    const [editedText, setEditedText] = useState(initialText);
    const [loadingBtn, setLoadingBtn] = useState(false);

    const handleEditSubmit = async () => {
        if (editedText.trim() !== '') {
            setLoadingBtn(true);
            try {
                const response = await fetch("/api/user/update_comment", {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ Text: editedText, CmtData: comment.CmtData })
                });
                const data = await response.json();

                const updatedData = { text: editedText }; // Replace with actual response
                if(data.ReqData.updated){
                    onUpdate(data.ReqData.updated); // Update comment data in parent component
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

    return (
        <div className={Mstyles.Editcmtbox}>


            <div className={Mstyles.PostBoxUserInput}>
                <textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    rows="3"
                    cols="50"
                    placeholder='write reply'
                />
            </div>
            <div className={Mstyles.EditcmtboxFooter}>
            <LoadingButton
                onClick={handleEditSubmit}
                loading={loadingBtn}
                desabled={loadingBtn}
                loadingPosition="end"
                variant="outlined"
                size='small'
            >
                Update
            </LoadingButton>
            <div style={{width:'10px'}}></div>

            <LoadingButton
                onClick={onCancel}
                loading={loadingBtn}
                loadingPosition="end"
                variant="text"
                size='small'
            >
                Cancel
            </LoadingButton>
            </div>
           
           
        </div>
    );
};

export default EditCommentForm;
