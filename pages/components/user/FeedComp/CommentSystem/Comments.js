import React, { useState, useEffect, useContext } from 'react';
import CommentForm from './CommentForm';
import EditCmtForm from './EditCmtForm';
import CommentList from './CommentList';
import CheckloginContext from '/context/auth/CheckloginContext';
import Mstyles from '/styles/mainstyle.module.css';
import io from 'socket.io-client';
import Skeleton from '@mui/material/Skeleton';
import { API_URL } from '/Data/config';

const Comments = ({ PostData }) => {
    const [comments, setComments] = useState([]);
    const [OpenCmtEdit, setOpenCmtEdit] = useState(false);
    const [EditCmt, setEditCmt] = useState(null);
    const Contextdata = useContext(CheckloginContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCommentId, setActiveCommentId] = useState(null);

    const [roomId, setRoomId] = useState(null);
    const [socket, setSocket] = useState(null);

    const [ReplayForMsg, setReplayForMsg] = useState(null);
    const [MainCmt, setMainCmt] = useState(null);
    const [OpenReplay, setOpenReplay] = useState(false);


    const ClickReply = (Msg, MainCmt) => {
        setOpenCmtEdit(false)

        setReplayForMsg(Msg);
        setMainCmt(MainCmt);
        setOpenReplay(true)

    };
    const ClickEditCmt = (Item) => {
        setOpenReplay(false)
        setEditCmt(Item);
        setOpenCmtEdit(true)

    };
    const CloseEditCmt = (Item) => {
       
        setOpenCmtEdit(false)


    };

    const CloseReplay = () => {

        setReplayForMsg(null);
        setMainCmt(null);
        setOpenReplay(false)

    };



    useEffect(() => {
        if (roomId && Contextdata.UserJwtToken) {
            const newSocket = io(API_URL, {
                auth: {
                    token: Contextdata.UserJwtToken || null,
                },
                transports: ['websocket'],
            });

            newSocket.on('connect', () => {

            });

            newSocket.on('disconnect', () => {

            });

            newSocket.on('connect_error', (err) => {
                console.error('Connection error:', err);
            });

            const joinRoom = () => {
                if (roomId) {
                    newSocket.emit('joinRoom', roomId);
                }
            };

            joinRoom();

            newSocket.on('userJoined', (data) => { });

            newSocket.on('CommentDeleted', (data) => {
                const cmtid = data.data.cmtid;
                setComments(prevComments => {
                    const deleteComment = (comments) => {
                        return comments.reduce((result, comment) => {
                            if (comment.CmtData._id !== cmtid) {
                                if (comment.Replies) {
                                    comment.Replies = deleteComment(comment.Replies);
                                }
                                result.push(comment);
                            }
                            return result;
                        }, []);
                    };
                    return deleteComment(prevComments);
                });
            });


            newSocket.on('CommentUpdated', (data) => {
                const updatedComment = data.data.Data;
                setComments((prevComments) => {
                    const updateComment = (comments) => {
                        return comments.map(comment => {
                            if (comment.CmtData._id === updatedComment._id) {
                                return {
                                    ...comment,
                                    CmtData: updatedComment
                                };
                            }
                            if (comment.Replies) {
                                return {
                                    ...comment,
                                    Replies: updateComment(comment.Replies)
                                };
                            }
                            return comment;
                        });
                    };
                    return updateComment(prevComments);
                });
            });



            newSocket.on('NewComment', (data) => {
                const newComment = data.data.SoketData[0];
                if (newComment.CmtData.IsChild == null) {
                    setComments((prevComments) => [newComment, ...prevComments]);
                } else {

                    setComments((prevComments) => {
                        const updatedComments = [...prevComments];
                        const parentCommentIndex = updatedComments.findIndex(comment => comment.CmtData.CmtID === newComment.CmtData.IsChild.MainCmt);
                        if (parentCommentIndex !== -1) {
                            if (!updatedComments[parentCommentIndex].Replies) {
                                updatedComments[parentCommentIndex].Replies = [];
                            }
                            updatedComments[parentCommentIndex].Replies.push(newComment);
                        }
                        return updatedComments;
                    });

                }
            });

            setSocket(newSocket);

            return () => {
                newSocket.disconnect();
            };
        }
    }, [roomId, Contextdata.UserJwtToken]);

    useEffect(() => {
        setRoomId(PostData.PostID)
    }, [PostData]);

    const getCommentsData = async () => {
        if (comments.length > 0) {
            // Comments already loaded
        } else {
            try {
                const response = await fetch("/api/user/post_cmt", {
                    method: "POST",
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({ PostData })
                });
                const data = await response.json();

                if (data.ReqData) {

                    setComments(data.ReqData.CmtAllList);
                    setLoading(false);
                } else {
                    setComments([]);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                setComments([]);
                setError('Error fetching comments');
                console.error('Error fetching comments:', error);
            }
        }
    };

    useEffect(() => {
        getCommentsData();
    }, []);






    const SendSoketMsgDelete = async (cmtid) => {
        socket.emit('CommentDeleted', { cmtid, roomId });
    };


    const handleDelete = async (deletedComment) => {
        let _id = deletedComment.CmtData._id;

        const confirmDelete = window.confirm("Do you really want to delete this comment?");
        if (confirmDelete) {
            try {
                const response = await fetch("/api/user/delete_cmt", {
                    method: "POST",
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({ _id })
                });
                const data = await response.json();
                if (data.ReqData.DelData) {


                    SendSoketMsgDelete(_id);
                } else {
                    console.error('Something went wrong while deleting the comment');
                }
            } catch (error) {
                console.error('Error deleting comment:', error);
            }
        }

    };

    if (loading) return (
        <div>
            <Skeleton variant="text" width={'100%'} sx={{ fontSize: '1rem' }} />
            <div style={{ height: '10px' }}></div>
            <Skeleton variant="text" width={'50%'} sx={{ fontSize: '1rem' }} />
        </div>
    );
    if (error) return <div>{error}</div>;

    return (
        <div>
            <div className={Mstyles.CmtLBox}>
                <CommentList comments={comments} ClickReply={ClickReply} onDelete={handleDelete} CloseEditCmt={CloseEditCmt} ClickEditCmt={ClickEditCmt} OpenCmtEdit={OpenCmtEdit} />

            </div>

            {!OpenCmtEdit ?
                <CommentForm PostData={PostData} getCommentsData={getCommentsData} socket={socket} roomId={roomId} OpenReplay={OpenReplay} ReplayForMsg={ReplayForMsg} MainCmt={MainCmt} CloseReplay={CloseReplay} /> :
                <EditCmtForm PostData={PostData} getCommentsData={getCommentsData} socket={socket} roomId={roomId} OpenReplay={OpenReplay} ReplayForMsg={ReplayForMsg} MainCmt={MainCmt} CloseReplay={CloseReplay} CloseEditCmt={CloseEditCmt} ClickEditCmt={ClickEditCmt} OpenCmtEdit={OpenCmtEdit} EditCmt={EditCmt} />


            }


            <small style={{ fontSize: '10px' }}>
                You agree to our
                <span className={Mstyles.url} onClick={() => router.push('/terms_and_conditions')}> Terms & Conditions </span>
                <span> & </span>
                <span className={Mstyles.url} onClick={() => router.push('/privacy_policy')}> Privacy Policy</span>
            </small>
        </div>
    );
};

export default Comments;
