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
import Searchbox from '/src/components/Parts/Searchbox'
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
import VendorList from './components/List/VendorList'
import PostersliderlistWebsite from './components/List/PostersliderlistWebsite'

import Footer from '/src/components/Parts/Footer'
import MobileFooter from '/src/components/Parts/Footers/MobileFooter'
import HomeFeedlist from './components/List/HomeFeedlist'
import MainMenubox from '/src/components/Parts/MainMenubox'


import { AppDesc, AppName } from '../Data/config'
import { useRouter, useParams } from 'next/router'

function Home() {
  const Contextdata = useContext(CheckloginContext)
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (Contextdata.UserLogin) {
      setLoading(false);
    }
  }, [Contextdata.UserData]);
  return (
    <div>

      <MainNavBar />
      <div className={Mstyles.SubHeaderBox}>
        <div className={Mstyles.SubHeaderBoxBg}>
          <div className={Mstyles.SBBoxBgicon}>
            <div className={Mstyles.SBBoxBgiconA}>
              <div className="decore-zigzag">
                <svg xmlns="http://www.w3.org/2000/svg" width="65.76062" height="10.94" viewBox="0 0 65.76062 20.94" creator="Katerina Limpitsouni"><path d="M3.0696,14.35003c14.77852-4.66461,30.54831-5.6899,45.76236-2.61603,4.44585,.89825,8.8161,2.1243,13.095,3.6261,1.274,.44715,2.73515-.50817,3.0753-1.7461,.37901-1.37937-.46745-2.62652-1.7461-3.0753C47.82195,5.12165,31.2588,3.6356,15.11839,6.30519c-4.53218,.74961-8.99807,1.84099-13.37799,3.22345C-1.31727,10.49374-.01125,15.32246,3.0696,14.35003h0Z" fill="#ffc44f" origin="undraw" /><path d="M55.97417,3.76117l2.58581,4.86421,1.32984,2.5016,.66492,1.2508c.08649,.16269,.16913,.42327,.29552,.55591-.51452-.53997,1.42541-2.15361,.51312-1.82543-.8054,.28974-1.58804,.8423-2.34456,1.24356-.82749,.4389-1.65498,.87781-2.48247,1.31671-1.65498,.87781-3.30996,1.75562-4.96494,2.63342-1.15699,.61367-1.60767,2.31798-.89688,3.42047,.75851,1.17651,2.18291,1.55329,3.42047,.89688,1.93081-1.02411,3.86162-2.04822,5.79243-3.07233,.91943-.48767,1.83887-.97534,2.7583-1.46301,1.14784-.60882,2.34415-1.1119,2.8815-2.38522,.54904-1.30103,.0367-2.54313-.58127-3.70559l-1.55149-2.91853c-1.03432-1.94569-2.06865-3.89137-3.10297-5.83706-.61473-1.15638-2.31725-1.60814-3.42047-.89688-1.17565,.75796-1.55443,2.18355-.89688,3.42047h0Z" fill="#ffc44f" /></svg>
              </div>
              <div className="decore-zigzag">
                <svg xmlns="http://www.w3.org/2000/svg" width="40.36113" height="18.9054" viewBox="0 0 40.36113 38.9054" creator="Katerina Limpitsouni"><path d="M19.70556,28.00919c-2.15592,.90546-4.01062,2.14927-5.9324,3.46355-1.74319,1.19215-3.45366,2.2581-5.57536,2.57124l3.0753,3.0753c.36799-2.4042,.73597-4.80841,1.10396-7.21261,.17173-1.12196,.34367-2.24389,.51518-3.36589,.18989-1.24225-.08272-1.99141-.72587-3.03697-2.21289-3.59747-5.11125-6.61693-8.49624-9.12248l-1.2618,4.65868c2.33234-.04929,4.67205-.31811,6.95089-.82282,1.03157-.22847,2.0518-.50936,3.05482-.8415,1.07006-.35434,2.42645-.69147,3.26101-1.46913,.7761-.7232,1.05584-1.76394,1.44445-2.722l1.30082-3.20695,2.78747-6.87205-4.56937,.5972c2.35108,3.18379,4.31642,6.6451,5.72596,10.3473,.39725,1.04338,1.23531,1.8354,2.4107,1.8354,1.05531,0,2.17889-.77044,2.4107-1.8354l.06286-.28881-2.4107,1.8354,13.02955,1.50949-1.76777-4.26777c-1.71654,1.80345-3.43307,3.60691-5.14961,5.41036-.80105,.84161-1.6021,1.68322-2.40315,2.52484-.65014,.68306-1.46133,1.3468-1.7001,2.2974-.26878,1.07008-.13372,2.40093-.0944,3.49576,.03954,1.10106,.13044,2.19869,.26291,3.2923,.2928,2.41726,.76858,4.78544,1.47107,7.1175l3.0753-3.0753c-1.82897-.61231-3.57117-1.3839-5.24823-2.33841-1.34755-.76697-3.19716-1.67852-4.17557-2.91069-.8403-1.05824-2.65757-.87796-3.53553,0-1.04529,1.04529-.84245,2.47459,0,3.53553,.58278,.73393,1.5591,1.30313,2.31477,1.84768,.92372,.66565,1.88322,1.28163,2.87274,1.84482,2.04151,1.16194,4.21654,2.09719,6.44263,2.84245,1.80592,.6046,3.60651-1.31182,3.0753-3.0753-.59267-1.9675-1.07053-3.98077-1.32005-6.02267-.12398-1.01452-.19864-2.03659-.23532-3.05793-.01694-.47164-.02503-.94367-.02418-1.41562,.00056-.31466,.00508-.62927,.01357-.94382-.05945,.1572-.0749,.18411-.04634,.08072l-.64293,1.10317c2.86089-3.00576,5.72179-6.01152,8.58268-9.01727,1.61333-1.69502,.32239-4.02562-1.76777-4.26777l-13.02955-1.50949c-1.02577-.11884-2.19771,.85688-2.4107,1.8354l-.06286,.28881h4.8214c-1.56857-4.11988-3.60924-7.99271-6.23-11.54169-1.34395-1.81996-3.73271-1.46546-4.56937,.5972l-4.64578,11.45341,.64293-1.10317-.28037,.28083,1.10317-.64293c-3.46066,1.40546-7.0623,2.19657-10.79801,2.27552-2.64815,.05597-3.1784,3.24001-1.2618,4.65868,2.96338,2.19349,5.38831,5.02497,7.22417,8.21039l-.25202-1.9264c-.74216,3.55154-1.11793,7.2203-1.66698,10.80741-.30706,2.00613,1.07824,3.37004,3.0753,3.0753,4.55314-.672,7.44735-4.32947,11.50776-6.03479,1.24392-.52243,2.13685-1.65343,1.7461-3.0753-.32232-1.17288-1.82249-2.27226-3.0753-1.7461Z" fill="#ffc44f" origin="undraw" /></svg>
              </div>




            </div>





          </div>
        </div>
        <div className={Mstyles.SubHeaderBoxOverlay}>

          <div className={Mstyles.SHBox}>
            <div className={Mstyles.SHBoxA}>
              <div className={Mstyles.SHBoxATitle}>
                <h1>Search Best Vendors nearby !</h1>
                <span>Flair my event is best platform to find best rated vendor for your succresfull events and patry.</span>
              </div>
              <div style={{ height: '20px' }}></div>
              <Searchbox SType={1} />
            </div>
            <div className={Mstyles.SHBoxB}>

            </div>

          </div>

        </div>
      </div>

      {!Loading &&
        <div className={Mstyles.Fullbg}>
          <div className={Mstyles.MainBox}>
            <VendorList />
            <div style={{ height: '20px' }}></div>
            <CatlistGrid />

          </div>
        </div>
      }

      <Footer />
      <div className={Mstyles.OnlyMobile}>
        <MobileFooter />
      </div>





    </div>
  )
}

export default Home;
