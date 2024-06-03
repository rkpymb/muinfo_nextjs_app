import React, { useState, useEffect, useContext } from 'react';

import Mstyles from '/styles/mainstyle.module.css';
import { MediaFilesFolder, MediaFilesUrl } from '/Data/config';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { FiChevronRight, FiEdit } from 'react-icons/fi';
import RaplyItemCmt from '../CommentSystem/RaplyItemCmt'
import CheckloginContext from '/context/auth/CheckloginContext'
import Image from 'next/image';


const CommentList = ({ comments, onDelete, ClickReply, ClickEditCmt, CloseEditCmt }) => {
    const [clickedIndex, setClickedIndex] = useState(null);
    const Contextdata = useContext(CheckloginContext)
    const toggleOverlay = (index) => {
        if (clickedIndex === index) {
            setClickedIndex(null);
        } else {
            setClickedIndex(index);
        }
    };

    return (
        <div>
            {comments &&
            <div className={Mstyles.CmtGrid}>
            
            {comments.map((item, index) => (
                <div key={index} className={Mstyles.CmtItem}>
                    <div className={Mstyles.CmtItemMain}>
                        <div className={Mstyles.CmtItemMainA}>
                            <Avatar
                                alt={item.UserData?.name}
                                src={`${MediaFilesUrl}${MediaFilesFolder}/${item.UserData?.dp}`}
                                sx={{ width: 30, height: 30 }}
                            />
                        </div>
                        <div className={Mstyles.CmtItemMainB}>
                            <div className={Mstyles.CmtUserBoxB}>
                                <div className={Mstyles.CmtNamebox}>
                                    <span>{item.UserData?.name}</span>
                                </div>
                                <div className={Mstyles.LineDevider}>●</div>
                                <div className={Mstyles.CmtUserBoxBFotter}>
                                    <div className={Mstyles.CmtDatebox}>
                                        <span>{item.formattedDate}</span>
                                    </div>
                                    {item.CmtData.StatusText === 'Edited' && (
                                        <div className={Mstyles.EditedTextms}>
                                            <div className={Mstyles.CmtDatebox}>
                                                <span>({item.CmtData.StatusText})</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={Mstyles.CmtMainText} onClick={() => toggleOverlay(index)}>
                                <div>{item.CmtData.CmtData.Text}</div>
                                {clickedIndex === index && (
                                    <div className={Mstyles.MsgBtnsBox}>

                                        {Contextdata.UserData.username == item.UserData.username &&
                                            <div className={Mstyles.MsgBtns}>
                                                <Image

                                                    onClick={(e) => {
                                                        e.stopPropagation();

                                                        ClickEditCmt(item);
                                                    }}
                                                    src={`/svg/edit.svg`}

                                                    height={15}
                                                    width={15}



                                                />
                                            </div>
                                        }

                                        {Contextdata.UserData.Role == 1 || Contextdata.UserData.username == item.UserData.username ?
                                            <div className={Mstyles.MsgBtns} style={{ marginLeft: '5px' }}>
                                                <Image
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onDelete(item);
                                                    }}
                                                    src={`/svg/delete.svg`}

                                                    height={15}
                                                    width={15}



                                                />


                                            </div> : null
                                        }

                                        <div className={Mstyles.MsgBtns} style={{ marginLeft: '5px' }}>
                                            <Image
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const MainCmt = item.CmtData.CmtID
                                                    ClickReply(item, MainCmt);
                                                }}
                                                src={`/svg/reply.svg`}

                                                height={15}
                                                width={15}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {item.Replies.length > 0 &&
                                <div className={Mstyles.ReplayItembox}>
                                    <LoadingButton

                                        onClick={() => toggleOverlay(index)}
                                        startIcon={clickedIndex === index ? <LuChevronUp /> : <LuChevronDown />}
                                        loading={false}
                                        loadingPosition="end"
                                        variant="text"
                                        size='small'

                                    >
                                        {item.Replies.length} replies
                                    </LoadingButton>

                                    {clickedIndex === index && (
                                        <div>
                                            <RaplyItemCmt Replies={item.Replies} onDelete={onDelete} ClickReply={ClickReply} MainCmt={item.CmtData.CmtID} ClickEditCmt={ClickEditCmt} CloseEditCmt={CloseEditCmt} />
                                        </div>

                                    )}
                                </div>
                            }






                        </div>
                    </div>
                </div>
            ))}
        </div>
            
            
        }
        </div>
    );
};

export default CommentList;
