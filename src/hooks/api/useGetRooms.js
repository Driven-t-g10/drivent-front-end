import useAsync from '../useAsync';
import useToken from '../useToken';

import * as roomApi from '../../services/roomApi';

export default function useGetRooms() {
  const token = useToken();

  const {
    data: rooms,
    loading: roomsLoading,
    error: roomsError,
    act: getRooms,
  } = useAsync((id) => roomApi.getRooms(id, token));

  return {
    rooms,
    roomsLoading,
    roomsError,
    getRooms,
  };
}
