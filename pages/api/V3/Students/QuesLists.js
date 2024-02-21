import axios from 'axios';
import CryptoJS from "crypto-js";
export default function handler(req, res) {
    if (req.method === 'POST') {
       
        console.log(req.body.JwtToken)
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };

        axios.post(`${process.env.API_URL}student/GetQuesList`, { token: process.env.MYKEY, Chapterid: req.body.Chapterid, slug:req.body.slug }, { headers }).then((response) => {
           
            res.status(200).json({ ReqS: true, RetData: response.data});
           
        });

    } else {
        res.status(200).json({ ReqS: false });
    }
}