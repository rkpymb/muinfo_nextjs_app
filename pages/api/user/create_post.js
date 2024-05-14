import axios from 'axios';


export default function handler(req, res) {
    if (req.method === 'POST') {
      
        const token = getTokenFromCookie(req);

        if (token) {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };
            
            axios.post(`${process.env.API_URL}user/create_post`, { 
                token: process.env.MYKEY,
                PostText: req.body.PostText,
                PostList: req.body.PostList,
                tags: req.body.tags,
                category: req.body.category,
                date: req.body.date,
                time: req.body.time

            
            }, { headers }).then((response) => {
           
                res.status(200).json({ ReqData:response.data })
    
            }).catch((error) => {
                console.error(error);
                res.status(500).json({ error: error });
            });
        } else {
            res.status(401).json({ error: 'Unauthorized' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}


// Function to get JWT token from cookies
const getTokenFromCookie = (req) => {
    const cookieHeader = req.headers.cookie;

    if (cookieHeader) {
        const cookies = cookieHeader.split(';');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName.trim() === 'jwt_token') {
                return decodeURIComponent(cookieValue);
            }
        }
    }

    return null;
};
