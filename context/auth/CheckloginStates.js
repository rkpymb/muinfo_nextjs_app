import CheckloginContext from './CheckloginContext'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const CheckloginStates = (props) => {
  const router = useRouter()
  const [UserData, setUserData] = useState({});
  const [UserLogin, setUserLogin] = useState(false);
  const [MainLoader, setMainLoader] = useState(true);
  const [AppMode, setAppMode] = useState(false);
  const [UserJwtToken, setUserJwtToken] = useState(null);


  const [AlertData, setAlertData] = useState({
    AlertStatus: false,
    TextMsg: 'This is Test alert for you !',
    severity: 'warning',
  });



  useEffect(() => {
    checkAppMode()
    CheckUserLogin()
   
  }, []);

 
  const ChangeMainLoader = async (e) => {
    setMainLoader(e)
  }
  const ChangeAppMode = async (e) => {
    setAppMode(e)
    console.log(`AppMode : ${e}`)
  }
  

  const checkAppMode = () => {
    const storedAppMode = localStorage.getItem('appMode');
    if(storedAppMode) {
      setAppMode(true)
    
    }else{
    
      setAppMode(false)
    }
  };
  const CheckUserLogin = async () => {
    try {
      const sendUM = { }
      const data = await fetch("/api/user/check_auth", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(sendUM)
      }).then((a) => {
        return a.json();
      })
        .then((parsedFinal) => {
      
          if (parsedFinal.ReqData.UserData) {
            setUserData(parsedFinal.ReqData.UserData)
            setUserJwtToken(parsedFinal.ReqData.jwt_token)
            setUserLogin(true)
          } else {
            setUserLogin(false)

          }
          
        })

    } catch (error) {
      setUserLogin(false)


    }
  }


  const ChangeAlertData = async (Msg,severity) => {
    const AD = {
      AlertStatus: true,
      TextMsg: Msg,
      severity: severity,
    }
    setAlertData(AD)
  
  }



  return (
    <CheckloginContext.Provider value={{UserJwtToken, UserData, UserLogin, ChangeAlertData, AlertData ,ChangeMainLoader,MainLoader,ChangeAppMode,AppMode}}>
      {props.children}
    </CheckloginContext.Provider>
  )

}
export default CheckloginStates;