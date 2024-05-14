import { useState, useEffect, useContext } from 'react';
import Mstyles from '/styles/mainstyle.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'
import Head from 'next/head';
import Layout from '../components/Layout';

import { useRouter, useParams } from 'next/router'
import PinnedPostList from '../components/user/PinnedPostList'
import Feedlist from '../components/user/FeedList'
import Categories from '../components/user/Categories'
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
      <Layout>

        <div>
        {isMobile &&
            <div className={Mstyles.MobileCatbox}>
              <div className={Mstyles.MobileCatboxCover}>
              <Categories />
            </div>
            </div>
          }
          <PinnedPostList/>
          
          <Feedlist />
        </div>
      </Layout>

    </div>



  )
}

export default Home;
