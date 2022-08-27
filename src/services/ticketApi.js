import instance from './api.js';

export async function getTicket(token) {
  const response = await instance.get('/tickets', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
