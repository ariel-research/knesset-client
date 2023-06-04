import styled from "styled-components";
import { palette } from "../assets/colorsPalette";

export const CompassResWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  gap: 50px;
  background-color: #f7f7f7;
  padding: 30px;
  justify-content: center;
  flex: 0.8;
`;

export const DataContainer = styled.div`
  display: flex;
  padding: 30px;
  justify-content: center;
  align-items: center;
  gap: 50px;
  flex: 0.8;
`;

export const VotesTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45%;
  gap: 10px;
`;

export const ScoreGraphContainer = styled.div`
  display: flex;
  width: 600px;
  height: 70%;
`;

export const FilterButton = styled.button`
  background-color: ${palette.brand};
  border-radius: 8px;
  font-size: 15px;
  color: white;
  font-family: sans-serif;
  border: 1px solid transparent;
  cursor: pointer;
`;
