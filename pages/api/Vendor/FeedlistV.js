import axios from 'axios';

export default function handler(req, res) {
    if (req.method === 'POST') {
        let ReqStatus = false;
        // console.log(req.body.JwtToken)
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
          
        };

        axios.post(`${process.env.API_URL}Vendor/FeedlistV`, {
            token: process.env.MYKEY,
            page: req.body.page,
            limit: req.body.limit,

        }, { headers }).then((response) => {
            res.status(200).json({ ReqData: response.data });

        });

    } else {
        res.status(200).json({ ReqS: ReqStatus });
    }
}