import api from './api.js';

export async function getRooms(id, token) {
  const response = await api.get(`/hotel/rooms/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
