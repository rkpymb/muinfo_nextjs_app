import React from 'react'
import Mstyles from '/styles/chat.module.css';
const AsideTop = () => {
  return (
    <div className={Mstyles.AsideTop} onClick={() => router.push('/feeds')}>
      <div className={Mstyles.AsideTopLogo}>
        <img src='/img/partners.png' width='100%' />
      </div>
      <div className={Mstyles.AsideTopText} >
        <span>Group Chats</span>
        <small>Let's disscuss your topics and queries.</small>
      </div>
    </div>

  )
}

export default AsideTop
