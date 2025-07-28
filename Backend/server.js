const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const { GridFSBucket } = require('mongodb');
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

// ✅ 1. 파일 업로드 (GridFS 저장)
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

// ✅ 2. 메타데이터 저장 (userId 포함)
app.post('/photos', async (req, res) => {
    const { filename, title, content, category, userId } = req.body;

    if (!userId) return res.status(400).json({ error: 'userId 필요' });

    const collection = mongoose.connection.db.collection('photos');
    const newPhoto = {
        filename,
        title,
        content,
        category,
        userId: parseInt(userId), // 숫자 형식으로 저장
        createdAt: new Date(),
    };

    await collection.insertOne(newPhoto);
    res.json(newPhoto);
});

// ✅ 3. 특정 userId 사진 목록 조회
app.get('/photos/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);

    const collection = mongoose.connection.db.collection('photos');
    const photos = await collection.find({ userId }).sort({ createdAt: -1 }).toArray();

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

// ✅ 서버 실행
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server on http://localhost:${PORT}`);
});
