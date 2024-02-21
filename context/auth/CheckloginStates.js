import CheckloginContext from './CheckloginContext'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'


import CryptoJS from "crypto-js";
const CheckloginStates = (props) => {
  const [UserData, setUserData] = useState({});
  const [UserLogin, setUserLogin] = useState(false);

  const [VendorData, setVendorData] = useState([]);

  const [VendorLogin, setVendorLogin] = useState(false);
  const [LocationDone, setLocationDone] = useState(false);
  const [MapModal, setMapModal] = useState(0);
  const [VendorJwtToken, setVendorJwtToken] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [UserJwtToken, setUserJwtToken] = useState(null);
  const [MapRadius, setMapRadius] = useState(50000);
  const [ProfileDone, setProfileDone] = useState(0);
  const [MainTitle, setMainTitle] = useState();
  const [NotiTitle, setNotiTitle] = useState('');
  const [NotiDesc, setNotiDesc] = useState('');
  const [NotiShow, setNotiShow] = useState(false);
  const [LocationData, setLocationData] = useState(null);
  const [MainLoader, setMainLoader] = useState(true);


  const [AlertData, setAlertData] = useState({
    AlertStatus: false,
    TextMsg: 'This is Test alert for you !',
    severity: 'warning',
  });
  const [MainCat, setMainCat] = useState({});
  const [GoalStatus, setGoalStatus] = useState(false);

  const router = useRouter()

  useEffect(() => {
    CheckVendorLogin()
    CheckUSerLogin()
    CheckLocation()
  }, [router.query]);

  const CheckLocation = async () => {
    try {
      if (localStorage.getItem('LocationData')) {
        const locationDataD = localStorage.getItem('LocationData');
        const RadiusD = localStorage.getItem('Radius');
        setMapRadius(RadiusD)
        
        // console.log('locationDataD.lat'); 
        // console.log(JSON.parse(locationDataD)); 
        setMapModal(false)

        ChangeLocationData(JSON.parse(locationDataD))
        setLocationDone(true);

      } else {
        setLocationDone(false);
      }
    } catch (error) {
      setMapModal(true)
      setLocationDone(false);
    }
  };
  const CheckVendorLogin = async () => {
    try {
      if (localStorage.getItem('Token')) {
        const VToken = localStorage.getItem('Token');
        setVendorJwtToken(VToken)
        const sendUM = { JwtToken: VToken }
        const data = await fetch("/api/Vendor/Auth/AuthCheck", {
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

              setVendorData(parsedFinal.ReqData.UserData)
              setVendorLogin(true)
            } else {
              setVendorLogin(false)
            }
          })
      } else {
        setVendorLogin(false)
      }

    } catch (error) {
      setVendorLogin(false)


    }
  }
  const ChangeLocationData = async (e) => {
    // console.log(e)
    setLocationData(e)
  }
  const ChangeMainLoader = async (e) => {
    setMainLoader(e)
  }
  const ChangeMapRadius = async (e) => {
    // console.log(e)
    setMapRadius(e)
  }
  const MapmodalChange = async (e) => {

    setMapModal(e)
  }
  const CheckUSerLogin = async () => {
    try {
      if (localStorage.getItem('UserToken')) {
        const Token = localStorage.getItem('UserToken');
        setUserJwtToken(Token)
        const sendUM = { JwtToken: Token }
        const data = await fetch("/api/User/Auth/AuthCheck", {
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
              setUserLogin(true)
            } else {
              localStorage.clear();
              setUserLogin(false)

            }

            
          })
      } else {
        setUserLogin(false)
      }

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
    <CheckloginContext.Provider value={{ UserData, UserLogin, VendorData, VendorLogin, VendorJwtToken, UserJwtToken, ChangeLocationData, LocationData, ChangeMapRadius, MapRadius, LocationDone, MapModal, MapmodalChange, ChangeAlertData, AlertData ,ChangeMainLoader,MainLoader}}>
      {props.children}
    </CheckloginContext.Provider>
  )

}
export default CheckloginStates;