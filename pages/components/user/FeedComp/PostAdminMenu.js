
import React, { useState, useEffect, useContext } from 'react';


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import CheckloginContext from '/context/auth/CheckloginContext'

import { LuEye, LuPencilLine, LuTrash2, LuPin, LuPinOff } from "react-icons/lu";
import { useRouter } from 'next/router'

const PostAdminMenu = ({ PostData }) => {
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
    const [PindeP, setPindeP] = useState(false);


    useEffect(() => {
        setPindeP(PostData.IsPined)
       
       console.log(PostData.PostData)

    }, [PostData.PostData]);

    
    const DeletePost = async (e) => {
        let text = "Do you really want to delete This Post ?";
        if (confirm(text) == true) {

            const sendUM = {

                PostData: PostData.PostData
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

    const PinPost = async (PD) => {

        if (Contextdata.UserLogin) {

            if (PindeP) {
                setPindeP(false)
            } else {
                setPindeP(true)
            }
            const sendUM = {

                PostData: PD,
            }
            const data = await fetch("/api/user/pin_post", {
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
                        if (PindeP) {
                            setPindeP(false)
                            Contextdata.ChangeAlertData('Post Unpined', 'success')
                        } else {
                            Contextdata.ChangeAlertData('Post Pined', 'success')
                        }
                      

                    } else {
                        Contextdata.ChangeAlertData('Unable to update ', 'warning')
                    }


                })
        } else {
            router.push('/account/user_login')
        }

    }


    return (
        <div>

            {Contextdata.UserData && Contextdata.UserData.Role === 1 &&

                <div>
                    <MenuItem onClick={() => PinPost(PostData.PostData)}>
                        <ListItemIcon>
                            {PindeP ? <LuPinOff /> : <LuPin />}
                        </ListItemIcon>
                        {PindeP ? 'Unpin Post' : 'Pin Post'}
                    </MenuItem>
                    <MenuItem onClick={() => router.push(`/p/edit/${PostData.PostData.PostID}`)}>
                        <ListItemIcon>
                            <LuPencilLine />
                        </ListItemIcon>
                        Edit Post
                    </MenuItem>
                    <MenuItem onClick={() => DeletePost(PostData.PostData)}>
                        <ListItemIcon>
                            <LuTrash2 />
                        </ListItemIcon>
                        Delete Post
                    </MenuItem>

                </div>

            }


        </div>
    )
}

export default PostAdminMenu
