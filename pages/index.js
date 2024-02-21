import { useState, useEffect, useContext } from 'react';
import {
  Typography,
  Box,
  Card,
  Container,
  Button,
  styled
} from '@mui/material';


import Mstyles from '/Styles/mainstyle.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'


import Head from 'next/head';

import MainNavBar from '/src/components/Parts/Navbar/MainNavBar'
import UserSidemenu from '/src/components/Parts/UserSidemenu'
import AddboxA from '/src/components/Parts/AddboxA'
import MenuNavBar from '/src/components/Parts/Navbar/MenuNavBar'

import HomeSideMenu from '/src/components/Parts/HomeSideMenu'
import PostBoxUser from '/src/components/Parts/PostBoxUser'
import MainHerobox from '/src/components/Parts/HeroBox/MainHerobox'
import CatlistGridHome from './components/List/CatlistGridHome'
import CatlistGrid from './components/List/CatlistGrid'
import Subcatlist from './components/List/Subcatlist'
import VendorSlider from './components/List/VendorSlider'
import PostersliderlistWebsite from './components/List/PostersliderlistWebsite'

import Footer from '/src/components/Parts/Footer'
import MobileFooter from '/src/components/Parts/Footers/MobileFooter'
import HomeFeedlist from './components/List/HomeFeedlist'
import MainMenubox from '/src/components/Parts/MainMenubox'


import { AppDesc, AppName } from '../Data/config'
import { useRouter, useParams } from 'next/router'

function Home() {
  const router = useRouter();
  const Contextdata = useContext(CheckloginContext)
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    CheckUSerLogin()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (Contextdata.UserLogin && Contextdata.LocationData) {
      setLoading(false);
      Contextdata.ChangeMainLoader(false)
    }

  }, [Contextdata.UserData]);

  const CheckUSerLogin = async () => {
    if (localStorage.getItem('UserToken')) {
    } else {
      router.push('/Login')
    }
  }



  return (
    <div>
      <MainNavBar />
     
      <div className={Mstyles.Fullbg}>

        {!Loading &&
          <div>


            <div>
      
              
              <div className={Mstyles.MainHeroBox}>
              <MainHerobox />
              </div>

              <div className={Mstyles.MainBox}>
                <CatlistGridHome />
              </div>
              <div className={Mstyles.SecDevider}></div>
              <div className={Mstyles.MainBox}>
                <PostersliderlistWebsite />
              </div>
              <div className={Mstyles.SecDevider}></div>
              <div className={Mstyles.HomeFlexBoxSticky}>
                <div className={Mstyles.HomeFlexBoxStickyA}>
                  <UserSidemenu />
                  <div style={{ height: '150px' }}></div>
                </div>
                <div className={Mstyles.HomeFlexBoxStickyB}>
                  <div className={Mstyles.Paddding10}>
                    <PostBoxUser />
                  </div>
                  <div className={Mstyles.SecDevider}></div>
                  {!Loading &&
                    <div className={Mstyles.Paddding10}>
                      <VendorSlider />
                    </div>

                  }

                  {!Loading &&
                    <div className={Mstyles.Feedlistboxhome}>
                      <HomeFeedlist />
                      
                    </div>

                  }
                </div>
                <div className={Mstyles.HomeFlexBoxStickyC}>
                  <AddboxA />
                  <div style={{ height: '20px' }}></div>
                  {/* <Subcatlist /> */}
                  <div style={{ height: '20px' }}></div>
                  <div style={{ height: '150px' }}></div>
                </div>
              </div>

            </div>


            <Footer />
            <MobileFooter />
          </div>

        }
      </div>
      <div style={{ height: '50px' }}></div>
    </div>
  )
}

export default Home;
