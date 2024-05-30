import { useState, useEffect, useContext } from 'react';
import Mstyles from '/styles/mainstyle.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'
import Head from 'next/head';
import GroupLayout from './Comp/GroupLayout';
import { useRouter, useParams } from 'next/router'

import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

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
      <GroupLayout>

      </GroupLayout>

    </div>



  )
}

export default Home;
