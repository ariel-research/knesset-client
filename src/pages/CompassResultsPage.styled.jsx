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
  width: 600px;
  height: 600px;
  gap: 10px;
`;

export const ScoreGraphContainer = styled.div`
  display: flex;
  width: 600px;
  height: 70%;
`;

export const FilterFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const FilterActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
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

export const SelectMemberKnesset = styled.select`
  border-radius: 4px;
  height: 44px;
  font-family: sans-serif;
  font-style: normal;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
`;

export const OptionMemberKnesset = styled.option`
  appearance: none;
  border-radius: 4px;
  font-family: sans-serif;
  text-align: center;
`;

export const OptionVote = styled.option`
  appearance: none;
  border-radius: 4px;
  font-family: sans-serif;
  text-align: center;
`;

export const ProgressVoterName = styled.div`
  width: 30px;
  text-align: center;
`;

export const GradesWrapper = styled.div`
display: flex;
width: 350px;
height: 600px;
overflow-y: auto;
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
  height: 328px;
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
`;

export const VoterGradeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: smaller;
`;
