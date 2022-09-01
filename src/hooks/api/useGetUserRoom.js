import useAsync from '../useAsync';
import useToken from '../useToken';

import * as userRoomApi from '../../services/userRoomApi';

export default function useGetUserRoom() {
  const token = useToken();

  const {
    data: userRoom,
    loading: userRoomLoading,
    error: userRoomError,
    act: getUserRoom,
  } = useAsync(() => userRoomApi.getUserRoom(token));

  return {
    userRoom,
    userRoomLoading,
    userRoomError,
    getUserRoom,
  };
}
