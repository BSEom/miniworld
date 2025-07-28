const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const { MongoClient, GridFSBucket } = require('mongodb');
const { Readable } = require('stream');

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI =
    'mongodb+srv://erer988872:dlwlals1102@miniworld.nsdyhxz.mongodb.net/miniworld?retryWrites=true&w=majority&appName=miniworld';

let gfsBucket;

// ✅ MongoDB 연결
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
    console.log('✅ MongoDB 연결 완료');
    gfsBucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });
});

// ✅ multer 메모리 저장소
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ 1. 파일 업로드 (이미지는 GridFS에 저장)
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: '파일 없음' });

    const readableStream = Readable.from(req.file.buffer);
    const filename = `${Date.now()}-${req.file.originalname}`;

    const uploadStream = gfsBucket.openUploadStream(filename, {
        contentType: req.file.mimetype,
    });

    readableStream
        .pipe(uploadStream)
        .on('error', (err) => {
            console.error('업로드 오류:', err);
            res.status(500).send('업로드 실패');
        })
        .on('finish', () => {
            res.json({ filename });
        });
});

// ✅ 2. 업로드된 파일 목록 메타데이터 저장
app.post('/photos', async (req, res) => {
    const { filename, title, content, category } = req.body;

    const collection = mongoose.connection.db.collection('photos');
    const newPhoto = {
        filename,
        title,
        content,
        category,
        createdAt: new Date(),
    };

    await collection.insertOne(newPhoto);
    res.json(newPhoto);
});

// ✅ 3. 메타데이터 목록 조회
app.get('/photos', async (req, res) => {
    const collection = mongoose.connection.db.collection('photos');
    const photos = await collection.find().sort({ createdAt: -1 }).toArray();
    res.json(photos);
});

// ✅ 4. 파일 다운로드
app.get('/files/:filename', (req, res) => {
    const downloadStream = gfsBucket.openDownloadStreamByName(req.params.filename);

    downloadStream.on('error', () => {
        res.status(404).send('파일을 찾을 수 없습니다.');
    });

    downloadStream.pipe(res);
});

const PORT = 4000;
app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));
