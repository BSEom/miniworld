import axios from "axios";
// const STORAGE_KEY = 'miniroom_state';

// export const loadMiniroomState = () => {
//   const saved = localStorage.getItem(STORAGE_KEY);
//   if (!saved) return { items: [], positions: {}, flipped: {} };
//   try {
//     const parsed = JSON.parse(saved);
//     return {
//       items: parsed.items || [],
//       positions: parsed.positions || {},
//       flipped: parsed.flipped || {}
//     };
//   } catch (e) {
//     console.error("로컬 저장소 파싱 실패", e);
//     return { items: [], positions: {}, flipped: {} };
//   }
// };

// export const saveMiniroomState = (items, positions, flipped) => {
//   const data = { items, positions, flipped };
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
// };



// MongoDB 사용 수정
export const loadMiniroomState = async (userId) => {
  const res = await axios.get(`/api/minirooms/state/${userId}`);
   // miniroomId만 제외하고 반환
  const items = Array.isArray(res.data)
    ? res.data.map(({ miniroomId, ...rest }) => rest)
    : res.data;
  
  console.log(items)
  return items;
};

export const saveMiniroomState = async (userId, items) => {
  await axios.put(`/api/minirooms/state/${userId}`, items);
};