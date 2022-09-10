import api, { parseToken } from './api';

export async function saveUserSchedule(scheduleId, token) {
  const response = await api.post(`/user-schedule/${scheduleId}`, {}, parseToken(token));

  return response.data;
}
