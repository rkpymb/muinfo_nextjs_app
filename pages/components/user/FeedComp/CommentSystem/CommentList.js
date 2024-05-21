import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments, onReply, onDelete, activeCommentId, setActiveCommentId,OnUpdate }) => {
    return (
        <div>
            {comments.map((comment) => (
                <Comment key={comment.CmtData.CmtID} comment={comment} onReply={onReply} onDelete={onDelete} activeCommentId={activeCommentId} setActiveCommentId={setActiveCommentId} OnUpdate={OnUpdate} />
            ))}
        </div>
    );
};

export default CommentList;
