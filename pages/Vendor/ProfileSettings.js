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
import EditProfileData from '/src/components/Vendors/EditProfileData'

import Head from 'next/head';

import VendorDBNavbar from '/src/components/Parts/Navbar/VendorDBNavbar'

import NavbarTitle from '/src/components/Parts/Navbar/NavbarTitle'

import { AppDesc, AppName } from '/Data/config'
import { useRouter, useParams } from 'next/router'

function Home() {
  const Contextdata = useContext(CheckloginContext)
  const [Loading, setLoading] = useState(true);
  const [PTitle, setPTitle] = useState('Profile Settings');
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (Contextdata.VendorLogin) {
      setLoading(false);
    }
  }, [Contextdata.UserData]);
  return (
    <div>
      <Head>
        <title>Edit Profile</title>
      </Head>
      <VendorDBNavbar />
      <div className={Mstyles.NavDevidevendor}></div>
      <NavbarTitle Title={PTitle} />

      {!Loading &&
        <div className={Mstyles.MainVContainer}>
          <EditProfileData />


        </div>
      }






    </div>
  )
}

export default Home;
