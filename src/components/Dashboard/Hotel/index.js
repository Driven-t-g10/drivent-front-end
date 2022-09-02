import styled from 'styled-components';

export const Instructions = styled.p`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;

  color: #8e8e8e;
  margin-top: 52px;
  margin-bottom: 33px;
`;

export const RoomsContainer = styled.div`
  width: 100%;
`;

export const RoomContainer = styled.div`
  width: 190px;
  height: 45px;
  border: 1px solid #cecece;
  border-radius: 10px;
  background-color: ${(props) => (props.isFull ? '#E9E9E9' : props.chosen ? '#FFEED2' : 'transparent')};
  pointer-events: ${(props) => (props.isFull ? 'none' : 'auto')};
  cursor: pointer;
  margin-bottom: 10px;
  position: relative;

  p {
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    position: absolute;
    top: 11px;
    left: 16px;

    color: ${(props) => (props.isFull ? '#9D9D9D' : '#454545')};
  }

  div {
    display: flex;
    width: 95%;
    height: 100%;
    align-items: center;
    justify-content: flex-end;
  }

  ion-icon {
    font-size: 20px;
    margin-right: 6px;
    color: ${(props) => (props.isFull ? '#9D9D9D' : '#000000')};
  }
`;
