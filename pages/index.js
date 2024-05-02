import { useState, useEffect, useContext } from 'react';
import Mstyles from '/styles/customstyle.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'
import Head from 'next/head';

import MainNavBar from '../src/components/Parts/Navbar/MainNavBar'
import { AppDesc, AppName } from '/Data/config'
import { useRouter, useParams } from 'next/router'
import AddPost from './components/user/AddPost'
import Feedlist from './components/user/FeedList'
import Categories from './components/user/Categories'
import HomeAsideAddLaptop from './components/user/Addbox/HomeAsideAddLaptop'

function Home() {
  const router = useRouter();
  const Contextdata = useContext(CheckloginContext)
  const [Loading, setLoading] = useState(true);

  useEffect(() => {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

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
                <div className={Mstyles.AddPostHome}>
                  <AddPost />

                </div>
                <Feedlist />
              </div>
              <div className={Mstyles.FeedSectionC}>
                <HomeAsideAddLaptop />

                <div className={Mstyles.SecDevider}></div>
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
