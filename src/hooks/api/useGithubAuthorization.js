import useAsync from '../useAsync';

import * as authApi from '../../services/authApi';

export default function useGithubAuthorization() {
  const {
    loading: LoadingGithub,
    error: ErrorGithub,
    act: loginOrRegisterGithub,
  } = useAsync(authApi.githubAuthorization, false);

  return {
    LoadingGithub,
    ErrorGithub,
    loginOrRegisterGithub,
  };
}
