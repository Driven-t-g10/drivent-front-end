import useAsync from '../useAsync';
import useToken from '../useToken';

import * as userTicketApi from '../../services/useTicketApi';

export default function useSaveUserTicket() {
  const token = useToken();

  const {
    loading: saveUserTicketLoading,
    error: saveUserTicketError,
    act: saveUserTicket,
  } = useAsync((data) => userTicketApi.save(data, token), false);

  return {
    saveUserTicketLoading,
    saveUserTicketError,
    saveUserTicket,
  };
}
