import React, { useState, useEffect, useContext } from 'react';
import Mstyles from '/styles/mainstyle.module.css';
import { LuPencilLine } from "react-icons/lu";
import { useRouter, useParams } from 'next/router'

import CheckloginContext from '/context/auth/CheckloginContext'

const FloatingButton = () => {
    const router = useRouter();
    const Contextdata = useContext(CheckloginContext)
    return (
        <div>
            {Contextdata.UserData && Contextdata.UserData.Role === 1 &&

                <div className={Mstyles.floatingButton} onClick={() => router.push(`/user/post/create_post`)}>
                    <div className={Mstyles.FbuttonBox}
                       
                    >
                        <div className={Mstyles.FbuttonBoxA}>
                            <LuPencilLine />
                        </div>
                        <div className={Mstyles.FbuttonBoxB}>
                            <span>Create Post</span>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default FloatingButton;
