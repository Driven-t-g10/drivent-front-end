import useAsync from '../useAsync';
import useToken from '../useToken';

import * as scheduleApi from '../../services/schedulesApi';
export default function useSaveUserSchedule() {
  const token = useToken();

  const {
    loading: saveUserScheduleLoading,
    error: saveUserScheduleError,
    act: saveUserSchedule,
  } = useAsync((data) => scheduleApi.saveUserSchedule(data, token), false);

  return {
    saveUserScheduleLoading,
    saveUserScheduleError,
    saveUserSchedule,
  };
}
