import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function PhotoPage() {
  const { userId } = useParams();  // 예: 163
  const [file, setFile] = useState(null);
  const [photos, setPhotos] = useState([]);

  // ✅ 친구 사진 불러오기
  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:4000/photos/${userId}`)
      .then((res) => res.json())
      .then((data) => setPhotos(data))
      .catch((err) => console.error('메타 로드 실패:', err));
  }, [userId]);

  // ✅ 내 계정일 때만 업로드 허용 (예시: 내 userId가 163이라고 가정)
  const myId = localStorage.getItem('userId');
  const isMyPage = parseInt(myId) === parseInt(userId);

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('파일을 선택해주세요.');
      return;
    }

    try {
      const form = new FormData();
      form.append('file', file);

      const uploadRes = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: form,
      });

      const { filename } = await uploadRes.json();

      const title = prompt('제목 입력') || '';
      const content = prompt('내용 입력') || '';
      const category = prompt('카테고리 입력') || '';

      const saveRes = await fetch('http://localhost:4000/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename,
          title,
          content,
          category,
          userId: parseInt(userId), // 필수
        }),
      });

      const newPhoto = await saveRes.json();
      setPhotos((prev) => [newPhoto, ...prev]);
      setFile(null);
    } catch (err) {
      console.error('업로드 에러:', err);
      alert('업로드 실패');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📸 User {userId}의 앨범</h2>

      {isMyPage && (
        <div>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button onClick={handleUpload} disabled={!file} style={{ marginLeft: 8 }}>
            Upload
          </button>
        </div>
      )}

      <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
        {photos.length === 0 ? (
          <p>사진이 없습니다.</p>
        ) : (
          photos.map((p, i) => (
            <div key={i} style={{ border: '1px solid #ddd', padding: 8, borderRadius: 4 }}>
              <h4>{p.title}</h4>
              <img
                src={`http://localhost:4000/files/${p.filename}`}
                alt={p.title}
                style={{ width: '100%', borderRadius: 4, marginBottom: 8 }}
              />
              <p>{p.content}</p>
              <small style={{ color: '#888' }}>{new Date(p.createdAt).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
