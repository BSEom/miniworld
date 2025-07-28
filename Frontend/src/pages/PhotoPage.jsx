// File: src/pages/PhotoPage.jsx
import React, { useState, useEffect } from 'react';

export default function PhotoPage() {
  const [file, setFile] = useState(null);
  const [photos, setPhotos] = useState([]);

  // ✅ 1. 메타데이터 불러오기
  useEffect(() => {
    fetch('http://localhost:4000/photos')
      .then((res) => {
        if (!res.ok) throw new Error('서버 응답 오류');
        return res.json();
      })
      .then((data) => setPhotos(data))
      .catch((err) => console.error('메타 로드 실패:', err));
  }, []);

  // ✅ 2. 파일 선택 핸들러
  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
  };

  // ✅ 3. 업로드 핸들러
  const handleUpload = async () => {
    if (!file) {
      alert('파일을 선택해주세요.');
      return;
    }

    try {
      // 1) 이미지 업로드
      const form = new FormData();
      form.append('file', file);

      const uploadRes = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: form,
      });

      if (!uploadRes.ok) {
        const errorText = await uploadRes.text();
        console.error('📛 업로드 실패 응답:', errorText);
        alert('파일 업로드 실패');
        return;
      }

      const { filename } = await uploadRes.json();

      // 2) 메타데이터 저장
      const title = prompt('제목을 입력하세요') || '';
      const content = prompt('내용을 입력하세요') || '';
      const category = prompt('카테고리를 입력하세요') || '';

      const saveRes = await fetch('http://localhost:4000/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, title, content, category }),
      });

      const newPhoto = await saveRes.json();
      setPhotos((prev) => [newPhoto, ...prev]);
      setFile(null);
    } catch (err) {
      console.error('업로드 과정에서 에러 발생:', err);
      alert('업로드 실패');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🖼️ Photo Album</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file} style={{ marginLeft: 8 }}>
        Upload
      </button>

      <div
        style={{
          marginTop: 24,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 12,
        }}
      >
        {photos.length === 0 ? (
          <p>사진이 없습니다.</p>
        ) : (
          photos.map((p, i) => (
            <div
              key={i}
              style={{
                border: '1px solid #ddd',
                padding: 8,
                borderRadius: 4,
                background: '#fff',
              }}
            >
              <h4>{p.title}</h4>
              <img
                src={`http://localhost:4000/files/${p.filename}`}
                alt={p.title}
                style={{ width: '100%', borderRadius: 4, marginBottom: 8 }}
              />
              <p style={{ margin: 0 }}>{p.content}</p>
              <small style={{ color: '#888' }}>
                {new Date(p.createdAt).toLocaleString()}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
