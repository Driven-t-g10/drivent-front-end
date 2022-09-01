import api, { parseToken } from './api';

export async function getUserRoom(token) {
  const response = await api.get('/user-room', parseToken(token));

  return response.data;
}
