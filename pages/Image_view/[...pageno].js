import { useState, useEffect, useContext } from 'react';
import Mstyles from '/styles/mainstyle.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'

import { useRouter, useParams } from 'next/router'
import { MediaFilesUrl, MediaFilesFolder, FeedimgFolder } from '/Data/config';

export async function getServerSideProps(context) {
  const ImgFile = context.query.pageno[0];

  return {

    props: { ImgFile }, // will be passed to the page component as props
  }

}

function Home({ ImgFile }) {
  const router = useRouter();
  const Contextdata = useContext(CheckloginContext)
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    console.log('ImgFile')
    console.log(ImgFile)
    if (ImgFile) {
      Contextdata.ChangeMainLoader(false)
      setLoading(false);
    }

  }, [router.query]);



  return (
    <div className={Mstyles.Blackbg}>
     <div className={Mstyles.Fullimgbox}>
      {Loading ?
        <div>Loading..</div> :
        <div>
          <img
            src={`${MediaFilesUrl}${FeedimgFolder}/${ImgFile}`}
            alt="image"
           

          />
        </div>
      }


    </div>
    </div>
  )
}

export default Home;
