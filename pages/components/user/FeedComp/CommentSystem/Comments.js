import React, { useState, useEffect, useContext } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import CheckloginContext from '/context/auth/CheckloginContext';
import Mstyles from '/styles/mainstyle.module.css';
import io from 'socket.io-client';
import Skeleton from '@mui/material/Skeleton';
import { API_URL } from '/Data/config';

const Comments = ({ PostData }) => {
    const [comments, setComments] = useState([]);
    const Contextdata = useContext(CheckloginContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCommentId, setActiveCommentId] = useState(null);

    const [roomId, setRoomId] = useState(null);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (roomId && Contextdata.UserJwtToken) {
            const newSocket = io(API_URL, {
                auth: {
                    token: Contextdata.UserJwtToken || null,
                },
                transports: ['websocket'],
            });

            newSocket.on('connect', () => {
                console.log('Connected to server');
            });

            newSocket.on('disconnect', () => {
                console.log('Disconnected from server');
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

            newSocket.on('userJoined', (data) => {});

            newSocket.on('CommentDeleted', (data) => {
                const cmtid = data.data.cmtid;
               
                setComments(prevComments => {
                    const removeCommentById = (comments, id) => {
                        return comments
                            .filter(comment => comment.CmtData._id !== id)
                            .map(comment => ({
                                ...comment,
                                ChildCmt: removeCommentById(comment.ChildCmt, id)
                            }));
                    };

                    return removeCommentById(prevComments, cmtid);
                });
            });

            newSocket.on('CommentUpdated', (data) => {
                const updatedComment = data.data.updatedData;
           
            
                const UpdatedData = updatedComment.CmtData; 
                const StatusText = updatedComment.StatusText; 
            
                setComments(prevComments => {
                    return prevComments.map(comment => {
                        if (comment.CmtData._id === updatedComment._id) {
                            // Update only if the comment matches the given _id
                            return {
                                ...comment,
                                CmtData: {
                                    ...comment.CmtData,
                                    CmtData: UpdatedData,
                                    StatusText: StatusText // StatusText ko bhi update karein
                                }
                            };
                        }
                        return comment; // Return unchanged if _id doesn't match
                    });
                });
            });
            
            
            
            
            newSocket.on('NewComment', (data) => {
                const newComment = data.data.SoketData[0];
                if (newComment.CmtData.IsChild == null) {
                    setComments((prevComments) => [newComment, ...prevComments]);
                } else {
                    setComments((prevComments) => {
                        const updatedComments = prevComments.map(comment => {
                            if (comment.CmtData.CmtID === newComment.CmtData.IsChild.ParentCmtID) {
                                return {
                                    ...comment,
                                    ChildCmt: [newComment, ...comment.ChildCmt]
                                };
                            } else {
                                return {
                                    ...comment,
                                    ChildCmt: comment.ChildCmt.map(child => {
                                        if (child.CmtData.CmtID === newComment.CmtData.IsChild.ParentCmtID) {
                                            return {
                                                ...child,
                                                ChildCmt: [newComment, ...child.ChildCmt]
                                            };
                                        }
                                        return child;
                                    })
                                };
                            }
                        });
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

    const OnUpdate = async (updatedData) => {
       
        SendSoketMsgOnUpdatecmt(updatedData)
      
    };

    const SendSoketMsg = (SoketData) => {
        socket.emit('NewComment', { SoketData, roomId });
    };
    const SendSoketMsgOnUpdatecmt = (updatedData) => {
        socket.emit('CommentUpdated', { updatedData, roomId });
    };

    const handleReply = async (parentCmtID, replyText) => {
        if (replyText !== '') {
            try {
                const response = await fetch("/api/user/add_cmt_replay", {
                    method: "POST",
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({ CmtText: replyText, PostData, ParentCmt: { ParentCmtID: parentCmtID } })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                if (data && data.ReqData.done) {
                
                    const SoketData = data.ReqData.NewCmt;
                    SendSoketMsg(SoketData);
                } else {
                    console.error('Error adding reply:', data.message || 'Unknown error');
                }
            } catch (error) {
                console.error('Error adding reply:', error);
            }
        } else {
            console.warn("Can't post an empty comment");
        }
    };

    const SendSoketMsgDelete = async (cmtid) => {
        socket.emit('CommentDeleted', { cmtid, roomId });
    };

    const handleDelete = async (deletedComment) => {
        let _id = deletedComment.CmtData._id;
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
            <div className={Mstyles.Cmtmainbox}>
                <CommentForm PostData={PostData} getCommentsData={getCommentsData} socket={socket} roomId={roomId} />
            </div>
            <div className={Mstyles.CmtLBox}>
                <CommentList comments={comments} onReply={handleReply} onDelete={handleDelete} OnUpdate={OnUpdate} activeCommentId={activeCommentId} setActiveCommentId={setActiveCommentId} />
            </div>
        </div>
    );
};

export default Comments;
