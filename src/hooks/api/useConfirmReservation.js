import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelApi from '../../services/hotelApi';

export default function useConfirmReservation() {
  const token = useToken();

  const {
    data: reservation,
    loading: reservationLoading,
    error: reservationError,
    act: confirmReservation,
  } = useAsync((roomId) => hotelApi.confirmReservation(roomId, token));

  return {
    reservation,
    reservationLoading,
    reservationError,
    confirmReservation,
  };
}
