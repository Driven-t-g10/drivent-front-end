import styled from 'styled-components';

export const Title = styled.h1`
  font-family: 'Roboto', sans-serif, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 34px;
  line-height: 40px;
  color: #000000;
  margin-bottom: 37px;
`;

export const Instructions = styled.p`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #8e8e8e;
  margin-bottom: 17px;
  margin-top: 10px;
`;

export const DateButton = styled.button`
  width: 131px;
  height: 37px;
  background-color: ${(props) => (props.chosen ? '#FFD37D' : '#e0e0e0')};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;
  margin: 17px;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  cursor: pointer;
`;
