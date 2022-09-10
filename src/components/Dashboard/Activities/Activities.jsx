import { ActivityContainer } from './index.js';
import { useState, useEffect } from 'react';
import useGetActivities from '../../../hooks/api/useGetActivities.js';
import useSaveUserSchedule from '../../../hooks/api/useSaveUserSchedule.js';
import { toast } from 'react-toastify';

export default function Activities(props) {
  const { place, date } = props;
  const { getActivities } = useGetActivities();
  const { saveUserSchedule } = useSaveUserSchedule();
  const [activities, setActivities] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

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

  function handleState(isRegistered, isFull, vacancies, scheduleId) {
    const hasNoVacancies = (
      <>
        <ion-icon name="close-circle-outline"></ion-icon>
        <p>Esgotado</p>
      </>
    );

    const hasVacancies = (
      <>
        <ion-icon name="enter-outline" onClick={handleSaveUserSchedule(scheduleId)}></ion-icon>
        <p>{vacancies} vagas</p>
      </>
    );

    const isChosen = (
      <>
        <ion-icon name="checkmark-circle-outline"></ion-icon>
        <p>inscrito</p>
      </>
    );

    if (isRegistered) return isChosen;
    return isFull ? hasNoVacancies : hasVacancies;
  }

  function handleSaveUserSchedule(scheduleId) {
    return () => {
      const promise = saveUserSchedule(scheduleId);
      promise.then((res) => {
        toast('Inscrito com sucesso!');
        setIsSubscribed(true);
      });
      promise.catch((error) => {
        toast.error(error.response.data.message);
      });
    };
  }

  useEffect(() => {
    getActivities(place, date).then((res) => {
      setActivities(res);
    });
  }, [date, isSubscribed]);
  return (
    <>
      {activities.map((activity) => {
        const scheduleList = [];
        for (let i = 0; i < activity.Schedule.length; i++) {
          const duration = getActivityDuration(activity.Schedule[i].startTime, activity.Schedule[i].endTime);
          const time = `${activity.Schedule[i].startTime} - ${activity.Schedule[i].endTime}`;
          const subscribedUsers = activity.Schedule[i].UserActivity;
          const vacancies = activity.vacancy - subscribedUsers.length;
          let isFull = false;
          const { isRegistered } = activity.Schedule[i];
          if (vacancies === 0) isFull = true;
          scheduleList.push(
            <ActivityContainer
              duration={duration}
              key={activity.Schedule[i].id}
              full={isFull}
              isRegistered={isRegistered}
            >
              <div>
                <h1>{activity.name}</h1>
                <h2>{time}</h2>
              </div>
              <div />
              <div>{handleState(isRegistered, isFull, vacancies, activity.Schedule[i].id)}</div>
            </ActivityContainer>
          );
        }
        return scheduleList;
      })}
    </>
  );
}
