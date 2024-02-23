import axios from 'axios';

export default function handler(req, res) {
    if (req.method === 'POST') {
        let ReqStatus = false;
        // console.log(req.body.JwtToken)
        const headers = {
            'Content-Type': 'application/json',
           
        };

        axios.post(`${process.env.API_URL}Vendor/CheckVerified`, {
            token: process.env.MYKEY,
            username: req.body.username,
            
          
        }, { headers }).then((response) => {
            res.status(200).json({ ReqData: response.data });

        });

    } else {
        res.status(200).json({ ReqData: false });
    }
}