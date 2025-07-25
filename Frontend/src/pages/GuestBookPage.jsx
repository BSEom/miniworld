import React, { useState, useRef, useEffect } from 'react';
import './GuestBookPage.css';

const GuestBookPage = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    content: '',
    isPrivate: false,
    image: null,
    sticker: '',
  });
  const [currentUser, setCurrentUser] = useState('user1'); // 로그인 사용자 ID
  const [loggedInUser, setLoggedInUser] = useState('user1'); // 인증된 사용자 ID
  const [mode, setMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [commentTexts, setCommentTexts] = useState({});
  const [replyTexts, setReplyTexts] = useState({});
  const [commentImages, setCommentImages] = useState({});
  const [editingComments, setEditingComments] = useState({});
  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});
  const [reports, setReports] = useState({});
  const [foldedComments, setFoldedComments] = useState({});
  const [page, setPage] = useState(1);
  const perPage = 5;

  const handlePostSubmit = () => {
    if (!formData.name || !formData.content) return;
    const newPost = {
      ...formData,
      id: Date.now(),
      date: new Date().toISOString(),
      comments: [],
      pinned: false,
    };
    setPosts(prev => [newPost, ...prev]);
    setFormData({ name: '', content: '', isPrivate: false, image: null, sticker: '' });
    setMode('list');
  };

  const handleCommentAdd = (postId, parentId = null, isReply = false) => {
    const text = isReply ? replyTexts[parentId]?.trim() : commentTexts[postId]?.trim();
    const image = isReply ? commentImages[parentId] : commentImages[postId];
    if (!text && !image) return;
    const newComment = {
      id: Date.now(),
      text,
      image,
      author: currentUser,
      date: new Date().toISOString(),
      parentId,
    };
    setPosts(prev => prev.map(post => post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post));
    if (isReply) {
      setReplyTexts(prev => ({ ...prev, [parentId]: '' }));
      setCommentImages(prev => ({ ...prev, [parentId]: null }));
    } else {
      setCommentTexts(prev => ({ ...prev, [postId]: '' }));
      setCommentImages(prev => ({ ...prev, [postId]: null }));
    }
  };

  const handleCommentDelete = (postId, commentId) => {
    setPosts(prev => prev.map(post => post.id === postId ? {
      ...post,
      comments: post.comments.filter(c => c.id !== commentId && c.parentId !== commentId)
    } : post));
  };

  const handleCommentEdit = (postId, commentId) => {
    const newText = editingComments[commentId]?.trim();
    if (!newText) return;
    setPosts(prev => prev.map(post => post.id === postId ? {
      ...post,
      comments: post.comments.map(c => c.id === commentId ? { ...c, text: newText } : c)
    } : post));
    setEditingComments(prev => ({ ...prev, [commentId]: '' }));
  };

  const handleToggleLike = (commentId) => {
    setLikes(prev => ({ ...prev, [commentId]: (prev[commentId] || 0) + 1 }));
  };

  const handleToggleDislike = (commentId) => {
    setDislikes(prev => ({ ...prev, [commentId]: (prev[commentId] || 0) + 1 }));
  };

  const handleReport = (commentId) => {
    setReports(prev => ({ ...prev, [commentId]: true }));
    alert('신고가 접수되었습니다.');
  };

  const toggleFold = (commentId) => {
    setFoldedComments(prev => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const renderComments = (comments, parentId = null, postId, depth = 0) => {
    return comments.filter(c => c.parentId === parentId).map(c => (
      <div key={c.id} className="comment" style={{ marginLeft: depth * 20 }}>
        <div className="comment-header">
          <strong>{c.author === loggedInUser ? '🏠 ' : ''}{c.author}</strong> | {formatDate(c.date)}
          {c.author === loggedInUser && (
            <>
              <button onClick={() => handleCommentDelete(postId, c.id)}>삭제</button>
              <button onClick={() => toggleFold(c.id)}>{foldedComments[c.id] ? '펼치기' : '접기'}</button>
            </>
          )}
        </div>
        {!foldedComments[c.id] && (
          <>
            {editingComments[c.id] !== undefined ? (
              <>
                <input
                  type="text"
                  value={editingComments[c.id]}
                  onChange={e => setEditingComments(prev => ({ ...prev, [c.id]: e.target.value }))}
                />
                <button onClick={() => handleCommentEdit(postId, c.id)}>저장</button>
              </>
            ) : (
              <>
                <div className="comment-text">{c.text}</div>
                {c.image && <img src={URL.createObjectURL(c.image)} alt="첨부 이미지" style={{ maxWidth: '100px' }} />}
                {c.author === loggedInUser && <button onClick={() => setEditingComments(prev => ({ ...prev, [c.id]: c.text }))}>수정</button>}
              </>
            )}
            <div className="comment-actions">
              <button onClick={() => handleToggleLike(c.id)}>👍 {likes[c.id] || 0}</button>
              <button onClick={() => handleToggleDislike(c.id)}>👎 {dislikes[c.id] || 0}</button>
              {c.author !== loggedInUser && <button onClick={() => handleReport(c.id)}>신고</button>}
            </div>
            <div className="reply-form">
              <input
                type="text"
                placeholder="대댓글 작성"
                value={replyTexts[c.id] || ''}
                onChange={(e) => setReplyTexts(prev => ({ ...prev, [c.id]: e.target.value }))}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCommentImages(prev => ({ ...prev, [c.id]: e.target.files[0] }))}
              />
              <button onClick={() => handleCommentAdd(postId, c.id, true)}>등록</button>
            </div>
            {renderComments(comments, c.id, postId, depth + 1)}
          </>
        )}
      </div>
    ));
  };

  const formatDate = iso => new Date(iso).toLocaleString();

  const filteredPosts = posts
    .filter(post => post.content.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => b.pinned - a.pinned || new Date(b.date) - new Date(a.date));

  const displayedPosts = filteredPosts.slice(0, page * perPage);

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
            {displayedPosts.map((post) => (
              <li key={post.id} className="guestbook-post">
                <div className="post-header">
                  <span>{post.name}{post.pinned && ' 📌'}</span>
                  <span>{formatDate(post.date)}</span>
                </div>
                <p className="post-content">
                  {post.isPrivate && post.name !== loggedInUser ? '🔒 비밀글입니다.' : post.content}
                </p>
                {post.image && (
                  <img
                    src={URL.createObjectURL(post.image)}
                    alt="첨부 이미지"
                    style={{ maxWidth: '200px' }}
                  />
                )}
                <div className="post-actions">
                  <button onClick={() => setPosts(prev => prev.map(p => p.id === post.id ? { ...p, pinned: !p.pinned } : p))}>
                    {post.pinned ? '고정 해제' : '고정'}
                  </button>
                  <button onClick={() => {
                    if (post.pinned) alert('고정된 글은 먼저 고정을 해제해야 삭제할 수 있습니다.');
                    else setPosts(prev => prev.filter(p => p.id !== post.id));
                  }}>삭제</button>
                </div>
                <div className="comment-section">
                  <h4>💬 댓글</h4>
                  {post.comments?.length ? renderComments(post.comments, null, post.id) : <div className="no-comments">댓글이 없습니다.</div>}
                  <div className="comment-form">
                    <input
                      type="text"
                      placeholder="댓글 작성"
                      value={commentTexts[post.id] || ''}
                      onChange={(e) => setCommentTexts(prev => ({ ...prev, [post.id]: e.target.value }))}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setCommentImages(prev => ({ ...prev, [post.id]: e.target.files[0] }))}
                    />
                    <button onClick={() => handleCommentAdd(post.id)}>등록</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {displayedPosts.length < filteredPosts.length && (
            <button onClick={() => setPage(prev => prev + 1)}>더보기</button>
          )}
        </>
      ) : (
        <div className="guestbook-form">
          <input
            type="text"
            placeholder="이름"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <textarea
            placeholder="내용"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
          />
          {formData.image && <img src={URL.createObjectURL(formData.image)} alt="미리보기" style={{ maxWidth: '100px' }} />}
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
      )}
    </div>
  );
};

export default GuestBookPage;
