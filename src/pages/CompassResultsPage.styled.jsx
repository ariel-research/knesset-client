import styled from "styled-components";

export const CompassResWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  gap: 30px;
  background-color: #f7f7f7;
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 100px;
  flex: 0.2;
`;

export const Card = styled.div`
  display: flex;
  height: 100%;
  padding: 22px;
  border-radius: 12px;
  background-color: #fff;
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex: 0.8;
`;

export const VotesTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45%;
`;

export const ScoreGraphContainer = styled.div`
  display: flex;
  width: 800px;
  height: 400px;
`;
