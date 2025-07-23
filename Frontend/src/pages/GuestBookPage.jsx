import React, { useState } from 'react';
import './GuestBookPage.css';

const GuestBookPage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: '홍길동',
      title: '첫 글이에요!',
      content: '안녕하세요, 반가워요 :)',
      isPrivate: false,
      image: null,
      date: new Date().toISOString(),
      pinned: false,
      comments: [],
    },
  ]);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    content: '',
    isPrivate: false,
    image: null,
  });
  const [commentText, setCommentText] = useState('');
  const [replyTexts, setReplyTexts] = useState({});
  const [currentUser, setCurrentUser] = useState('나');
  const [mode, setMode] = useState('list'); // 'list' | 'write'
  const [searchQuery, setSearchQuery] = useState('');

  const handlePostSubmit = () => {
    if (!formData.name || !formData.content) return;
    const newPost = {
      ...formData,
      id: Date.now(),
      date: new Date().toISOString(),
      comments: [],
      pinned: false,
    };
    setPosts((prev) => [newPost, ...prev]);
    setFormData({ name: '', title: '', content: '', isPrivate: false, image: null });
    setMode('list');
  };

  const handleCommentAdd = (postId, parentId = null, isReply = false) => {
    const text = isReply ? replyTexts[parentId] : commentText.trim();
    if (!text) return;
    const newComment = {
      id: Date.now(),
      text,
      author: currentUser,
      date: new Date().toISOString(),
      parentId,
    };
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, comments: [...(p.comments || []), newComment] } : p
      )
    );
    if (isReply) {
      setReplyTexts((prev) => ({ ...prev, [parentId]: '' }));
    } else {
      setCommentText('');
    }
  };

  const handleCommentDelete = (postId, commentId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: p.comments.filter(
                (c) => c.id !== commentId && c.parentId !== commentId
              ),
            }
          : p
      )
    );
  };

  const renderComments = (comments, parentId = null, postId, depth = 0) => {
    return comments
      .filter((c) => c.parentId === parentId)
      .map((c) => (
        <div key={c.id} className="comment" style={{ marginLeft: depth * 20 }}>
          <div className="comment-header">
            {c.author} | {formatDate(c.date)}
            {c.author === currentUser && (
              <button onClick={() => handleCommentDelete(postId, c.id)}>삭제</button>
            )}
          </div>
          <div className="comment-text">{c.text}</div>
          <div className="reply-form">
            <input
              type="text"
              placeholder="대댓글 작성"
              value={replyTexts[c.id] || ''}
              onChange={(e) =>
                setReplyTexts((prev) => ({ ...prev, [c.id]: e.target.value }))
              }
            />
            <button onClick={() => handleCommentAdd(postId, c.id, true)}>등록</button>
          </div>
          {renderComments(comments, c.id, postId, depth + 1)}
        </div>
      ));
  };

  const formatDate = (iso) => new Date(iso).toLocaleString();

  const filteredPosts = posts
    .filter((post) => post.title.includes(searchQuery) || post.content.includes(searchQuery))
    .sort((a, b) => b.pinned - a.pinned || new Date(b.date) - new Date(a.date));

  return (
    <div className="guestbook-page">
      {mode === 'list' ? (
        <>
          <div className="guestbook-top">
            <button onClick={() => setMode('write')}>글쓰기</button>
            <input
              type="text"
              placeholder="검색어 입력"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <ul className="guestbook-posts">
            {filteredPosts.map((post) => (
              <li key={post.id} className="guestbook-post">
                <div className="post-header">
                  <span>
                    {post.name}
                    {post.pinned && ' [고정글]'}
                  </span>
                  <span>{formatDate(post.date)}</span>
                </div>
                {!post.isPrivate || post.name === currentUser ? (
                  <>
                    {post.title && <h4>{post.title}</h4>}
                    <p className="post-content">{post.content}</p>
                    {post.image && (
                      <div className="post-image">
                        <img
                          src={URL.createObjectURL(post.image)}
                          alt="업로드 이미지"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <p className="post-content">🔒 비밀글입니다.</p>
                )}

                <div className="post-actions">
                  <button onClick={() => setPosts((prev) => prev.filter((p) => p.id !== post.id))}>
                    삭제
                  </button>
                </div>

                <div className="comment-section">
                  <h4>💬 댓글</h4>
                  {post.comments?.length ? (
                    renderComments(post.comments, null, post.id)
                  ) : (
                    <div className="no-comments">댓글이 없습니다.</div>
                  )}
                  <div className="comment-form">
                    <input
                      type="text"
                      placeholder="댓글 작성"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button onClick={() => handleCommentAdd(post.id)}>등록</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="guestbook-form">
          <input
            type="text"
            placeholder="이름"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="제목 (선택)"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <textarea
            placeholder="내용"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
          <input
            type="file"
            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
          />
          <div className="form-options">
            <label>
              비밀글
              <input
                type="checkbox"
                checked={formData.isPrivate}
                onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })}
              />
            </label>
            <div className="form-buttons">
              <button onClick={handlePostSubmit}>등록</button>
              <button onClick={() => setMode('list')}>목록으로 돌아가기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestBookPage;
