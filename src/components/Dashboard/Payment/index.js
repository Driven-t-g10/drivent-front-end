import styled from 'styled-components';

export const Title = styled.h1`
  font-family: 'Roboto, sans-serif';
  font-style: normal;
  font-weight: 400;
  font-size: 34px;
  line-height: 40px;
  color: #000000;
  margin-bottom: 37px;
`;

export const Instructions = styled.p`
  font-family: 'Roboto, sans-serif';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #8e8e8e;
  margin-bottom: 17px;
`;

export const Option = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 145px;
  height: 145px;
  border: ${(props) => (props.chosen ? 'none' : '1px solid #cecece')};
  background: ${(props) => (props.chosen ? '#FFEED2' : 'transparent')};
  border-radius: 20px;
  margin-right: 24px;
  cursor: pointer;
  h1 {
    font-family: 'Roboto, sans-serif';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #454545;
    margin-bottom: 3px;
  }
  p {
    font-family: 'Roboto, sans-serif';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #898989;
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Alert = styled.p`
  font-family: 'Roboto, sans-serif';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #8e8e8e;
  width: 388px;
  margin: 0 auto;
  margin-top: 205px;
`;
