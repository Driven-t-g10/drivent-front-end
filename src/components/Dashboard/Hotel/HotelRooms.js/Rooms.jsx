import { useState, useEffect } from 'react';
import { Instructions, RoomsContainer, RoomContainer, ConfirmationButton } from '..';
import { Container, Row, Col } from 'react-grid-system';
import useGetRooms from '../../../../hooks/api/useGetRooms';
import useConfirmReservation from '../../../../hooks/api/useConfirmReservation';
import { toast } from 'react-toastify';
import UserContext from '../../../../contexts/UserContext';
import { useContext } from 'react';

export default function Rooms(props) {
  const { getRooms } = useGetRooms();
  const { confirmReservation } = useConfirmReservation();
  const [rooms, setRooms] = useState([]);
  const [chosen, setChosen] = useState(0);
  const { userData } = useContext(UserContext);

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
        if (props.UserRoom[i].userId === userData.user.id) {
          if (chosen === props.UserRoom[i].roomId) {
            vacancyArray.push(ChosenIcon);
          } else vacancyArray.push(AvailableIcon);
        } else vacancyArray.push(OccupiedIcon);
      }
      if (props.beds === 1 && chosen === props.UserRoom[0].roomId) {
        isFull = false;
        isChosen = true;
      } else if (props.UserRoom[0].userId === userData.user.id) {
        isFull = false;
      } else isFull = true;
    } else {
      let available = props.beds - props.UserRoom.length;
      if (chosen === props.roomId) {
        for (let i = 0; i < props.UserRoom.length; i++) {
          if (props.UserRoom[i].userId === userData.user.id) {
            available += 1;
          }
        }
        available -= 1;
        isChosen = true;
      }
      if (chosen !== props.roomId) {
        for (let i = 0; i < props.UserRoom.length; i++) {
          if (props.UserRoom[i].userId === userData.user.id) available += 1;
        }
      }
      for (let i = 0; i < available; i++) {
        vacancyArray.push(AvailableIcon);
      }
      if (chosen === props.roomId) {
        vacancyArray.push(ChosenIcon);
      }
      for (let i = 0; i < props.UserRoom.length; i++) {
        if (!(props.UserRoom[i].userId === userData.user.id)) vacancyArray.push(OccupiedIcon);
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
      props.setBooked(true);
      props.setLoading(true);
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

        for (let i = 0; i < data.length && chosen === 0; i++) {
          if (data[i].UserRoom.length) {
            for (let j = 0; j < data[i].UserRoom.length; j++) {
              if (data[i].UserRoom[j].userId === userData.user.id) {
                setChosen(data[i].UserRoom[j].roomId);
              }
            }
          }
        }
      });
    }
  }, [props.hotelId, chosen]);

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
