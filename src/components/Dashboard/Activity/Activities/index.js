import { DayButton, Instructions } from '../../../components/Dashboard/Activity';

export default function Activities() {
  const days = [
    {
      date: 'Segunda, 02/09',
    },
    { date: 'Terça, 03/09' },
  ];
  return (
    <>
      <Instructions>Primeiro, filtre pelo dia do evento:</Instructions>
      {days.map((day) => (
        <DayButton>{day.date}</DayButton>
      ))}
    </>
  );
}
