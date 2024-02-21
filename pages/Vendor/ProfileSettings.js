import React, { useState, useEffect, useContext } from 'react';


const ariaLabel = { 'aria-label': 'description' };


import EditProfileData from '/src/components/Vendors/EditProfileData'

import CheckloginContext from '/context/auth/CheckloginContext'
import VendorDBNavbar from '/src/components/Parts/Navbar/VendorDBNavbar'
import VendorDBNavbarTitle from '/src/components/Parts/Navbar/VendorDBNavbarTitle'


import Mstyles from '/Styles/mainstyle.module.css'

import Head from 'next/head';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { useRouter, useParams } from 'next/router'

function Overview() {
  const router = useRouter()
  const [PTitle, setPTitle] = useState('Profile Settings');
  const [Loading, setLoading] = useState(true);
  const [Tabindex, setTabindex] = useState(0);
  const Contextdata = useContext(CheckloginContext)
  const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
  const notify = (T) => toast(T, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  useEffect(() => {
    if (Contextdata.VendorLogin == true) {
      setLoading(false)
    }
  }, [Contextdata.VendorLogin]);


  const Switchtab = async (e) => {
    setTabindex(e)
    window.scrollTo(1, 0)

  }

  return (

    <>
      <Head>
        <title>Flair My Event : Dashboard</title>
      </Head>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <ToastContainer />


      {!Loading &&


        <div>
          <VendorDBNavbar />
          <div>
            <div className={Mstyles.TopImgHeaderbox}>
              <div className={Mstyles.TopImgHeaderboxCover}>
                <div className={Mstyles.TopImgHeaderboxCoverInner}>
                  <div className={Mstyles.Vtitlem}>
                    <span>{PTitle}</span>
                  </div>
                </div>
              </div>
            </div>
            <VendorDBNavbarTitle Title={PTitle} />

            <div className={Mstyles.MainVContainer}>
            <EditProfileData />
              

            </div>



          </div>



        </div>

      }

    </>

  );
}

export default Overview;

