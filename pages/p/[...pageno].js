import { useState, useEffect, useContext } from 'react';
import Mstyles from '/styles/customstyle.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'

import Layout from '../components/Layout';
import { useRouter, useParams } from 'next/router'

import Feedlist from '../components/user/FeedList'

export async function getServerSideProps(context) {
  const PostID = context.query.pageno[0];
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ PostID: PostID, token: process.env.MYKEY })
  };
  const response = await fetch(`${process.env.API_URL}user/feed_post_data`, requestOptions);
  const p = await response.json();
  const PostData = p.DataList;
  return {

    props: { PostData }, // will be passed to the page component as props
  }

}

function Home({ PostData }) {
  const router = useRouter();
  const Contextdata = useContext(CheckloginContext)
  const [Loading, setLoading] = useState(true);

  useEffect(() => {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (PostData) {
      setLoading(false)
    }
    Contextdata.ChangeMainLoader(false)

  }, [Contextdata.UserData]);




  return (
    <Layout>

      <div>

        {!Loading &&
          <Feedlist PostData={PostData} />

        }
      </div>
    </Layout>
  )
}

export default Home;
