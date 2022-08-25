import { parseToken } from './api';
import api from '/api';

export async function save(data, token) {
  const response = await api.post(`user-ticket/${data.ticketId}`, {}, parseToken(token));

  return response.data;
}
