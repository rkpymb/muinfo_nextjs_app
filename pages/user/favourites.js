import { useState, useEffect, useContext } from 'react';
import Mstyles from '/styles/customstyle.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'

import Layout from '../components/Layout';

import { useRouter, useParams } from 'next/router'

import UserFavouritePosts from '../components/user/UserFavouritePosts'

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
           
              <UserFavouritePosts />
            </div>
        </Layout>

    </div>



  )
}

export default Home;
