import { useState, useEffect, useContext } from 'react';
import Mstyles from '/styles/customstyle.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'

import Layout from '../components/Layout';
import { useRouter, useParams } from 'next/router'
import { MediaFilesUrl, MediaFilesFolder, FeedimgFolder } from '/Data/config';
import Feedlist from '../components/user/FeedList'
import Head from 'next/head'

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
  const [PostFeed, setPostFeed] = useState(null);

  useEffect(() => {
    console.log('PostData')
    console.log(PostData[0])
    if (PostData.length > 0) {
      setPostFeed(PostData[0])
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (PostData) {
      setLoading(false)
    }
    Contextdata.ChangeMainLoader(false)

  }, [Contextdata.UserData]);


  function stripHtml(html) {
    // Create a temporary DOM element
    const div = document.createElement("div");
    // Assign the HTML content to the div
    div.innerHTML = html;
    // Get the plain text content by accessing the innerText property
    return div.innerText;
  }

  return (
    <Layout>

      <div>

        <Head>
          <title>{PostFeed && stripHtml(PostFeed.PostData.PostText).slice(0, 30)}</title>
          <meta name="description" content={PostFeed && stripHtml(PostFeed.PostData.PostText).slice(0, 30)} />
          <meta property="og:image" content={PostFeed && PostFeed.PostData.PostList[0].postData} />
        </Head>

        {!Loading &&
          <Feedlist PostData={PostData} />

        }
      </div>
    </Layout>
  )
}

export default Home;
