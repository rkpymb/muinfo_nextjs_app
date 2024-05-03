import React, { useState, useEffect, useContext } from 'react';
import Skeleton from '@mui/material/Skeleton';
import LoadingButton from '@mui/lab/LoadingButton';
import { FiChevronRight, FiEdit } from 'react-icons/fi';
import MstylesCustom from '/styles/customstyle.module.css'
import Mstyles from '/styles/mainstyle.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import 'react-quill/dist/quill.snow.css';
import Image from 'next/image';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'

import MainNavBar from '/src/components/Parts/Navbar/MainNavBar'

import { useRouter, useParams } from 'next/router'

import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

import {
  Typography,
  Box,

  Button,
  styled
} from '@mui/material';
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
  const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

  const [OpenCatBox, setOpenCatBox] = useState(false);
  const [scroll, setScroll] = useState('paper');

  const Contextdata = useContext(CheckloginContext)
  const [Loading, setLoading] = useState(true);

  const [PostText, setPostText] = useState('');
  const [EditorContent, setEditorContent] = useState('');

  const [Catimg, setCatimg] = useState('categories.png');
  const [LoadingSubmitPost, setLoadingSubmitPost] = useState(false);

  const [PostID, setPostID] = useState(null);
  const [Category, setCategory] = useState(null);
  const [CategoryText, setCategoryText] = useState('Select Post Category');
  const [Catlist, setCatlist] = useState([]);
  const handleEditorChange = (content) => {
    setEditorContent(content);
    setPostText(content);
  };

  const handleClose = () => {
    setOpenCatBox(false);
  };

  useEffect(() => {
    console.log(PostData)
    if (PostData.length > 0) {
      setPostText(PostData[0].PostData.PostText)
      setPostID(PostData[0].PostData.PostID)
      setCategory(PostData[0].CatData.slug)
      setCategoryText(PostData[0].CatData.title)
      setCatimg(PostData[0].CatData.image)

    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });


    if (Contextdata.UserLogin) {
      setLoading(false)
      Contextdata.ChangeMainLoader(false)
    }

  }, [Contextdata.UserData]);




  const SubmitPost = async (e) => {
    e.preventDefault();

    if (Category == null) {
      Contextdata.ChangeAlertData(`Please Select Post Category`, 'warning');
    }
    if (PostText == '') {
      Contextdata.ChangeAlertData(`Can't be Empty Text  `, 'warning');
    }
    if (Category !== null && PostText !== '') {
      setLoadingSubmitPost(true)
      const sendUM = {
        PostID: PostID,
        PostText: PostText,
        category: Category,
      }
      const data = await fetch("/api/user/update_post", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(sendUM)
      }).then((a) => {
        return a.json();
      })
        .then((parsed) => {

          setTimeout(function () {
            if (parsed.ReqData.done) {
             
              document.getElementById("ConentMedia").value = '';
              Contextdata.ChangeAlertData(`${parsed.ReqData.msg}`, 'success');
              window.location.reload();
            }

            if (!parsed.ReqData.done && parsed.ReqData.msg) {
              Contextdata.ChangeAlertData(`${parsed.ReqData.msg}`, 'warning');
            }
            if (parsed.ReqData.error) {
              Contextdata.ChangeAlertData(`${parsed.ReqData.error}`, 'warning');
            }
            setLoadingSubmitPost(false)
          }, 2000)


        })
    }




  }

  const GetCatList = async () => {
    setLoading(true)

    const sendUM = {}
    const data = await fetch("/api/user/category_list", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sendUM)
    }).then((a) => {
      return a.json();
    })
      .then((parsed) => {
        if (parsed.ReqData.MainCatList) {
          setCatlist(parsed.ReqData.MainCatList)
        }
        setLoading(false)
      })
  }

  const CatClick = (e) => {
    setCategory(e.slug)
    setCatimg(e.image)
    setCategoryText(e.title)
    setOpenCatBox(false);
  };

  const handleOpenCatBoxCatBox = (scrollType) => () => {

    setOpenCatBox(true);
    setScroll(scrollType);
    GetCatList()
  };

  return (
    <div>
      <MainNavBar />
      {!Loading &&
        <div className={MstylesCustom.Fullbg}>
          <div className={MstylesCustom.Container}>
            <div className={MstylesCustom.SecDevider}></div>

            <div className={MstylesCustom.EditPostContainer}>
              <form onSubmit={SubmitPost}>
                <div className={Mstyles.CatboxPost}>
                  <div className={Mstyles.PostAddonItem} onClick={handleOpenCatBoxCatBox('paper')}>
                    <div className={Mstyles.PostAddonItemA}>
                      <Image
                        src={`${MediaFilesUrl}${MediaFilesFolder}/${Catimg}`}
                        alt="image"

                        placeholder='blur'
                        width={30}
                        height={30}
                        quality={100}
                        blurDataURL={blurredImageData}

                      />
                    </div>
                    <div className={Mstyles.PostAddonItemB}>
                      <span>Post Category</span>
                      <small>{CategoryText}</small>
                    </div>

                  </div>
                </div>

                <div style={{ height: '10px' }}></div>
                <div className={Mstyles.PostTextBox}>

                  <ReactQuill
                    theme="snow" // You can change the theme as per your preference
                    value={PostText}
                    onChange={handleEditorChange}

                  />

                </div>
                <input type='hidden' id='ConentMedia' />
                <div style={{ height: '20px' }}></div>



                <div className={MstylesCustom.btnbbox}>
                  <LoadingButton
                    fullWidth
                    onClick={SubmitPost}
                    endIcon={<FiChevronRight />}
                    loading={LoadingSubmitPost}
                    loadingPosition="end"
                    variant="text"
                    type='submit'

                  >
                    <span>Update Post</span>
                  </LoadingButton>
                </div>
                <div style={{ height: '20px' }}></div>

              </form>
            </div>

          </div>
        </div>

      }

      <React.Fragment>

        <Dialog
          fullScreen={isMobile ? true : false}
          open={OpenCatBox}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Select post Interest</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <div>

              <div className={Mstyles.Modalwidth}></div>
              <div className={Mstyles.SCatGrid}>
                {Catlist.map((item, index) => {
                  return <div className={Mstyles.HomeCatGridItem} key={index} onClick={() => CatClick(item)}  >
                    <div className={Mstyles.HomeCatGridItemImageBox}>
                      <div className={Mstyles.HomeCatGridItemImage}>
                        <Image
                          src={`${MediaFilesUrl}${MediaFilesFolder}/${item.image}`}
                          alt=""
                          height={'100%'}
                          width={'100%'}
                          fill
                          blurDataURL={blurredImageData}
                          placeholder='blur'

                        />
                      </div>
                    </div>
                    <div className={Mstyles.HomeCatGridItemContent}>
                      <span className={Mstyles.OnlyDesktop}>{item.title.length > 12 ? `${item.title.slice(0, 12)} ...` : item.title}</span>
                      <span className={Mstyles.OnlyMobile}>{item.title.length > 10 ? `${item.title.slice(0, 10)} ...` : item.title}</span>
                    </div>



                  </div>

                }

                )}


              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>

          </DialogActions>
        </Dialog>
      </React.Fragment>

      <div className={Mstyles.SecDevider}></div>

    </div>



  )
}

export default Home;
