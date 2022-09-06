import qs from 'query-string';
import api from './api';

export async function signIn(email, password) {
  const response = await api.post('/auth/sign-in', { email, password });
  return response.data;
}

export async function signOauth(code) {
  try {
    const response = await api.post(`/auth/oauth/${code}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function githubAuthorization() {
  const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';
  const params = {
    response_type: 'code',
    scope: 'user public_repo',
    client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_GITHUB_REDIRECT_URI,
    state: 'Drivent',
  };
  const queryString = qs.stringify(params);
  const authorizationUrl = `${GITHUB_AUTH_URL}?${queryString}`;
  window.location.href = authorizationUrl;
}
