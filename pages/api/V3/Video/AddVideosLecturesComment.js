import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };

        axios.post(`${process.env.API_URL}student/AddVideosLecturesComment`, { token: process.env.MYKEY, videoid: req.body.Videoid,cmt: req.body.cmt}, { headers }).then((response) => {
        
            res.status(200).json({ ReqData: response.data });
        });

    } else {
        res.status(200).json({ ReqS: ReqStatus });
    }
}