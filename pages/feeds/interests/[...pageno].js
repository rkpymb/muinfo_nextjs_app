import { useState, useEffect, useContext } from 'react';
import Mstyles from '/styles/customstyle.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'

import Layout from '../../components/Layout';

import { useRouter, useParams } from 'next/router'

import Feedlist from '../../components/user/FeedList'
import NavbarTitle from '../../../src/components/Parts/Navbar/NavbarTitle';


export async function getServerSideProps(context) {

  const bycat = context.query.pageno[0];
  console.log(bycat)
  return {

    props: { bycat }, // will be passed to the page component as props
  }

}

function Home({ bycat }) {

  const router = useRouter();
  const Contextdata = useContext(CheckloginContext)
  const [Loading, setLoading] = useState(true);

  useEffect(() => {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (bycat) {
      setLoading(false);

    }

    Contextdata.ChangeMainLoader(false)
  }, [router.query, Contextdata.UserData]);




  return (
    <div>
      <Layout>
        <NavbarTitle Title={bycat.toUpperCase()} />

        <div>
          <Feedlist bycat={bycat} />

        </div>
      </Layout>

    </div>



  )
}

export default Home;
