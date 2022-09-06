import { ConfirmationButton, HotelOption, Instructions } from '..';

export default function UserRoom({ userRoom }) {
  const hotel = userRoom.Room.Hotel;
  const room = userRoom.Room;

  function showRoomType(beds) {
    if (beds === 1) return 'Single';
    if (beds === 2) return 'Double';
    if (beds === 3) return 'Triple';
  }

  function showPeopleInYourRoom(people) {
    if (people === 1) return 'Apenas você';
    else return `Você e mais ${people - 1}`;
  }

  return (
    <>
      <Instructions>Você já escolheu o seu quarto</Instructions>
      <HotelOption>
        <img src={hotel.image} alt={hotel.name} />
        <p>{hotel.name}</p>
        <div>
          <p>
            <span>Quarto reservado</span>
          </p>
          <p>
            {room.number} ({showRoomType(room.beds)})
          </p>
        </div>
        <div>
          <p>
            <span>Pessoas no seu quarto</span>
          </p>
          <p>{showPeopleInYourRoom(room._count.UserRoom)}</p>
        </div>
      </HotelOption>
      <ConfirmationButton>TROCAR DE QUARTO</ConfirmationButton>
    </>
  );
}
