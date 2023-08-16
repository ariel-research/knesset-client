import styled from "styled-components";
import { palette } from "../assets/colorsPalette";

export const CompassResWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #f7f7f7;
  justify-content: center;
`;

export const ResultsHeader = styled.div`
  font-family: Open Sans;
  align-self: center;
  font-weight: 400;
  font-size: 2.5rem;
  font-family: Poppins, sans-serif;
  color: ${palette.brand};
`;

export const DataContainer = styled.div`
  display: flex;
  padding: 2rem;
  justify-content: center;
  gap: 4rem;
`;

export const VotesTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  height: 600px;
  gap: 10px;
`;

export const ScoreGraphContainer = styled.div`
  display: flex;
  width: 600px;
  height: 70%;
`;

export const ProgressVoterName = styled.div`
  width: 30px;
  text-align: center;
`;

export const GradesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const GradesHeader = styled.div`
  font-family: Open Sans;
  align-self: center;
  font-weight: 200;
  font-size: 2rem;
  font-family: Poppins, sans-serif;
  color: ${palette.brand};
`;

export const Grades = styled.div`
  display: flex;
  width: 350px;
  height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
  flex-direction: column;
  align-items: center;
  max-width: 38em;
  padding: 1em 3em 2em 3em;
  margin: 0em auto;
  background-color: #fff;
  border-radius: 4.2px;
  box-shadow: 0px 3px 10px -2px rgba(0, 0, 0, 0.2);

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background: ${palette.greyScale};
  }

  ::-webkit-scrollbar-button {
    display: none;
  }
  ::-webkit-scrollbar-track {
    background: ${palette.greyScale};
  }
  ::-webkit-scrollbar-thumb {
    background: ${palette.brand};
    border-radius: 100px;
  }
`;

export const VoterGradeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: smaller;
`;
