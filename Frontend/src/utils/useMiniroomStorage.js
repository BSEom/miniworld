
const STORAGE_KEY = 'miniroom_state';

export const loadMiniroomState = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return { items: [], positions: {}, flipped: {} };
  try {
    const parsed = JSON.parse(saved);
    return {
      items: parsed.items || [],
      positions: parsed.positions || {},
      flipped: parsed.flipped || {}
    };
  } catch (e) {
    console.error("로컬 저장소 파싱 실패", e);
    return { items: [], positions: {}, flipped: {} };
  }
};

export const saveMiniroomState = (items, positions, flipped) => {
  const data = { items, positions, flipped };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};



// // MongoDB 사용 수정
// export const loadMiniroomState = async (userId) => {
//   const res = await axios.get(`/api/miniroom/${userId}`);
//   return res.data;
// };

// export const saveMiniroomState = async (items, positions, flipped) => {
//   await axios.post('/api/miniroom/save', { items, positions, flipped });
// };
