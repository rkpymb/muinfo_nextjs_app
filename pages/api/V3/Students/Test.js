import axios from 'axios';
import CryptoJS from "crypto-js";
export default function handler(req, res) {
    if (req.method === 'POST') {
        let ReqStatus = false;
        // console.log(req.body.JwtToken)
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };

        axios.post(`${process.env.API_URL}student/MyTSlist`, { token: process.env.MYKEY }, { headers }).then((response) => {
            console.log(response.data.MYTSData)
            res.status(200).json({ ReqS: true, ReqData: response.data.MYTSData });
            // if (response) {
            //     const ReqStatus = true;
            //     const RetData = response;
            //     const Newtoken = CryptoJS.AES.encrypt(
            //         JSON.stringify(RetData),
            //         process.env.CryptoJSKEY
            //     ).toString();
            //     res.status(200).json({ ReqS: ReqStatus, RetD: Newtoken });

            // }
        });

    } else {
        res.status(200).json({ ReqS: ReqStatus });
    }
}