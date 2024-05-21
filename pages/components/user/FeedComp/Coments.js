
import React, { useState, useEffect, useContext } from 'react';

import CheckloginContext from '/context/auth/CheckloginContext'
import Mstyles from '/styles/mainstyle.module.css'
import Skeleton from '@mui/material/Skeleton';
import { useRouter, useParams } from 'next/router'
import { LuTrash2, LuRedoDot } from "react-icons/lu";

import { ShortAbout, AppName, SocialHandles, MediaFilesFolder, MediaFilesUrl } from '/Data/config'
import { Router } from 'next/router';
import { FiMessageCircle, FiChevronRight } from 'react-icons/fi';
import LoadingButton from '@mui/lab/LoadingButton';

import Avatar from '@mui/material/Avatar';


import Badge from '@mui/material/Badge';

import {

    styled
} from '@mui/material';

// Recursive component to render comments and replies
const Comment = ({ comment, onReply, onDelete }) => {

    const [replyText, setReplyText] = useState('');
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [showChildComments, setShowChildComments] = useState(false);

    const toggleChildComments = () => {
        setShowChildComments(!showChildComments);
    };


    const handleReply = () => {
        if (replyText.trim() !== '') {
            onReply(comment.CmtData.CmtID, replyText);
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

    return (
        <div className={`${Mstyles.CmtlistItem}` }>
            <div className={Mstyles.CmtUserBox}>
                <div className={Mstyles.CmtUserBoxA}>
                    <Avatar
                        alt={comment.UserData.name}
                        src={`${MediaFilesUrl}${MediaFilesFolder}/${comment.UserData.dp}`}
                        sx={{ width: 30, height: 30 }}
                    />
                </div>
                <div className={Mstyles.CmtUserBoxB}>
                    <div className={Mstyles.CmtNamebox}>
                        <span> {comment.UserData.name}</span>
                    </div>

                    <div className={Mstyles.LineDevider}>●</div>

                    <div className={Mstyles.CmtDatebox}>
                        <span>  {comment.formattedDate}</span>
                    </div>

                </div>

            </div>
            <div className={Mstyles.CmtTextBox}>
                {comment.CmtData.Text || comment.CmtData.CmtData.Text}
            </div>
            <div className={Mstyles.CmtBoxFooter}>
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
                        size='small'
                        onClick={() => {
                            setShowReplyForm(!showReplyForm);
                            toggleChildComments(); // Toggle child comments visibility
                        }}

                        loading={false}
                        loadingPosition="end"

                        variant='text'
                    >
                        <span>{showReplyForm ? 'Cancel' : 'Edit'}</span>
                    </LoadingButton>

                </div>
                <div className={Mstyles.CmtBoxFooterItem}>
                    <LoadingButton
                        fullWidth
                        size='small'
                        onClick={() => {
                            setShowReplyForm(!showReplyForm);
                            toggleChildComments(); // Toggle child comments visibility
                        }}

                        loading={false}
                        loadingPosition="end"

                        variant='text'
                    >
                        <span>{showReplyForm ? `Cancel` : `${comment.ChildCmt.length > 0 ? `${comment.ChildCmt.length} Replies` : 'Reply'}`}</span>
                    </LoadingButton>

                </div>

            </div>

            {showReplyForm && (
                <div className={Mstyles.CmtReplaybox}>
                    <div className={Mstyles.PostBoxUserInput}>
                        <textarea
                            placeholder='write your reply '
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

            <div>
                {showChildComments &&
                    <div>
                        {comment.ChildCmt && comment.ChildCmt.length > 0 && (
                            <div>
                                {comment.ChildCmt.map((childComment) => (
                                    <Comment key={childComment.CmtData.CmtID} comment={childComment} onReply={onReply} onDelete={onDelete} />
                                ))}
                            </div>
                        )}
                    </div>

                }
            </div>

        </div>
    );
};

const Comments = ({ PostData }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const Contextdata = useContext(CheckloginContext)
    const [LoadingSubmitBtn, setLoadingSubmitBtn] = useState(false);
    const [CmtText, setCmtText] = useState('');

    const handleTextareaChange = (e) => {
        setCmtText(e.target.value);
    };


    const getCommentsData = async () => {
        try {
            const response = await fetch("/api/user/post_cmt", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ PostData })
            });
            const data = await response.json();
            console.log(data.ReqData.CmtAllList)
            setComments(data.ReqData.CmtAllList);
            setLoading(false);
        } catch (error) {
            setError('Error fetching comments');
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        getCommentsData();
    }, []);

    const handleReply = async (parentCmtID, replyText) => {
        if (replyText !== '') {
            try {
                const response = await fetch("/api/user/add_cmt_replay", {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        CmtText: replyText,
                        PostData,
                        ParentCmt: { ParentCmtID: parentCmtID }
                    })
                });
                await response.json();
                getCommentsData();  // Refresh comments after adding a reply
            } catch (error) {
                console.error('Error adding reply:', error);
            }
        } else {
            console.warn("Can't post an empty comment");
        }
    };

    const handleDelete = async (deletedComment) => {
        const _id = deletedComment.CmtData._id;
        const IsChild = deletedComment.CmtData.IsChild;

        try {
            const response = await fetch("/api/user/delete_cmt", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ _id })
            });
            const data = await response.json();
            console.log("Delete response:", data);
            if (data.ReqData.done) {
                // Remove the deleted comment and its child comments
                const updatedComments = removeCommentAndChildren(comments, _id);
                setComments(updatedComments);
                console.log('Comment deleted successfully');
            } else {
                console.error('Something went wrong while deleting the comment');
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    // Function to remove a comment and its child comments recursively
    const removeCommentAndChildren = (commentsArr, commentId) => {
        return commentsArr.filter(comment => {
            if (comment.CmtData._id === commentId) {
                // If this comment matches the ID, remove it and its children recursively
                if (comment.ChildCmt.length > 0) {
                    comment.ChildCmt = removeChildren(comment.ChildCmt, commentId);
                }
                return false; // Exclude this comment from the filtered array
            } else {
                // If it's not the comment to be deleted, check its children
                if (comment.ChildCmt.length > 0) {
                    comment.ChildCmt = removeCommentAndChildren(comment.ChildCmt, commentId);
                }
                return true; // Include this comment in the filtered array
            }
        });
    };

    // Function to remove child comments recursively
    const removeChildren = (childComments, commentId) => {
        return childComments.filter(childComment => {
            if (childComment.CmtData._id === commentId) {
                return false; // Exclude this child comment from the filtered array
            } else {
                // If it's not the comment to be deleted, check its children
                if (childComment.ChildCmt.length > 0) {
                    childComment.ChildCmt = removeChildren(childComment.ChildCmt, commentId);
                }
                return true; // Include this child comment in the filtered array
            }
        });
    };






    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const AddCmt = async (e) => {
        e.preventDefault();

        if (CmtText !== '') {
            setLoadingSubmitBtn(true)
            const sendUM = {

                CmtText: CmtText,
                PostData: PostData,

            }
            const data = await fetch("/api/user/add_post_cmt", {
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
                    }, 100);
                    if (parsed.ReqData.done) {
                        getCommentsData()
                        setCmtText('')
                        Contextdata.ChangeAlertData('Comment Added 😍', 'success')

                    } else {
                        Contextdata.ChangeAlertData('Something Went Wrong 😣', 'warning')


                    }


                })

        } else {
            Contextdata.ChangeAlertData(`Can't post Empty Comment 😣`, 'warning')
        }



    }


    return (
        <div className={Mstyles.Cmtmainbox}>

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


                    <small style={{ fontSize: '10px' }}>You agree to our <span className={Mstyles.url} onClick={() => router.push('/TermsConditions')}>Terms & Conditions</span> and <span className={Mstyles.url} onClick={() => router.push('/PrivacyPolicy')}>Privacy Policy</span></small>
                    <div style={{ marginTop: 20 }}></div>
                </div>


            </div>
            <h3>Comments</h3>
            <div style={{ height: '20px' }}></div>
            <div>
                {comments.map((comment) => (
                    <Comment  key={comment.CmtData.CmtID} comment={comment} onReply={handleReply} onDelete={handleDelete} />
                ))}
            </div>

        </div>
    );
};

export default Comments;

