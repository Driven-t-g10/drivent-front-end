import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useGetActivitiesDates() {
  const token = useToken();

  const {
    data: dates,
    loading: datesLoading,
    error: datesError,
    act: getActivitiesDates,
  } = useAsync(() => activitiesApi.getActivitiesDates(token));

  return {
    dates,
    datesLoading,
    datesError,
    getActivitiesDates,
  };
}
