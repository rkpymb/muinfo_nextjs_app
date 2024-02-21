import axios from 'axios';
import CryptoJS from "crypto-js";
export default function handler(req, res) {
    if (req.method === 'POST') {
        
        // console.log(req.body.JwtToken)
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };

        axios.post(`${process.env.API_URL}student/profile`, { token: process.env.MYKEY }, { headers }).then((response) => {
            if (response.data.UserData) {
                const RetData = response.data.UserData[0];
                if (RetData.isActive) {
                    const Newtoken = CryptoJS.AES.encrypt(
                        JSON.stringify(RetData),
                        process.env.CryptoJSKEY
                    ).toString();
                    res.status(200).json({ ReqS: true, RetD: Newtoken });
                } else {
                    res.status(200).json({ ReqS: false, msg: response.data });
                }
            } else {
                res.status(200).json({ ReqS: false, msg: response.data });
            }
          
           
           
        });

    } else {
        res.status(200).json({ ReqS: ReqStatus });
    }
}