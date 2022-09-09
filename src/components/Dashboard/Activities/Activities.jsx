import { ActivityContainer } from './index.js';
import { useState, useEffect } from 'react';
import useGetActivities from '../../../hooks/api/useGetActivities.js';

export default function Activities(props) {
  const { place, date } = props;
  const { getActivities } = useGetActivities();
  const [activities, setActivities] = useState([]);

  function getActivityDuration(startTime, endTime) {
    let start = new Date();
    let end = new Date();
    const startValue = startTime.split(':');
    const endValue = endTime.split(':');
    start.setHours(startValue[0], startValue[1]);
    end.setHours(endValue[0], endValue[1]);
    const duration = (end - start) / (3.6 * 10 ** 6);
    return duration;
  }

  useEffect(() => {
    getActivities(place, date).then((res) => {
      setActivities(res);
    });
  }, []);
  return (
    <>
      {activities.map((activity) => {
        const duration = getActivityDuration(activity.Schedule[0].startTime, activity.Schedule[0].endTime);
        const time = `${activity.Schedule[0].startTime} - ${activity.Schedule[0].endTime}`;
        const subscribedUsers = activity.Schedule[0].UserActivity.length;
        const vacancies = activity.vacancy - subscribedUsers;
        let isFull = false;
        if (vacancies === 0) isFull = true;
        return (
          <ActivityContainer duration={duration} key={activity.id} full={isFull}>
            <div>
              <h1>{activity.name}</h1>
              <h2>{time}</h2>
            </div>
            <div />
            <div>
              {isFull ? (
                <>
                  <ion-icon name="close-circle-outline"></ion-icon>
                  <p>Esgotado</p>
                </>
              ) : (
                <>
                  <ion-icon name="enter-outline"></ion-icon>
                  <p>{vacancies} vagas</p>
                </>
              )}
            </div>
          </ActivityContainer>
        );
      })}
    </>
  );
}
