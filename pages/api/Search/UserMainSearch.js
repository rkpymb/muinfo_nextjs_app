import axios from 'axios';

export default function handler(req, res) {
    if (req.method === 'POST') {
        let ReqStatus = false;
        // console.log(req.body.JwtToken)
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };

        axios.post(`${process.env.API_URL}Users/UserMainSearch`, {
            token: process.env.MYKEY,
            SearchQuery: req.body.SearchQuery,
            Latitude: req.body.Latitude,
            Longitude: req.body.Longitude,
            MaxDistance: req.body.MaxDistance
          
        }, { headers }).then((response) => {
            res.status(200).json({ ReqD: response.data });

        });

    } else {
        res.status(200).json({ ReqS: ReqStatus });
    }
}