// EditComment.js
import React, { useState, useEffect, useContext } from 'react';
import { LuPlus, LuX, LuPencilLine, LuTrash2 } from "react-icons/lu";
import Mstyles from '/styles/mainstyle.module.css'
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { FiChevronRight, FiEdit } from 'react-icons/fi';
import IconButton from '@mui/material/IconButton';

import { MediaFilesFolder, MediaFilesUrl } from '/Data/config'
import CheckloginContext from '/context/auth/CheckloginContext'

import Avatar from '@mui/material/Avatar';
import EditComment from './EditComment';

const ReplayComment = ({ isOpen, ParentCmt, handleClose, ReplayAdded, PostData }) => {
    const [Text, setText] = useState();

    const [LoadingSubmitBtn, setLoadingSubmitBtn] = useState(false);
    const Contextdata = useContext(CheckloginContext)


    useEffect(() => {
        if (isOpen) {
            console.log(ParentCmt.ChildCmt)


        }

    }, [isOpen]);



    const SendReplay = async () => {
        e.preventDefault();

        if (replyText !== '') {
           
            const sendUM = {

                CmtText: replyText,
                PostData: PostData,
                ParentCmt: ParentCmt

            }
            const data = await fetch("/api/user/add_cmt_replay", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    console.log(parsed)

                })

        } else {
            Contextdata.ChangeAlertData(`Can't post Empty Comment 😣`, 'warning')
        }



    }


    return (
        <div>
            {isOpen  &&
            <div>
                
            </div>
            
            }
           
        </div>
    );
};

export default ReplayComment;