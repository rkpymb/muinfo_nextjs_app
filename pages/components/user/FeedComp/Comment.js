import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import { FiChevronRight } from 'react-icons/fi';
import LoadingButton from '@mui/lab/LoadingButton';
import EditComment from './EditComment';
import Mstyles from '/styles/mainstyle.module.css';

const Comment = ({ comment, fetchComments, Contextdata, parentId = null }) => {
    const [reply, setReply] = useState('');
    const [showReply, setShowReply] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.CmtData.Text);
    const [replies, setReplies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (comment._id) {
            fetchReplies();
        }
    }, [comment._id]);

    const fetchReplies = async () => {
        try {
            const response = await axios.get('/api/user/post_cmt', {
                params: { parentId: comment.CmtData._id }
            });
            setReplies(response.data.ReqData.CmtAllList);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleReply = async () => {
        if (reply !== '') {
            try {
                await axios.post('/api/user/add_post_cmt', {
                    CmtText: reply,
                    PostData: comment.PostData,
                    parentId: comment.CmtData._id
                });
                setReply('');
                setShowReply(false);
                fetchReplies();
                fetchComments(); // Refresh parent comments
            } catch (error) {
                console.error(error);
            }
        } else {
            Contextdata.ChangeAlertData("Can't post Empty Comment 😣", 'warning');
        }
    };

    const handleEdit = async () => {
        try {
            await axios.post('/api/user/update_cmt', {
                _id: comment.CmtData._id,
                Text: editedContent
            });
            setIsEditing(false);
            fetchComments(); // Refresh parent comments
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        const text = "Do you really want to delete This Comment ?";
        if (confirm(text) == true) {
            try {
                await axios.post('/api/user/delete_cmt', { _id: comment.CmtData._id });
                fetchComments(); // Refresh parent comments
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className={Mstyles.CmtlistItem} style={{ marginLeft: parentId ? '20px' : '0px' }}>
            <div className={Mstyles.CmtlistItemA}>
                <Avatar alt={comment.UserData.name} src={comment.UserData.dp} sx={{ width: 30, height: 30 }} />
            </div>
            <div className={Mstyles.CmtlistItemB}>
                <div className={Mstyles.CmttextboxUser}>
                    <span>{comment.UserData.name}</span>
                    <div className={Mstyles.linedevider}>|</div>
                    <small>{comment.formattedDate}</small>
                </div>
                <div className={Mstyles.Cmttextbox}>
                    {isEditing ? (
                        <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
                    ) : (
                        <span>{comment.CmtData.Text}</span>
                    )}
                </div>
                {Contextdata.UserLogin &&
                    <div>
                        <div className={Mstyles.CmtEditDeletebox}>
                            {Contextdata.UserData.mobile == comment.CmtData.UserData.mobile && (
                                <div className={Mstyles.CmtEditDeleteitem} onClick={() => setIsEditing(!isEditing)}>
                                    <span>{isEditing ? 'Save' : 'Edit'}</span>
                                </div>
                            )}
                            <div className={Mstyles.CmtEditDeleteitem} onClick={handleDelete}>
                                <span>Delete</span>
                            </div>
                        </div>
                        {isEditing && (
                            <button onClick={handleEdit}>Save</button>
                        )}
                        {!isEditing && (
                            <button onClick={() => setShowReply(!showReply)}>Reply</button>
                        )}
                        {showReply && (
                            <div>
                                <textarea
                                    placeholder="Write your reply here..."
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                />
                                <LoadingButton
                                    onClick={handleReply}
                                    endIcon={<FiChevronRight />}
                                    loading={false}
                                    loadingPosition="end"
                                    variant='outlined'
                                >
                                    <span>Post Reply</span>
                                </LoadingButton>
                            </div>
                        )}
                    </div>
                }
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    replies.map((reply) => (
                        <Comment key={reply._id} comment={reply} fetchComments={fetchComments} Contextdata={Contextdata} parentId={comment.CmtData._id} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Comment;
