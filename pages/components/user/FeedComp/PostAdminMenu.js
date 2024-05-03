
import React, { useState, useEffect, useContext } from 'react';


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';

import { LuEye, LuPencilLine, LuTrash2 } from "react-icons/lu";
import { useRouter } from 'next/router'

const PostAdminMenu = ({ PostData }) => {
    const router = useRouter()

    const DeletePost = async (e) => {
        let text = "Do you really want to delete This Post ?";
        if (confirm(text) == true) {

            const sendUM = {

                PostData: PostData
            }
            const data = await fetch("/api/user/delete_post", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {

                    if (parsed.ReqData.done) {
                        alert("Post deleted successfully")
                        router.push('/')

                    } else {
                        alert('Something went wrong')
                    }



                })
        }



    };


    return (
        <div>
            <MenuItem onClick={() => router.push(`/p/edit/${PostData.PostID}`)}>
                <ListItemIcon>
                    <LuPencilLine />
                </ListItemIcon>
                Edit Post
            </MenuItem>
            <MenuItem onClick={() => DeletePost(PostData)}>
                <ListItemIcon>
                    <LuTrash2 />
                </ListItemIcon>
                Delete Post
            </MenuItem>

        </div>
    )
}

export default PostAdminMenu
