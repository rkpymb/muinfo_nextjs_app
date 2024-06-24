import React from 'react'

import { useState, useEffect, useContext } from 'react';
import Mstyles from '/styles/customstyle.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'


import { useRouter, useParams } from 'next/router'
const FloatingBtn = () => {
  const router = useRouter();
  const Contextdata = useContext(CheckloginContext)
  const [Loading, setLoading] = useState(true);


  useEffect(() => {
    if (Contextdata.UserData && Contextdata.UserData.Role == 1) {
      setLoading(false)

    }


  }, [Contextdata.UserData]);

  return (
    <div>

      {!Loading &&

        <div className={Mstyles.FloatingBtn}>Post</div>
      }

    </div>
  )
}

export default FloatingBtn
