import axios from 'axios';

export default function handler(req, res) {
    if (req.method === 'POST') {
        
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };

        axios.post(`${process.env.API_URL}Vendor/RFQFeedlist`, { token: process.env.MYKEY,
            limit: req.body.limit,
            page:  req.body.page,
           
        }, { headers }).then((response) => {
            res.status(200).json({ReqData: response.data });
            
        });

    } else {
        res.status(200).json({ ReqS: false });
    }
}