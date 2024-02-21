import axios from 'axios';

export default function handler(req, res) {
    if (req.method === 'POST') {
        let ReqStatus = false;
        // console.log(req.body.JwtToken)
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };

        axios.post(`${process.env.API_URL}Vendor/UpdatePhoto`, {
            token: process.env.MYKEY,
            isActive: req.body.isActive,
            PostText: req.body.PostText,
            StatusText: req.body.StatusText,
            id:req.body.id
           


        }, { headers }).then((response) => {
            res.status(200).json({ ReqData: response.data });

        });

    } else {
        res.status(200).json({ ReqS: ReqStatus });
    }
}