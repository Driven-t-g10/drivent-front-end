import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activityApi from '../../services/activityApi';

export default function useGetActivitiesDates() {
  const token = useToken();

  const {
    data: dates,
    loading: datesLoading,
    error: datesError,
    act: getActivitiesDates,
  } = useAsync(() => activityApi.getActivitiesDates(token));

  return {
    dates,
    datesLoading,
    datesError,
    getActivitiesDates,
  };
}
