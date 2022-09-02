import { useState, useEffect } from 'react';
import { Instructions, RoomsContainer, RoomContainer, ConfirmationButton } from '..';
import { Container, Row, Col } from 'react-grid-system';
import useGetRooms from '../../../../hooks/api/useGetRooms';
import useConfirmReservation from '../../../../hooks/api/useConfirmReservation';
import { toast } from 'react-toastify';

export default function Rooms(props) {
  const { getRooms } = useGetRooms();
  const { confirmReservation } = useConfirmReservation();
  const [rooms, setRooms] = useState([]);
  const [chosen, setChosen] = useState(0);

  const OccupiedIcon = (key) => {
    return <ion-icon key={key} name="person"></ion-icon>;
  };

  const ChosenIcon = (key) => {
    return <ion-icon key={key} style={{ color: '#FF4791' }} name="person"></ion-icon>;
  };

  const AvailableIcon = (key) => {
    return <ion-icon key={key} name="person-outline"></ion-icon>;
  };

  const Room = (props) => {
    let vacancyArray = [];
    let isFull = false;
    let isChosen = false;
    if (props.UserRoom.length === props.beds) {
      for (let i = 0; i < props.beds; i++) {
        vacancyArray.push(OccupiedIcon);
      }
      isFull = true;
    } else {
      let available = props.beds - props.UserRoom.length;
      if (chosen === props.roomId) {
        available -= 1;
        isChosen = true;
      }
      for (let i = 0; i < available; i++) {
        vacancyArray.push(AvailableIcon);
      }
      if (chosen === props.roomId) {
        vacancyArray.push(ChosenIcon);
      }
      for (let i = 0; i < props.UserRoom.length; i++) {
        vacancyArray.push(OccupiedIcon);
      }
    }
    return (
      <RoomContainer isFull={isFull} chosen={isChosen} onClick={() => setChosen(props.roomId)}>
        <p>{props.number}</p>
        <div>{vacancyArray.map((icon, index) => icon(index))}</div>
      </RoomContainer>
    );
  };

  const handleConfirmation = () => {
    try {
      confirmReservation(chosen);
      toast('Reserva confirmada com sucesso!');
    } catch (error) {
      toast('Erro ao confirmar reserva!');
    }
  };

  useEffect(() => {
    if (props.hotelId) {
      const promise = getRooms(props.hotelId);
      promise.then((data) => {
        setRooms(data);
      });
    }
  }, [props.hotelId]);

  return (
    <>
      <Instructions>Ótima pedida! Agora escolha seu quarto:</Instructions>
      <RoomsContainer>
        <Container>
          <Row>
            {rooms.map((room) => (
              <Col key={room.number} xs={7} sm={6} md={4} lg={3}>
                <Room beds={room.beds} number={room.number} UserRoom={room.UserRoom} roomId={room.id} />
              </Col>
            ))}
          </Row>
        </Container>
      </RoomsContainer>
      {chosen ? <ConfirmationButton onClick={handleConfirmation}>RESERVAR QUARTO</ConfirmationButton> : <></>}
    </>
  );
}
