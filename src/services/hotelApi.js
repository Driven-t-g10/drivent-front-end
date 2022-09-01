import api, { parseToken } from './api';

export async function getHotel(token) {
  const response = await api.get('/hotel', parseToken(token));

  return response.data;
}
