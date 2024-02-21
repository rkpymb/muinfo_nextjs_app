import axios from 'axios';
import CryptoJS from "crypto-js";
export default function handler(req, res) {
    if (req.method === 'POST') {
       
        console.log(req.body.JwtToken)
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };

        axios.post(`${process.env.API_URL}student/CreateAtempt`, { token: process.env.MYKEY, Chid: req.body.Chid, Tsid: req.body.Tsid, Status: req.body.Status, IsActive: req.body.IsActive, StatusText: req.body.StatusText, takenTime: req.body.takenTime, takenTimeSec: req.body.takenTimeSec, TotalMarks: req.body.TotalMarks, TsTitle: req.body.TsTitle, ChTitle: req.body.ChTitle }, { headers }).then((response) => {
           
            res.status(200).json({ ReqS: true, RetData: response.data});
           
        });

    } else {
        res.status(200).json({ ReqS: false });
    }
}