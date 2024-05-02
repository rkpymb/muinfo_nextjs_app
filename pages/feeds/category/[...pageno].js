import { useState, useEffect, useContext } from 'react';
import Mstyles from '/Styles/customstyle.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'
import Head from 'next/head';

import MainNavBar from '/src/components/Parts/Navbar/MainNavBar'
import { AppDesc, AppName } from '/Data/config'
import { useRouter, useParams } from 'next/router'
import AddPost from '/src/components/User/AddPost'
import Feedlist from '/src/components/User/Feedlist'
import Categories from '/src/components/User/Categories'
import HomeAsideAddLaptop from '/src/components/User/Addbox/HomeAsideAddLaptop'

export async function getServerSideProps(context) {
    const slug = context.query.pageno[0];
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: slug, token: process.env.MYKEY })
    };
    const response = await fetch(`${process.env.API_URL}user/category_data`, requestOptions);
    const MData = await response.json();
    console.log(MData)


    return {

        props: { MData }, // will be passed to the page component as props
    }

}

function Home({ MData }) {
    const router = useRouter();
    const Contextdata = useContext(CheckloginContext)
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(MData.CatData.slug)
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        setLoading(false)
        Contextdata.ChangeMainLoader(false)

    }, [Contextdata.UserData]);




    return (
        <div>
            <MainNavBar />

            <div className={Mstyles.Fullbg}>
                <div className={Mstyles.Container}>
                    <div className={Mstyles.SecDevider}></div>
                    <div className={Mstyles.FeedSection}>
                        <div className={Mstyles.FeedSectionA}>
                            <Categories />
                        </div>
                        <div className={Mstyles.FeedSectionB}>
                            <Feedlist bycat={`${MData.CatData.slug}`} />
                        </div>

                        <div className={Mstyles.FeedSectionC}>
                            <HomeAsideAddLaptop />
                        </div>
                    </div>
                </div>
            </div>
            <div className={Mstyles.SecDevider}></div>
        </div>
    )
}

export default Home;
