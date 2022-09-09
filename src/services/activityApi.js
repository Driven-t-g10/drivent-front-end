import api, { parseToken } from './api';

export async function getActivitiesDates(token) {
  const response = await api.get('/activities/dates', parseToken(token));

  return response.data;
}
