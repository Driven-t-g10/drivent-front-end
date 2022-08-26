import instance from './api.js';

export async function getTicket() {
  const response = await instance.get('/tickets');
  return response.data;
}
