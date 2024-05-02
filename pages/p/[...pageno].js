import { useState, useEffect, useContext } from 'react';
import Mstyles from '/styles/customstyle.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'


import MainNavBar from '/src/components/Parts/Navbar/MainNavBar'

import { useRouter, useParams } from 'next/router'

import Feedlist from '../../src/components/user/FeedList'
import Categories from '/src/components/user/Categories'
import HomeAsideAddLaptop from '/src/components/user/Addbox/HomeAsideAddLaptop'

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
    if(PostData){
      setLoading(false)
    }
    Contextdata.ChangeMainLoader(false)

  }, [Contextdata.UserData]);




  return (
    <div>
      <MainNavBar />

      <div className={Mstyles.Fullbg}>
        <div className={Mstyles.Container}>
          <div className={Mstyles.SecDevider}></div>
          <div className={Mstyles.FeedSection}>
            <div className={Mstyles.FeedSectionA}>
              <Categories />
            </div>
            <div className={Mstyles.FeedSectionB}>
              {!Loading &&
                <Feedlist PostData={PostData} />

              }

            </div>



            <div className={Mstyles.FeedSectionC}>
              <HomeAsideAddLaptop />
            </div>
          </div>
        </div>
      </div>
      <div className={Mstyles.SecDevider}></div>
    </div>
  )
}

export default Home;
