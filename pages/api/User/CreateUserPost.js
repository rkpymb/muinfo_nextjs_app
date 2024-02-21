import axios from 'axios';

export default function handler(req, res) {
    if (req.method === 'POST') {
        let ReqStatus = false;
        // console.log(req.body.JwtToken)
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };

        axios.post(`${process.env.API_URL}Users/CreateUserPost`, { 
            token: process.env.MYKEY,
            PostText: req.body.PostText,
            MainCat: req.body.Category,
            SubCat: req.body.SubCat,
            Radius:req.body.Radius,
            Latitude :req.body.Latitude,
            Longitude:req.body.Longitude
            
        
        }, { headers }).then((response) => {
            res.status(200).json({ReqData: response.data });
            
        });

    } else {
        res.status(200).json({ ReqS: false });
    }
}