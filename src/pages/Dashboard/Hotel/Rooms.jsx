import { useState } from 'react';
import { Instructions, RoomsContainer, RoomContainer } from '../../../components/Dashboard/Hotel';
import { Container, Row, Col } from 'react-grid-system';

export default function Rooms() {
  const [rooms, setRooms] = useState([
    { id: 1, beds: 4, number: 101, userRoom: [1, 2, 3] },
    { id: 2, beds: 3, number: 102, userRoom: [1, 2] },
  ]);
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
    if (props.userRoom.length === props.beds) {
      for (let i = 0; i < props.beds; i++) {
        vacancyArray.push(OccupiedIcon);
      }
      isFull = true;
    } else {
      let available = props.beds - props.userRoom.length;
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
      for (let i = 0; i < props.userRoom.length; i++) {
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

  return (
    <>
      <Instructions>Ótima pedida! Agora escolha seu quarto:</Instructions>
      <RoomsContainer>
        <Container>
          <Row>
            {rooms.map((room) => (
              <Col key={room.number} xs={7} sm={6} md={4} lg={3}>
                <Room beds={room.beds} number={room.number} userRoom={room.userRoom} roomId={room.id} />
              </Col>
            ))}
          </Row>
        </Container>
      </RoomsContainer>
    </>
  );
}
