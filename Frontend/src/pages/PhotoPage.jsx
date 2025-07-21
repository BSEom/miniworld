import React, { useState, useEffect } from 'react';
import './PhotoPage.css';

const PhotoPage = () => {
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('전체');
  const [filter, setFilter] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [likedPhotos, setLikedPhotos] = useState({});
  const [dislikedPhotos, setDislikedPhotos] = useState({});
  const [categories, setCategories] = useState(['전체', '여행', '일상', '음식']);
  const [currentPage, setCurrentPage] = useState(1);
  const [editId, setEditId] = useState(null);
  const [editImageFile, setEditImageFile] = useState(null);
  const [inputSearchTerm, setInputSearchTerm] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedPhotoId, setSelectedPhotoId] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [replyInputs, setReplyInputs] = useState({});
  const itemsPerPage = 3; // 3개씩 보기

  // 더미 데이터 12개 생성
  useEffect(() => {
    const baseTime = Date.now();
    const dummyPhotos = Array.from({ length: 12 }).map((_, i) => ({
      id: baseTime + i,
      title: `샘플 제목 ${i + 1}`,
      content: `이것은 더미 설명 ${i + 1}번입니다.`,
      src: `https://via.placeholder.com/800x600?text=Photo${i + 1}`,
      category: ['여행', '일상', '음식'][i % 3],
      comments: [],
      likes: 0,
      dislikes: 0,
    }));
    setPhotos(dummyPhotos);
  }, []);

  const handleImageChange = (e) => {
    if (image) URL.revokeObjectURL(image);
    if (e.target.files && e.target.files[0]) {
      const newUrl = URL.createObjectURL(e.target.files[0]);
      setImage(newUrl);
      setEditImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim() || !image) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    if (editId !== null) {
      setPhotos((prev) =>
        prev.map((photo) =>
          photo.id === editId
            ? {
                ...photo,
                title: title.trim(),
                content: content.trim(),
                category,
                src: editImageFile ? URL.createObjectURL(editImageFile) : photo.src,
              }
            : photo
        )
      );
      alert('게시물이 수정되었습니다.');
    } else {
      const newPhoto = {
        id: Date.now(),
        title: title.trim(),
        content: content.trim(),
        src: image,
        category,
        comments: [],
        likes: 0,
        dislikes: 0,
      };
      setPhotos((prev) => [newPhoto, ...prev]);
    }
    setTitle('');
    setContent('');
    setImage(null);
    setEditImageFile(null);
    setCategory('전체');
    setEditId(null);
    setShowUploadForm(false);
    setCurrentPage(1);
  };

  const handleLike = (id) => {
    setPhotos((prev) =>
      prev.map((photo) => {
        if (photo.id === id) {
          const isLiked = likedPhotos[id];
          let newLikes = photo.likes;
          let newDislikes = photo.dislikes;

          if (isLiked) {
            newLikes = photo.likes - 1;
          } else {
            newLikes = photo.likes + 1;
            if (dislikedPhotos[id]) {
              newDislikes = photo.dislikes - 1;
              setDislikedPhotos((prev) => ({ ...prev, [id]: false }));
            }
          }
          return { ...photo, likes: newLikes, dislikes: newDislikes };
        }
        return photo;
      })
    );
    setLikedPhotos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDislike = (id) => {
    setPhotos((prev) =>
      prev.map((photo) => {
        if (photo.id === id) {
          const isDisliked = dislikedPhotos[id];
          let newDislikes = photo.dislikes;
          let newLikes = photo.likes;

          if (isDisliked) {
            newDislikes = photo.dislikes - 1;
          } else {
            newDislikes = photo.dislikes + 1;
            if (likedPhotos[id]) {
              newLikes = photo.likes - 1;
              setLikedPhotos((prev) => ({ ...prev, [id]: false }));
            }
          }
          return { ...photo, dislikes: newDislikes, likes: newLikes };
        }
        return photo;
      })
    );
    setDislikedPhotos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddComment = () => {
    if (!commentInput.trim()) return;
    const newComment = {
      id: Date.now(),
      text: commentInput.trim(),
      likes: 0,
      dislikes: 0,
      replies: [],
    };
    setPhotos((prev) =>
      prev.map((photo) =>
        photo.id === selectedPhotoId
          ? { ...photo, comments: [...photo.comments, newComment] }
          : photo
      )
    );
    setCommentInput('');
  };

  const handleAddReply = (commentId, replyText) => {
    if (!replyText.trim()) return;
    const newReply = {
      id: Date.now(),
      text: replyText.trim(),
      likes: 0,
      dislikes: 0,
    };

    setPhotos((prev) =>
      prev.map((photo) =>
        photo.id === selectedPhotoId
          ? {
              ...photo,
              comments: photo.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, replies: [...comment.replies, newReply] }
                  : comment
              ),
            }
          : photo
      )
    );

    setReplyInputs((prev) => ({ ...prev, [commentId]: '' }));
  };

  // 0 또는 1로 토글되는 좋아요 함수 (댓글 및 답글)
  const toggleCommentLike = (photoId, commentId, isReply = false, replyId = null) => {
    setPhotos((prev) =>
      prev.map((photo) => {
        if (photo.id !== photoId) return photo;

        const updatedComments = photo.comments.map((comment) => {
          if (comment.id !== commentId) return comment;

          if (isReply && replyId !== null) {
            const updatedReplies = comment.replies.map((reply) => {
              if (reply.id !== replyId) return reply;

              const newLike = reply.likes === 1 ? 0 : 1;
              // 좋아요 누르면 싫어요 0으로 초기화
              const newDislike = newLike === 1 ? 0 : reply.dislikes;

              return { ...reply, likes: newLike, dislikes: newDislike };
            });
            return { ...comment, replies: updatedReplies };
          } else {
            const newLike = comment.likes === 1 ? 0 : 1;
            const newDislike = newLike === 1 ? 0 : comment.dislikes;
            return { ...comment, likes: newLike, dislikes: newDislike };
          }
        });

        return { ...photo, comments: updatedComments };
      })
    );
  };

  // 0 또는 1로 토글되는 싫어요 함수 (댓글 및 답글)
  const toggleCommentDislike = (photoId, commentId, isReply = false, replyId = null) => {
    setPhotos((prev) =>
      prev.map((photo) => {
        if (photo.id !== photoId) return photo;

        const updatedComments = photo.comments.map((comment) => {
          if (comment.id !== commentId) return comment;

          if (isReply && replyId !== null) {
            const updatedReplies = comment.replies.map((reply) => {
              if (reply.id !== replyId) return reply;

              const newDislike = reply.dislikes === 1 ? 0 : 1;
              // 싫어요 누르면 좋아요 0으로 초기화
              const newLike = newDislike === 1 ? 0 : reply.likes;

              return { ...reply, dislikes: newDislike, likes: newLike };
            });
            return { ...comment, replies: updatedReplies };
          } else {
            const newDislike = comment.dislikes === 1 ? 0 : 1;
            const newLike = newDislike === 1 ? 0 : comment.likes;
            return { ...comment, dislikes: newDislike, likes: newLike };
          }
        });

        return { ...photo, comments: updatedComments };
      })
    );
  };

  const handleAddCategory = () => {
    const newCat = prompt('새 카테고리 이름을 입력하세요:');
    if (newCat && !categories.includes(newCat.trim())) {
      setCategories((prev) => [...prev, newCat.trim()]);
    }
  };

  const handleDeleteCategory = () => {
    const delCat = prompt('삭제할 카테고리 이름을 입력하세요:');
    if (delCat && categories.includes(delCat.trim()) && delCat.trim() !== '전체') {
      setCategories((prev) => prev.filter((cat) => cat !== delCat.trim()));
      if (filter === delCat.trim()) setFilter('전체');
    }
  };

  const handleEdit = (photo) => {
    setEditId(photo.id);
    setTitle(photo.title);
    setContent(photo.content);
    setCategory(photo.category);
    setImage(photo.src);
    setEditImageFile(null);
    setShowUploadForm(true);
    setSelectedPhotoId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setPhotos((prev) => prev.filter((photo) => photo.id !== id));
      if (editId === id) handleCancelEdit();
      if (selectedPhotoId === id) setSelectedPhotoId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setTitle('');
    setContent('');
    setImage(null);
    setCategory('전체');
    setEditImageFile(null);
    setShowUploadForm(false);
  };

  // 필터 및 검색 조건 적용
  const filteredPhotos = photos.filter((photo) => {
    const matchesCategory = filter === '전체' || photo.category === filter;
    const matchesSearch =
      photo.title.includes(searchTerm) || photo.content.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPhotos.length / itemsPerPage);
  const currentPhotos = filteredPhotos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 상세보기 화면 JSX
  const renderDetailView = (photo) => (
    <div className="detail-view">
      <button className="back-button" onClick={() => setSelectedPhotoId(null)}>
        목록으로 돌아가기
      </button>

      <h2>{photo.title}</h2>
      <img src={photo.src} alt={photo.title} className="detail-image" />
      <p className="detail-content">{photo.content}</p>
      <div className="like-dislike-detail">
        <button
          className={likedPhotos[photo.id] ? 'active' : ''}
          onClick={() => handleLike(photo.id)}
        >
          {likedPhotos[photo.id] ? '💔 좋아요 취소' : '❤️ 좋아요'} {photo.likes}
        </button>
        <button
          className={dislikedPhotos[photo.id] ? 'active' : ''}
          onClick={() => handleDislike(photo.id)}
        >
          {dislikedPhotos[photo.id] ? '💔 싫어요 취소' : '💔 싫어요'} {photo.dislikes || 0}
        </button>
      </div>
      <div className="comments-section">
        <h3>댓글</h3>
        {photo.comments.length === 0 && <p>댓글이 없습니다.</p>}
        <ul className="comments-list">
          {photo.comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              <div className="comment-text">- {comment.text}</div>
              <div className="comment-actions">
                <button onClick={() => toggleCommentLike(photo.id, comment.id)}>
                  👍 {comment.likes}
                </button>
                <button onClick={() => toggleCommentDislike(photo.id, comment.id)}>
                  👎 {comment.dislikes}
                </button>
                <button
                  onClick={() =>
                    setReplyInputs((prev) => ({
                      ...prev,
                      [comment.id]: prev[comment.id] !== undefined ? undefined : '',
                    }))
                  }
                >
                  답글 달기
                </button>
              </div>

              {replyInputs[comment.id] !== undefined && (
                <div className="reply-input-box">
                  <input
                    type="text"
                    placeholder="답글을 입력하세요"
                    value={replyInputs[comment.id]}
                    onChange={(e) =>
                      setReplyInputs((prev) => ({
                        ...prev,
                        [comment.id]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter')
                        handleAddReply(comment.id, replyInputs[comment.id]);
                    }}
                  />
                  <button onClick={() => handleAddReply(comment.id, replyInputs[comment.id])}>
                    등록
                  </button>
                </div>
              )}

              {comment.replies.map((reply) => (
                <ul key={reply.id} className="replies">
                  <li>
                    ↳ {reply.text}
                    <div className="comment-actions">
                      <button
                        onClick={() =>
                          toggleCommentLike(photo.id, comment.id, true, reply.id)
                        }
                      >
                        👍 {reply.likes}
                      </button>
                      <button
                        onClick={() =>
                          toggleCommentDislike(photo.id, comment.id, true, reply.id)
                        }
                      >
                        👎 {reply.dislikes}
                      </button>
                    </div>
                  </li>
                </ul>
              ))}
            </li>
          ))}
        </ul>

        <input
          type="text"
          placeholder="댓글 입력"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddComment();
            }
          }}
          className="comment-input"
        />
        <button onClick={handleAddComment} className="comment-submit">
          댓글 등록
        </button>
         <button onClick={(e) => { e.stopPropagation(); handleEdit(photo); }}> ✏️ 수정 </button>
         <button onClick={(e) => { e.stopPropagation(); handleDelete(photo.id); }}> 🗑 삭제</button>
      </div>
    </div>
  );

  return (
    <div className="photo-page">
      {!showUploadForm && selectedPhotoId === null && (
        <button
          className="toggle-upload"
          onClick={() => setShowUploadForm((prev) => !prev)}
        >
          글쓰기
        </button>
      )}

      {showUploadForm ? (
        <div className="upload-form">
          <button className="back-button" onClick={() => setShowUploadForm(false)}>
            목록으로 돌아가기
          </button>
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories
              .filter((cat) => cat !== '전체')
              .map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
          </select>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {image && <img src={image} alt="미리보기" className="preview-image" />}
          <div className="upload-buttons">
            <button onClick={handleSubmit}>
              {editId !== null ? '수정 완료' : '저장'}
            </button>
            {editId !== null && <button onClick={handleCancelEdit}>수정 취소</button>}
            <button onClick={handleAddCategory}>카테고리 추가</button>
            <button onClick={handleDeleteCategory}>카테고리 삭제</button>
          </div>
        </div>
      ) : selectedPhotoId !== null ? (
        renderDetailView(photos.find((p) => p.id === selectedPhotoId))
      ) : (
        <>
          <div className="filter-bar">
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="검색어 입력"
              value={inputSearchTerm}
              onChange={(e) => setInputSearchTerm(e.target.value)}
            />
            <button onClick={() => setSearchTerm(inputSearchTerm.trim())}>검색</button>
          </div>

          <div className="photo-list">
            {currentPhotos.length === 0 && <p>사진이 없습니다.</p>}
            {currentPhotos.map((photo) => (
              <div
                key={photo.id}
                className="photo-card"
                onClick={() => setSelectedPhotoId(photo.id)}
                style={{ cursor: 'pointer' }}
              >
                <h3>{photo.title}</h3>
                <p>
                  <strong>카테고리:</strong> {photo.category}
                </p>
                <img src={photo.src} alt={photo.title} className="card-image" />
                <p>{photo.content}</p>
                <div className="card-buttons">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(photo.id);
                    }}
                    className={likedPhotos[photo.id] ? 'active' : ''}
                  >
                    {likedPhotos[photo.id] ? '💔 좋아요 취소' : '❤️ 좋아요'} {photo.likes}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                <li
                  key={pageNum}
                  className={pageNum === currentPage ? 'active' : ''}
                  onClick={() => handlePageClick(pageNum)}
                >
                  {pageNum}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default PhotoPage;
