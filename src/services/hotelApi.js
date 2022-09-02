import api from './api.js';

export async function confirmReservation(roomId, token) {
  const response = await api.post(
    '/hotel/reservation',
    {
      roomId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}
