import { ActivityContainer } from './index.js';
import { useState, useEffect } from 'react';
import useGetActivities from '../../../hooks/api/useGetActivities.js';

export default function Activities(props) {
  const { place, date } = props;
  const { getActivities } = useGetActivities();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    getActivities(place, date).then((res) => {
      setActivities(res);
    });
  }, []);
  return (
    <>
      {activities.map((activity) => {
        const time = `${activity.Schedule[0].startTime} - ${activity.Schedule[0].endTime}`;
        return (
          <ActivityContainer duration={activity.duration} key={activity.id}>
            <div>
              <h1>{activity.name}</h1>
              <h2>{time}</h2>
            </div>
            <div />
            <div>
              <ion-icon name="enter-outline"></ion-icon>
              <p> vagas</p>
            </div>
          </ActivityContainer>
        );
      })}
    </>
  );
}
