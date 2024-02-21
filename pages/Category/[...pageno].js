import { useState, useEffect, useContext } from 'react';
import {
  Typography,
  Box,
  Card,
  Container,
  Button,
  styled
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import NavbarTitle from '/src/components/Parts/Navbar/NavbarTitle'
import MobileFooter from '/src/components/Parts/Footers/MobileFooter'

import { MediaFilesUrl, FeedimgFolder, MediaFilesFolder } from '/Data/config'
import Mstyles from '/Styles/mainstyle.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'
import Head from 'next/head';

import MainNavBar from '/src/components/Parts/Navbar/MainNavBar'
import Nothingfound from '../../src/components/Parts/Nothingfound'

import VbyMainCat from '../components/List/VbyMainCat'
import Footer from '/src/components/Parts/Footer'

import { AppDesc, AppName } from '/Data/config'
import { useRouter, useParams } from 'next/router'

export async function getServerSideProps(context) {
  const slug = context.query.pageno[0];
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug: slug, token: process.env.MYKEY })
  };
  const response = await fetch(`${process.env.API_URL}Openendpoint/MainCatData`, requestOptions);
  const MData = await response.json();
  console.log(MData)


  return {

    props: { MData }, // will be passed to the page component as props
  }

}

function Home({ MData }) {
  const [PTitle, setPTitle] = useState('Category');
  const [IsData, setIsData] = useState(false);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    if (MData.CatData.length == 1) {
      setPTitle(`Category / ${MData.CatData[0].title}`)
      console.log(MData)
      setIsData(true)

    } else {
      setIsData(false)

      setPTitle(`Category not Found`)
    }
    setLoading(false)

  });

  return (
    <div>


      <MainNavBar />

      <div className={Mstyles.NavDevidevendor}></div>
      {!Loading &&

        <div>
          <NavbarTitle Title={PTitle} />
          <div className={Mstyles.SecDevider}></div>
          {!IsData ? <div>
            <Nothingfound Title={`Category not Found`} DescData={`Which url you are trying to visit , that's not found or Private`} />

          </div> :
            <div>
              <div className={Mstyles.Fullbg}>
                <div className={Mstyles.MainBox}>
                  <VbyMainCat Catdata={MData.CatData[0]} />
                </div>
              </div>
            </div>}
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
