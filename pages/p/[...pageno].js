import { useState, useEffect, useContext } from 'react';
import Mstyles from '/styles/customstyle.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'

import Layout from '../components/Layout';
import { useRouter, useParams } from 'next/router'
import { MediaFilesUrl, MediaFilesFolder, FeedimgFolder } from '/Data/config';
import Feedlist from '../components/user/FeedList'
import Head from 'next/head'
import Comments from '../components/user/FeedComp/CommentSystem/Comments';
export async function getServerSideProps(context) {
  const PostID = context.query.pageno[0];
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ PostID: PostID, token: process.env.MYKEY })
  };
  const response = await fetch(`${process.env.API_URL}user/feed_post_data`, requestOptions);
  const p = await response.json();
  const PostData = p.DataList || null;

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
    console.log(PostData)
    if (PostData) {

      setLoading(false)
      Contextdata.ChangeMainLoader(false)
    } else {
      alert('Post Not Found')
      router.push('/feeds')
    }


  }, [Contextdata.UserData]);



  return (
    <div>
      <div>

        <Head>
          <title>{PostData && `${PostData[0].PostData.MetaTagData.og_title}`}</title>
          <meta property="og:title" name="og:title" content={PostData && `${PostData[0].PostData.MetaTagData.og_title}`} />
          <meta name="description" property="og:description" content={PostData && `${PostData[0].PostData.MetaTagData.og_description}...`} />
          <meta property="og:image" name="og:image" content={PostData && `https://api.magadhuniversityinfo.com/content/${PostData[0].PostData.MetaTagData.og_image}`} />
          <meta property="og:url" name="og:url" content={PostData && `https://magadhuniversityinfo.com/p/${PostData[0].PostData.MetaTagData.og_url}`} />

        </Head>


        {!Loading &&
          <Layout>
            <Feedlist PostData={PostData} />

            <div>
              <Comments PostData={PostData[0].PostData} />
            </div>
          </Layout>




        }
      </div>

    </div>
  )
}

export default Home;
