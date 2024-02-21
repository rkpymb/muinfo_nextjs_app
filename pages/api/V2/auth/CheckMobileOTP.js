import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        let ReqStatus = false;
        const usermob = req.body.usermobile;
        const OTPEnter = req.body.EnterText;
    
        axios.post(`${process.env.API_URL}student/verifyOtp`, { token: process.env.MYKEY, mobile: usermob, otp: OTPEnter }).then((response) => {
            const senddta = response.data;
            const ReqStatus = true;
            res.status(200).json({ ReqS: ReqStatus,ReqD: senddta })
            console.log(response.data)
        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}