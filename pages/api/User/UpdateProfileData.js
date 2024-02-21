import axios from 'axios';

export default function handler(req, res) {
    if (req.method === 'POST') {
        let ReqStatus = false;
        // console.log(req.body.JwtToken)
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };

        axios.post(`${process.env.API_URL}Users/UpdateProfileData`, {
            token: process.env.MYKEY,
            name: req.body.name,
            dp: req.body.dp,
            WhatsApp: req.body.WhatsApp,
            Pincode: req.body.Pincode,
            State: req.body.State,
            FullAddress: req.body.FullAddress,
            City: req.body.City,
            Shortbio: req.body.Shortbio,
        }, { headers }).then((response) => {
            res.status(200).json({ ReqData: response.data });

        });

    } else {
        res.status(200).json({ ReqS: false });
    }
}