import { useState, useEffect, useContext } from 'react';


import Mstyles from '/Styles/mainstyle.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'
import Nothingfound from '/src/components/Parts/Nothingfound'
import { MediaFilesUrl, MediaFilesFolder, FeedimgFolder } from '/Data/config';
import Head from 'next/head';

import MainNavBar from '/src/components/Parts/Navbar/MainNavBar'
import UserSidemenu from '/src/components/Parts/UserSidemenu'
import AddboxA from '/src/components/Parts/AddboxA'



import Footer from '/src/components/Parts/Footer'
import MobileFooter from '/src/components/Parts/Footers/MobileFooter'
import PostbyId from '../components/List/PostbyId'

import { useRouter, useParams } from 'next/router'

export async function getServerSideProps(context) {
  const PostID = context.query.pageno[0];
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ PostID: PostID, page: 1, limit: 1, token: process.env.MYKEY })
  };
  const response = await fetch(`${process.env.API_URL}Openendpoint/PostbyId`, requestOptions);
  const PostData = await response.json();
  return {

    props: { PostData }, // will be passed to the page component as props
  }

}

function Home({ PostData }) {
  const router = useRouter();
  const Contextdata = useContext(CheckloginContext)
  const [Loading, setLoading] = useState(true);
  const [NotF, setNotF] = useState(false);
  useEffect(() => {
    console.log(PostData)
    // CheckUSerLogin()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (PostData.FeedList) {
      if (PostData.FeedList.length == 1) {
        setNotF(false)
      } else {
        setNotF(true)
      }
    } else {
      setNotF(true)
    }
    setLoading(false)
    Contextdata.ChangeMainLoader(false)
  }, [Contextdata.UserData]);

  const CheckUSerLogin = async () => {
    if (localStorage.getItem('UserToken')) {
    } else {
      router.push('/Login')
    }
  }



  return (
    <div>

      {!Loading && NotF == false &&

        <Head>
          <title>{PostData && `${PostData.FeedList[0].VD.name} : ${PostData.FeedList[0].PostData.PostText}`} </title>
          <meta name="description" content={PostData && `${PostData.FeedList[0].PostData.PostText}`} />
          <meta property="og:image" content={PostData && `${MediaFilesUrl}${FeedimgFolder}/${PostData.FeedList[0].PostData.PostList[0].postData}`} />

        </Head>

      }
      <MainNavBar />


      <div className={Mstyles.Fullbg}>

        {!Loading &&
          <div>


            {!NotF &&
              <div>
                <div className={Mstyles.HomeFlexBoxSticky}>
                  <div className={Mstyles.HomeFlexBoxStickyA}>
                    <UserSidemenu TabindexNow={1} />
                    <div style={{ height: '150px' }}></div>
                  </div>
                  <div className={Mstyles.HomeFlexBoxStickyB}>
                    {!Loading &&
                      <div className={Mstyles.Feedlistboxhome}>
                        <PostbyId PostData={PostData} />

                      </div>

                    }
                  </div>
                  <div className={Mstyles.HomeFlexBoxStickyC}>
                    <AddboxA />
                    <div style={{ height: '20px' }}></div>
                    {/* <Subcatlist /> */}
                    <div style={{ height: '20px' }}></div>
                    <div style={{ height: '150px' }}></div>
                  </div>
                </div>

              </div>


            }


            {NotF &&
              <Nothingfound Title={`Post Not Found`} DescData={`which url you are tying to visit not found or private`} />

            }

            <Footer />
            <MobileFooter />
          </div>
        }
      </div>


      <div style={{ height: '50px' }}></div>
    </div>
  )
}

export default Home;
