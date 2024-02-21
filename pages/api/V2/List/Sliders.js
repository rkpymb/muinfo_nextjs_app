import axios from 'axios';
export default function handler(req, res) {

    if (req.method === 'POST') {
        axios.get(`${process.env.API_URL}home/getSliders`, { token: process.env.MYKEY})
            .then((rest) =>
                res.status(200).json(rest.data));
    } else {

    }
}