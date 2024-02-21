import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {

        axios.post(`${process.env.API_URL}Vendor/CheckAccountAuth`, { 
            token: process.env.MYKEY,
            name:req.body.name,
            mobile: req.body.mobile,
            email: req.body.email,
            PassKey: req.body.PassKey, 
            reg_by:'Website'
           
        }).then((response) => {
            const senddta = response.data;
            res.status(200).json({ ReqD: senddta })

        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}