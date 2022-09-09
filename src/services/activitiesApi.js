import api, { parseToken } from './api.js';

export async function getPlaces(token) {
  const response = await api.get('/activities/places', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getActivities(place, date, token) {
  const response = await api.get(`/activities?place=${place}&date=${date}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getActivitiesDates(token) {
  const response = await api.get('/activities/dates', parseToken(token));

  return response.data;
}
