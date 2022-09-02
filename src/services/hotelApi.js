import api, { parseToken } from './api';

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

export async function getHotel(token) {
  const response = await api.get('/hotel', parseToken(token));

  return response.data;
}
