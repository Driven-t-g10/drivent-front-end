import styled from 'styled-components';

export const PlaceName = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  text-align: center;
  color: #7b7b7b;
  margin-bottom: 13px;
`;

export const ActivitiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 288px;
  height: 392px;
  border: 1px solid #d7d7d7;
  overflow-y: auto;
`;

export const ActivityContainer = styled.div`
  display: flex;
  width: 265px;
  height: ${(props) => (props.duration ? `${props.duration * 80}px` : '80px')};
  background: #f1f1f1;
  border-radius: 5px;
  margin-top: 10px;
  align-items: center;
  pointer-events: ${(props) => (props.full ? 'none' : 'auto')};
  cursor: pointer;

  > div:first-child {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 10px;
    height: 100%;
    width: 184px;
  }

  > div:nth-child(2) {
    height: 90%;
    border: 1px solid #cfcfcf;
    background: #cfcfcf;
    margin-left: 16px;
    margin-right: 10px;
  }

  > div:last-child {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-items: center;
    margin-right: 4px;

    ion-icon {
      font-size: 20px;
      color: ${(props) => (props.full ? '#CC6666' : '#078632')};
    }

    p {
      color: ${(props) => (props.full ? '#CC6666' : '#078632')};
      font-style: normal;
      font-weight: 400;
      font-size: 9px;
      line-height: 11px;
    }
  }

  h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    color: #343434;
    margin-top: 12px;
  }

  h2 {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #343434;
    margin-top: 6px;
  }
`;

export const Container = styled.div`
  display: flex;
  margin-top: 30px;
`;

export const Title = styled.h1`
  font-style: normal;
  font-weight: 400;
  font-size: 34px;
  line-height: 40px;
  color: #000000;
  margin-bottom: 26px;
`;
