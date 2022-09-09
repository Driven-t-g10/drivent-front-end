import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useGetPlaces() {
  const token = useToken();

  const {
    data: places,
    loading: placesLoading,
    error: placesError,
    act: getPlaces,
  } = useAsync(() => activitiesApi.getPlaces(token));

  return {
    places,
    placesLoading,
    placesError,
    getPlaces,
  };
}
