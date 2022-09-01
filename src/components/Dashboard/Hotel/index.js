import styled from 'styled-components';

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
