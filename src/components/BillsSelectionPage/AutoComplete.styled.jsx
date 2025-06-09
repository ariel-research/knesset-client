import styled from "styled-components";
import { palette } from "../../assets/colorsPalette";

export const AutoCompleteRowsWrapper = styled.div`
  max-height: 241px;
  width: 98%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    height: 90%;
    background: ${palette.geryLight};
  }
  ::-webkit-scrollbar-button {
    display: none;
  }
  ::-webkit-scrollbar-track {
    background: ${palette.geryLight};
  }
  ::-webkit-scrollbar-thumb {
    background: ${palette.geryLight};
    border-radius: 100px;
  }
`;

export const CreateNewTeamButton = styled.button`
  height: 50px;
  width: 100px;
  font-family: Assistant, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: ${palette.geryLight};
  background: transparent;
  border: 0;
  text-transform: uppercase;
  cursor: pointer;
`;

export const NewTeamInput = styled.input`
  width: 300px;
  height: 50px;
  background: transparent;
  border: 0;
  outline: none;
  font-family: Assistant, sans-serif;
  font-style: italic;
  font-weight: 600;
  color: ${palette.bleakWhite};
  margin-left: 20px;
`;

export const CreateNewTeam = styled.div`
  display: flex;
  align-items: center;
  height: 53px;
  background: ${palette.geryLight};
  border-radius: 0 0 16px 16px;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px 0 16px;
`;

export const IconButton = styled.button`
  background: transparent;
  border: 1px solid transparent;
  outline: none;
  cursor: pointer;
`;

export const AutoCompleteWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const AutoCompleteInput = styled.input`
  width: 100%;
  height: 100%;
  border: 1px solid black;
  border-radius: 4px;
  text-align: right;
  font-family: Assistant, sans-serif;
  font-style: normal;
  font-size: 16px;
  line-height: 22px;
  &:focus {
    outline: none;
  }
  direction: rtl;
`;

export const AutoCompleteRowsContainer = styled.div`
  position: absolute;
  width: 100%;
  margin-top: 180px;
  height: fit-content;
  max-height: 120px;
  overflow-y: scroll;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;

  z-index: 1;
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background: ${palette.geryLight};
  }

  ::-webkit-scrollbar-button {
    display: none;
  }
  ::-webkit-scrollbar-track {
    background: rgb(219, 222, 225);
  }
  ::-webkit-scrollbar-thumb {
    background: ${palette.brand};
    border-radius: 100px;
  }
`;

export const AutoCompleteRow = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  text-align: right;
  direction: rtl;
  font-family: Assistant, sans-serif;
  font-size: 14px;
  color: black;
  border-bottom: 1px solid ${palette.geryLight};
  background-color: ${palette.greyLight};
  cursor: pointer;
  padding: 0 12px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  min-width: 0;
`;
