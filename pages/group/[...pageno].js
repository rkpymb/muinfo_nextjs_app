import { useState, useEffect, useContext } from 'react';
import Mstyles from '/styles/chat.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'
import Head from 'next/head';
import GroupLayout from './Comp/GroupLayout';
import GroupHeader from './Comp/GroupHeader';
import { useRouter, useParams } from 'next/router'

import { LuSendHorizonal, LuPlus, LuUsers2 } from "react-icons/lu";

import IconButton from '@mui/material/IconButton';

import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

import Image from 'next/image';
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
export async function getServerSideProps(context) {
  const GroupID = context.query.pageno[0];
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ GroupID: GroupID, token: process.env.MYKEY })
  };
  const response = await fetch(`${process.env.API_URL}user/group_data`, requestOptions);
  const Data = await response.json();

  const GroupData = Data.Group || null;

  return {

    props: { GroupData }, // will be passed to the page component as props
  }

}


function Home({ GroupData }) {
  const router = useRouter();
  const Contextdata = useContext(CheckloginContext)
  const [Loading, setLoading] = useState(true);

  const [MsgText, setMsgText] = useState();
  const [EditorContent, setEditorContent] = useState('');

  const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
  useEffect(() => {
    console.log('index page')

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (GroupData) {

      setLoading(false)
      Contextdata.ChangeMainLoader(false)
    } else {
      alert('Post Not Found')
      // router.push('/feeds')
    }



  }, [Contextdata.UserData]);


  const handleChange = (event) => {
    setMsgText(event.target.value);
  };

  const handleClick = () => {
    const formattedText = MsgText.replace(/\n/g, '<br />');
    setEditorContent(formattedText);
  };



  return (
    <div>
      <GroupLayout>
        {GroupData &&
        <div>
           <GroupHeader GroupData={GroupData} />
        <div className={Mstyles.Chatbox}>

        <div 
        style={{ whiteSpace: 'pre-line', marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}
        dangerouslySetInnerHTML={{ __html: EditorContent }}
      />

        </div>

        <div className={Mstyles.ChatboxFotter}>
          <div className={Mstyles.ChatWritebox}>
            <div className={Mstyles.ChatWriteboxA}>
              <div className={Mstyles.UserAvatar}>
                <Image
                  src={`${MediaFilesUrl}${MediaFilesFolder}${GroupData.GroupLogo}`}
                  alt=""
                  fill
                  height={'100%'}
                  width={'100%'}
                  blurDataURL={blurredImageData}
                  placeholder='blur'
                  style={{ objectFit: "cover", borderRadius: '5px' }}
                />
              </div>

            </div>
            <div className={Mstyles.ChatWriteboxB}>
              <textarea
                value={MsgText}
                onChange={handleChange}

                rows="3"
                
                
                className={Mstyles.msgTextarea}
              />
            </div>
            <div className={Mstyles.ChatWriteboxC}>
              <IconButton
                style={{ width: 45, height: 45, }}
                onClick={handleClick}
              >
                <LuSendHorizonal />
              </IconButton>
            </div>

          </div>

        </div>
        </div>
        
        }
       
      </GroupLayout>

      

    </div>



  )
}

export default Home;
