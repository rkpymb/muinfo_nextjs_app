import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments = [], onReply, onDelete, activeCommentId, setActiveCommentId, OnUpdate }) => {
    return (
        <>
            {comments.map((comment) => (
                <Comment
                    key={comment.CmtData?.CmtID} // Using optional chaining to avoid errors if CmtData is undefined
                    comment={comment}
                    onReply={onReply}
                    onDelete={onDelete}
                    activeCommentId={activeCommentId}
                    setActiveCommentId={setActiveCommentId}
                    OnUpdate={OnUpdate}
                />
            ))}
        </>
    );
};

export default CommentList;
