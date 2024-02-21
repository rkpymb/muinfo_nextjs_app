import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {

        axios.post(`${process.env.API_URL}Users/UserLogin`, { 
            token: process.env.MYKEY,
            PassKey: req.body.PassKey, 
            mobile: req.body.mobile,
           
        }).then((response) => {
            const senddta = response.data;
            res.status(200).json({ ReqD: senddta })

        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}