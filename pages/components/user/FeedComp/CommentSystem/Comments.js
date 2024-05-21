import React, { useState, useEffect, useContext } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import CheckloginContext from '/context/auth/CheckloginContext';
import Mstyles from '/styles/mainstyle.module.css';
import io from 'socket.io-client';
import {API_URL} from '/Data/config'
const Comments = ({ PostData }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCommentId, setActiveCommentId] = useState(null);
    const [socket, setSocket] = useState(null);

    const getCommentsData = async () => {
        try {
            const response = await fetch("/api/user/post_cmt", {
                method: "POST",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ PostData })
            });
            const data = await response.json();
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


    // useEffect(() => {
    //     const newSocket = io(`${API_URL}`); // Specify port 3001 here
    //     setSocket(newSocket);

    //     newSocket.on('newComment', (newComment) => {
    //         console.log('Soket received new comment')
    //         setComments(prevComments => [...prevComments, newComment]);
    //     });

    //     return () => newSocket.close();
    // }, []);


    useEffect(() => {
        const socket = io(`${API_URL}`) // Socket.io client ko connect karein

        // Socket.io event listener set karein
        socket.on('newComment', (newComment) => {
            console.log('New comment received:', newComment);
        });

        // Clean up effect
        return () => {
            socket.disconnect(); // Socket.io client se disconnect karein
        };
    }, []);



    const OnUpdate = async (updatedData) => {
        const _id = updatedData.CmtData._id;
        console.log(updatedData)
        getCommentsData();
        if (updatedData.IsChild == null) {
            console.log(comments.length)
        } else {

        }
    };

    const handleReply = async (parentCmtID, replyText) => {
        if (replyText !== '') {
            try {
                const response = await fetch("/api/user/add_cmt_replay", {
                    method: "POST",
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({ CmtText: replyText, PostData, ParentCmt: { ParentCmtID: parentCmtID } })
                });
                await response.json();
                getCommentsData();
            } catch (error) {
                console.error('Error adding reply:', error);
            }
        } else {
            console.warn("Can't post an empty comment");
        }
    };

    const handleDelete = async (deletedComment) => {
        const _id = deletedComment.CmtData._id;
        try {
            const response = await fetch("/api/user/delete_cmt", {
                method: "POST",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ _id })
            });
            const data = await response.json();
            if (data.ReqData.done) {
                const updatedComments = removeCommentAndChildren(comments, _id);
                setComments(updatedComments);
            } else {
                console.error('Something went wrong while deleting the comment');
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };


    const removeCommentAndChildren = (commentsArr, commentId) => {
        return commentsArr.filter(comment => {
            if (comment.CmtData._id === commentId) {
                if (comment.ChildCmt.length > 0) {
                    comment.ChildCmt = removeChildren(comment.ChildCmt, commentId);
                }
                return false;
            } else {
                if (comment.ChildCmt.length > 0) {
                    comment.ChildCmt = removeCommentAndChildren(comment.ChildCmt, commentId);
                }
                return true;
            }
        });
    };

    const removeChildren = (childComments, commentId) => {
        return childComments.filter(childComment => {
            if (childComment.CmtData._id === commentId) {
                return false;
            } else {
                if (childComment.ChildCmt.length > 0) {
                    childComment.ChildCmt = removeChildren(childComment.ChildCmt, commentId);
                }
                return true;
            }
        });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <div className={Mstyles.Cmtmainbox}>
                <CommentForm PostData={PostData} getCommentsData={getCommentsData} />
            </div>
            <div className={Mstyles.CmtLBox}>
                <CommentList comments={comments} onReply={handleReply} onDelete={handleDelete} OnUpdate={OnUpdate} activeCommentId={activeCommentId} setActiveCommentId={setActiveCommentId} />
            </div>


        </div>
    );
};

export default Comments;
