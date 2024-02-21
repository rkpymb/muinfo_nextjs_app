import axios from 'axios';
import CryptoJS from "crypto-js";
export default function handler(req, res) {
    if (req.method === 'POST') {
        let ReqStatus = false;
        let ReqData = null
        const { encryptedData } = req.body;

        const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, process.env.CryptoJSKEY);
        const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
        ReqStatus = true;
        ReqData = decryptedData


        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${decryptedData.JwtToken}`,
        };

        axios.post(`${process.env.API_URL}student/CreateTSSalesOrder`, { token: process.env.MYKEY, CourseData: decryptedData.CourseData, OrderData: decryptedData.OrderData }, { headers }).then((response) => {
            if (response.data.OprationStaus == true) {
                res.status(200).json({ ReqS: true, ReqData: response.data });
            } else {
                res.status(200).json({ ReqS: false, ReqData: response.data });
            }

        });


    } else {
        res.status(200).json({ ReqS: ReqStatus, ReqData: ReqData });
    }
}