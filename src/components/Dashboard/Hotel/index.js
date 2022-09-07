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
  position: relative;
  right: 15px;
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

export const ConfirmationButton = styled.button`
  width: 182px;
  height: 37px;
  background: #e0e0e0;
  border: none;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #000000;
  margin-top: 36px;
  cursor: pointer;
`;

export const HotelOption = styled.div`
  display: flex;
  flex-direction: column;
  width: 196px;
  height: 264px;
  background: ${(props) => (props.chosen ? '#FFEED2' : '#f1f1f1')};
  border-radius: 10px;
  padding: 16px 14px;
  margin: 0 20px 20px 0;
  cursor: pointer;

  img {
    width: 168px;
    height: 109px;
    border-radius: 5px;
  }

  div {
    margin-bottom: 14px;
  }

  p {
    font-size: 13px;
    line-height: 14px;
    color: #3c3c3c;
  }

  p span {
    font-weight: 700;
  }

  & > p {
    font-size: 20px;
    line-height: 43px;
    color: #343434;
  }
`;

export const OptionsContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
`;

export const Alert = styled.p`
  font-family: 'Roboto, sans-serif';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #8e8e8e;
  width: 464px;
  margin: 0 auto;
  margin-top: 205px;
`;
