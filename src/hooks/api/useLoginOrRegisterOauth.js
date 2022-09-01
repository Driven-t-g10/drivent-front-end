import useAsync from '../useAsync';

import * as authApi from '../../services/authApi';

export default function useLoginOrRegisterOauth() {
  const { loading: LoadingGithub, error: ErrorGithub, act: loginOrRegisterOauth } = useAsync(authApi.signOauth, false);

  return {
    LoadingGithub,
    ErrorGithub,
    loginOrRegisterOauth,
  };
}
