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

        axios.post(`${process.env.API_URL}student/Coursechapterlist`, { token: process.env.MYKEY ,pid:req.body.pid}, { headers }).then((response) => {
            res.status(200).json({ReqData: response.data.CoursesChapter });
            
        });

    } else {
        res.status(200).json({ ReqS: ReqStatus });
    }
}