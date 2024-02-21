import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        axios.post(`${process.env.API_URL}home/saveCategory`, { token: process.env.MYKEY, imageUrl: req.body.imageUrl, name: req.body.name, slug: req.body.slug }).then((response) => {
            const senddta = response.data;
            res.status(200).json({ senddta })

        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}