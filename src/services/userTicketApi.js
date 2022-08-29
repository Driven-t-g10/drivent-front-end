import api, { parseToken } from './api';

export async function saveUserTicket(data, token) {
  const response = await api.post(`user-ticket/${data.ticketId}`, { hasHotel: data.hasHotel }, parseToken(token));

  return response.data;
}

export async function getUserTicket(token) {
  const promise = api.get('user-ticket', parseToken(token));
  const response = await promise;
  return response.data;
}

export async function updateUserTicketPayment(id, token) {
  const response = await api.patch(`user-ticket/payment/${id}`, {}, parseToken(token));
  return response.data;
}
