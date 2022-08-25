import useAsync from '../useAsync';
import useToken from '../useToken';

import * as userTicketApi from './../../services/userTicketApi';

export default function useGetUserTicket() {
  const token = useToken();

  const {
    data: userTicket,
    loading: userTicketLoading,
    error: userTicketError,
    act: getUserTicket,
  } = useAsync(() => userTicketApi.getUserTicket(token));

  return {
    userTicket,
    userTicketLoading,
    userTicketError,
    getUserTicket,
  };
}
