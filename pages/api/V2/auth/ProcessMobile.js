import axios from 'axios';
import CryptoJS from "crypto-js";
export default function handler(req, res) {
    if (req.method === 'POST') {
        let ReqStatus = false;
        axios.post(`${process.env.API_URL}student/login`, { token: process.env.MYKEY, mobile: req.body.usermobile }).then((response) => {
            if (response.data.OTPStatus == true) {
                console.log(response.data)
                const RetData = response.data;
                ReqStatus = true;
                const Newtoken = CryptoJS.AES.encrypt(
                    JSON.stringify(RetData),
                    process.env.CryptoJSKEY
                ).toString();
                res.status(200).json({ ReqS: true, RetD: Newtoken });
            } else {
                res.status(200).json({ ReqS: false });
            }
            
        });
                
    } else {
        res.status(200).json({ ReqS: 'invalid entry'});
    }
}