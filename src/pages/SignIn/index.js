import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Link from '../../components/Link';
import { Row, Title, Label } from '../../components/Auth';

import EventInfoContext from '../../contexts/EventInfoContext';
import UserContext from '../../contexts/UserContext';

import useSignIn from '../../hooks/api/useSignIn';
import useGithubAuthorization from '../../hooks/api/useGithubAuthorization';
import useLoginOrRegisterOauth from '../../hooks/api/useLoginOrRegisterOauth';
import qs from 'query-string';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loadingSignIn, signIn } = useSignIn();
  const { authenticationGithub } = useGithubAuthorization();
  const { LoadingGithub, loginOrRegisterOauth } = useLoginOrRegisterOauth();

  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();

    try {
      const userData = await signIn(email, password);
      setUserData(userData);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      toast('Não foi possível fazer o login!');
    }
  }

  // eslint-disable-next-line space-before-function-paren
  useEffect(async () => {
    const { code } = qs.parseUrl(window.location.href).query;
    if (!code) return;

    try {
      const userData = await loginOrRegisterOauth(code);
      setUserData(userData);
      navigate('/dashboard');
      toast('Login realizado com sucesso!');
    } catch (error) {
      toast('Não foi possível fazer o login!');
    }
  }, []);

  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
        <Title>{eventInfo.title}</Title>
      </Row>
      <Row>
        <Label>Entrar</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            label="Senha"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignIn || LoadingGithub}>
            Entrar
          </Button>
        </form>
      </Row>
      <Row>
        <label>Ou</label>
        <Button
          color="secodary"
          onClick={() => authenticationGithub()}
          fullWidth
          disabled={loadingSignIn || LoadingGithub}
        >
          Entrar com GitHub
        </Button>
      </Row>
      <Row>
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
      </Row>
    </AuthLayout>
  );
}
