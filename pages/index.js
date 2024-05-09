import { useState, useEffect, useContext } from 'react';
import Mstyles from '/styles/customstyle.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'
import Head from 'next/head';
import Layout from './components/Layout';

import { useRouter, useParams } from 'next/router'
import AddPost from './components/user/AddPost'
import Feedlist from './components/user/FeedList'

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
            <div className={Mstyles.AddPostHome}>
                <AddPost />

              </div>
              <Feedlist />
            </div>
        </Layout>

    </div>



  )
}

export default Home;
