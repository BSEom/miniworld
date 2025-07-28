// sign.js
import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = 3001;
app.use(cors({ origin: 'http://localhost:5173' }));

console.log('🔧 ENV CLOUDINARY_CLOUD_NAME =', process.env.CLOUDINARY_CLOUD_NAME);

// 서명(signature) 엔드포인트
app.get('/api/sign', (req, res) => {
    const timestamp = Math.floor(Date.now() / 1000);
    const toSign = `timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;
    const signature = crypto.createHash('sha1').update(toSign).digest('hex');
    res.json({
        api_key: process.env.CLOUDINARY_API_KEY,
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        timestamp,
        signature
    });
});

app.listen(PORT, () => {
    console.log(`Signature server running at http://localhost:${PORT}`);
});