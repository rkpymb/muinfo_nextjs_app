// EditComment.js
import React, { useState, useEffect, useContext } from 'react';
import { LuPlus, LuX, LuPencilLine, LuTrash2 } from "react-icons/lu";
import Mstyles from '/styles/mainstyle.module.css'
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { FiChevronRight, FiEdit } from 'react-icons/fi';
import IconButton from '@mui/material/IconButton';
import CheckloginContext from '/context/auth/CheckloginContext'
const EditComment = ({ isOpen, item, handleClose,updateComment }) => {
    const [Text, setText] = useState();
    const [order, setOrder] = useState();
    const [slug, setSlug] = useState();
    const [LoadingBtn, setLoadingBtn] = useState(false);
    const Contextdata = useContext(CheckloginContext)
    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    useEffect(() => {
      
        setText(item.CmtData.Text || item.CmtData.CmtData.Text)
        setSlug(item.slug)
        setOrder(item.order)
    }, [item]);

    const EditData = async (e) => {
        e.preventDefault();
        if (Text !== null && Text !== '') {
            setLoadingBtn(true)

            const sendUM = {
                Text: Text,
                item: item,

            }
            const data = await fetch("/api/user/update_comment", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    setLoadingBtn(false)
                    if (parsed.ReqData.done) {
                        Contextdata.ChangeAlertData(`Comment Updated`, 'success');
                        updateComment(parsed.ReqData.updated);
                        handleClose()
                    } else {
                        Contextdata.ChangeAlertData(`Something Went Wrong`, 'warning');
                    }
                })
        }
        
    }


    return (
        <div className={Mstyles.EditCmtBox} style={{ display: isOpen ? 'block' : 'none' }}>

            <form onSubmit={EditData} className={Mstyles.fadeinAnimation}>
                <div>


                    <textarea
                        placeholder="Write your comment here..."
                        required
                        label="Category Text"
                        value={Text}
                        className={Mstyles.cmttextarea}
                        onInput={e => setText(e.target.value)}
                        autoFocus

                    />
                </div>

                <div style={{ height: '15px' }}></div>
                <div className={Mstyles.Flexbtnbox}>
                    <LoadingButton
                        size="small"
                        type='submit'

                        endIcon={<FiChevronRight />}
                        loading={LoadingBtn}
                        desabled={LoadingBtn}
                        loadingPosition="end"
                        variant="outlined"

                    >
                        <span>Update Comment</span>
                    </LoadingButton>


                    <LoadingButton
                        size="small"
                        endIcon={<LuX />}
                        loading={false} // Change this to handle loading state
                        loadingPosition="end"
                        variant="text"
                        onClick={handleClose}
                    >

                    </LoadingButton>
                </div>
            </form>
        </div>
    );
};

export default EditComment;