import { PlaceName, ActivitiesContainer, ListContainer, Container } from './index.js';
import Activities from './Activities.jsx';
import useGetPlaces from '../../../hooks/api/useGetPlaces.js';
import { useEffect, useState } from 'react';

export default function ActivitiesList(props) {
  const { date } = props;
  const { getPlaces } = useGetPlaces();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getPlaces().then((res) => {
      setPlaces(res);
    });
  }, []);
  return (
    <Container>
      {places.map((place) => {
        return (
          <ActivitiesContainer key={place.place}>
            <PlaceName>{place.place}</PlaceName>
            <ListContainer>
              <Activities place={place.place} date={date} />
            </ListContainer>
          </ActivitiesContainer>
        );
      })}
    </Container>
  );
}
