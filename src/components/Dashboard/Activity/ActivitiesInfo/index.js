import { useEffect, useState } from 'react';
import useGetActivitiesDates from '../../../../hooks/api/useGetActivitiesDates';
import { DateButton, Instructions } from '../index';

export default function ActivitiesInfo() {
  const [dates, setDate] = useState([]);
  const [chosen, setChosen] = useState(null);
  const { getActivitiesDates } = useGetActivitiesDates();

  useEffect(() => {
    const promise = getActivitiesDates();
    promise.then((response) => {
      setDate(response);
    });
  }, []);

  return (
    <>
      <Instructions>Primeiro, filtre pelo dia do evento:</Instructions>
      {dates.map((date) => (
        <DateButton key={date.date} onClick={() => setChosen(date.date)}>
          {date.date}
        </DateButton>
      ))}
    </>
  );
}
