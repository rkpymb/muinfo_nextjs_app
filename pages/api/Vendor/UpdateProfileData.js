import axios from 'axios';

export default function handler(req, res) {
    if (req.method === 'POST') {
        let ReqStatus = false;
        // console.log(req.body.JwtToken)
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };

        axios.post(`${process.env.API_URL}Vendor/UpdateProfileData`, {
            token: process.env.MYKEY,
            name: req.body.name,
            dp: req.body.dp,
            Mobile: req.body.Mobile,
            WhatsApp: req.body.WhatsApp,
            MainCat: req.body.MainCat,
            Subcat: req.body.Subcat,
            VType: req.body.VType,
            Email: req.body.Email,
            Pincode: req.body.Pincode,
            State: req.body.State,
            GoogleMapLink: req.body.GoogleMapLink,
            FullAddress: req.body.FullAddress,
            City: req.body.City,
            Latitude: req.body.Latitude,
            Longitude: req.body.Longitude,
            FullDesc: req.body.FullDesc,
            Shortbio: req.body.Shortbio,


        }, { headers }).then((response) => {
            res.status(200).json({ ReqData: response.data });

        });

    } else {
        res.status(200).json({ ReqS: ReqStatus });
    }
}