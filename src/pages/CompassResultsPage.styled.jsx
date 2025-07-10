import styled from "styled-components";
import { palette } from "../assets/colorsPalette";

export const CompassResWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2rem 1rem;
  background-color: #f7f7f7;
  box-sizing: border-box;
`;

export const ResultsHeader = styled.h2`
  font-family: "Assistant", sans-serif;
  font-size: 2rem;
  font-weight: 600;
  color: ${palette.brand};
  margin-bottom: 1.5rem;
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 3rem;
  width: 100%;
  max-width: 1200px;
  flex-wrap: wrap;
`;

export const GradesWrapper = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 400px;
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

export const GradesHeader = styled.h3`
  font-family: "Assistant", sans-serif;
  font-size: 1.4rem;
  font-weight: 500;
  color: ${palette.brand};
  margin-bottom: 1rem;
`;

export const Grades = styled.div`
  width: 100%;
  height: 500px;
  overflow-y: auto;
  padding-right: 8px;

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${palette.brand};
    border-radius: 6px;
  }
`;

export const VoterGradeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
`;

export const ProgressVoterName = styled.span`
  font-size: 0.9rem;
  color: #333;
  flex-shrink: 0;
`;

export const VotesTableWrapper = styled.div`
  flex: 2;
  min-width: 400px;
  max-width: 700px;
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
