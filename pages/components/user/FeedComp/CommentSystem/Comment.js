import React, { useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import CheckloginContext from '/context/auth/CheckloginContext';
import LoadingButton from '@mui/lab/LoadingButton';
import { FiChevronRight } from 'react-icons/fi';
import Mstyles from '/styles/mainstyle.module.css';
import { MediaFilesFolder, MediaFilesUrl } from '/Data/config';
import EditCommentForm from './EditCommentForm';

const Comment = ({ comment = {}, onReply, onDelete, activeCommentId, setActiveCommentId, OnUpdate }) => {
    const [replyText, setReplyText] = useState('');
    const Contextdata = useContext(CheckloginContext);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [showChildComments, setShowChildComments] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const toggleChildComments = () => {
        setShowChildComments(!showChildComments);
    };

    const handleReply = () => {
        if (replyText.trim() !== '') {
            onReply(comment.CmtData?.CmtID, replyText);
            setReplyText('');
        } else {
            console.warn("Can't post an empty reply");
        }
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm("Do you really want to delete this comment?");
        if (confirmDelete) {
            onDelete(comment);
        }
    };

    const OnUpdateData = async (updatedData) => {
        OnUpdate(updatedData);
    };

    const handleReplyClick = () => {
        if (showReplyForm) {
            setActiveCommentId(null);
        } else {
            setActiveCommentId(comment.CmtData?.CmtID);
        }
        setShowReplyForm(!showReplyForm);
        toggleChildComments();
    };

    const handleEditClick = () => {
        setShowEditForm(true);
    };

    const handleCancelEdit = () => {
        setShowEditForm(false);
    };

    const isActive = comment.CmtData?.CmtID === activeCommentId;

    if (!comment.CmtData) {
        return null; // or display some placeholder UI
    }

    return (
        <div className={`${Mstyles.CmtlistItem} ${isActive ? Mstyles.CmtItemborder : ''}`}>
            <div className={Mstyles.CmtUserBox}>
                <div className={Mstyles.CmtUserBoxA}>
                    <Avatar
                        alt={comment.UserData?.name}
                        src={`${MediaFilesUrl}${MediaFilesFolder}/${comment.UserData?.dp}`}
                        sx={{ width: 30, height: 30 }}
                    />
                </div>
                <div className={Mstyles.CmtUserBoxB}>
                    <div className={Mstyles.CmtNamebox}>
                        <span>{comment.UserData?.name}</span>
                    </div>
                    <div className={Mstyles.LineDevider}>●</div>
                    <div className={Mstyles.CmtDatebox}>
                        <span>{comment.formattedDate}</span>
                    </div>
                </div>
            </div>
            {showEditForm ? (
                <EditCommentForm
                    initialText={comment.CmtData.CmtData.Text}
                    comment={comment}
                    onUpdate={(updatedData) => {
                        OnUpdateData(updatedData);
                        setShowEditForm(false);
                    }}
                    onCancel={handleCancelEdit}
                />
            ) : (
                <div>
                    <div className={Mstyles.CmtMainText}>
                        {comment.CmtData.CmtData.Text}
                    </div>

                    <div className={Mstyles.CmtBoxFooter}>
                        {(Contextdata.UserData?.Role === 1 || (Contextdata.UserData?.Role === 2 && Contextdata.UserData.mobile === comment.CmtData?.UserData.mobile)) && (
                            <div className={Mstyles.CmtBoxFooterA}>
                                <div className={Mstyles.CmtBoxFooterItem}>
                                    <LoadingButton
                                        fullWidth
                                        onClick={handleDelete}
                                        loading={false}
                                        loadingPosition="end"
                                        size='small'
                                        variant='text'
                                    >
                                        <span>Delete</span>
                                    </LoadingButton>
                                </div>
                                <div className={Mstyles.CmtBoxFooterItem}>
                                    <LoadingButton
                                        fullWidth
                                        onClick={handleEditClick}
                                        loading={false}
                                        loadingPosition="end"
                                        size='small'
                                        variant='text'
                                    >
                                        <span>Edit</span>
                                    </LoadingButton>
                                </div>
                            </div>
                        )}

                        <div className={Mstyles.CmtBoxFooterB}>
                            <div className={Mstyles.CmtBoxFooterItem}>
                                <LoadingButton
                                    fullWidth
                                    size='small'
                                    onClick={handleReplyClick}
                                    loading={false}
                                    loadingPosition="end"
                                    variant='text'
                                >
                                    <span>{showReplyForm && isActive ? 'Cancel' : (comment.ChildCmt?.length > 0 ? `${comment.ChildCmt.length} Replies` : 'Reply')}</span>
                                </LoadingButton>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showReplyForm && isActive && (
                <div className={Mstyles.CmtReplaybox}>
                    <div className={Mstyles.PostBoxUserInput}>
                        <textarea
                            placeholder='write your reply'
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            rows="3"
                            cols="50"
                        />
                    </div>
                    <div style={{ height: '10px' }}></div>
                    <div>
                        <LoadingButton
                            fullWidth
                            size='small'
                            onClick={handleReply}
                            endIcon={<FiChevronRight />}
                            loading={false}
                            loadingPosition="end"
                            variant='outlined'
                        >
                            <span>send reply</span>
                        </LoadingButton>
                    </div>
                    <div style={{ height: '10px' }}></div>
                </div>
            )}
            {showChildComments && comment.ChildCmt?.length > 0 && (
                <div>
                    {comment.ChildCmt.map((childComment) => (
                        <Comment
                            key={childComment.CmtData?.CmtID}
                            comment={childComment}
                            onReply={onReply}
                            onDelete={onDelete}
                            activeCommentId={activeCommentId}
                            setActiveCommentId={setActiveCommentId}
                            OnUpdate={OnUpdate}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Comment;
