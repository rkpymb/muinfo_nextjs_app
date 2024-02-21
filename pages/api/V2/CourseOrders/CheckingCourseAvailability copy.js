import axios from 'axios';
import CryptoJS from "crypto-js";
export default function handler(req, res) {
    const MobilenumberUser = req.body;
    if (req.method === 'POST') {
        let ReqStatus = false;
        let ReqData = null
        
        // console.log(req.body.JwtToken)
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };

        axios.post(`${process.env.API_URL}CourseOrders/CheckIfExistCourse`, { token: process.env.MYKEY, mobilenum: req.body.mobile, CourseData: req.body.CourseData }, { headers }).then((response) => {
            
            
            if (response.data.available == true) {
                ReqStatus = true;
            } else {
                ReqData = response.data.Orderdata
            }
            res.status(200).json({ ReqS: ReqStatus, ReqData: ReqData });
        });

    } else {
        res.status(200).json({ ReqS: ReqStatus });
    }
}