import { useState, useEffect, useContext } from 'react';
import Mstyles from '/styles/customstyle.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'
import Head from 'next/head';
import EditProfileData from '../../components/user/EditProfileData'
import AddPost from '../../components/user/AddPost'
import MainNavBar from '/src/components/Parts/Navbar/MainNavBar'
import { AppDesc, AppName } from '/Data/config'
import { useRouter, useParams } from 'next/router'
import NavbarTitle from '/src/components/Parts/Navbar/NavbarTitle';
function Create_post() {
    const router = useRouter();
    const Contextdata = useContext(CheckloginContext)
    const [Loading, setLoading] = useState(true);

    useEffect(() => {

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });


        if (Contextdata.UserLogin) {
            setLoading(false)
            Contextdata.ChangeMainLoader(false)
        }

    }, [Contextdata.UserData]);




    return (
        <div>
            <MainNavBar />
            <NavbarTitle Title={`Create Post`} />
            {!Loading &&
                <div className={Mstyles.Fullbg}>
                    <div className={Mstyles.Container}>
                        <div className={Mstyles.SecDevider}></div>

                        <div className={Mstyles.CreatePostSec}>

                            <AddPost />
                        </div>

                    </div>
                </div>

            }



            <div className={Mstyles.SecDevider}></div>

        </div>



    )
}

export default Create_post;
