import axios from 'axios';

export default function handler(req, res) {
    if (req.method === 'POST') {
        let ReqStatus = false;
        // console.log(req.body.JwtToken)
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
          
        };

        axios.post(`${process.env.API_URL}Users/VendorsList`, {
            token: process.env.MYKEY,
            page: req.body.page,
            limit: req.body.limit,
            MaxDistance: req.body.MaxDistance,
            Longitude: req.body.Longitude,
            Latitude: req.body.Latitude,

        }, { headers }).then((response) => {
            res.status(200).json({ ReqData: response.data });

        });

    } else {
        res.status(200).json({ ReqS: ReqStatus });
    }
}