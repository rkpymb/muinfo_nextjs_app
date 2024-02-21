import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        axios.post(`${process.env.API_URL}TestSeries/SaveTSChapterQues`, { token: process.env.MYKEY, chid: req.body.chid, title: req.body.title, details: req.body.details, isActive: true, marks: req.body.marks }).then((response) => {
            const senddta = response.data;
            res.status(200).json({ senddta })

        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}