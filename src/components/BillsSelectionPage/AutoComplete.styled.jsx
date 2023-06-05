import styled from "styled-components";
import { palette } from "../../assets/colorsPalette";

export const AutoCompleteRowsWrapper = styled.div`
  max-height: 241px;
  width: 98%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 6px;
    height: 90%;
    background: ${palette.greyish};
  }
  ::-webkit-scrollbar-button {
    display: none;
  }
  ::-webkit-scrollbar-track {
    background: ${palette.greyish};
    padding-right: 5px;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${palette.greyish};
    border-radius: 100px;
  }
`;

export const CreateNewTeamButton = styled.button`
  height: 50px;
  width: 100px;
  font-family: Open Sans;
  font-size: 12px;
  font-weight: 600;
  color: ${palette.greyish};
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
  font-family: Open Sans;
  font-style: italic;
  font-weight: 600;
  color: ${palette.bleakWhite};
  margin-left: 20px;
`;

export const CreateNewTeam = styled.div`
  display: flex;
  align-items: center;
  height: 53px;
  background: ${palette.greyish};
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
  font-family: sans-serif;
  font-style: normal;
  font-size: 16px;
  line-height: 22px;
  &:focus {
    outline: none;
  }
`;

export const AutoCompleteRowsContainer = styled.div`
  position: absolute;
  width: 100%;
  margin-top: 180px;
  min-height: 142px;
  max-height: 100px;
  overflow-y: scroll;
  border-radius: 5px;
  background-color: rgb(222, 226, 230);
  border: 1px solid rgb(145, 154, 164);
  z-index: 1;
`;

export const AutoCompleteRow = styled.div`
  display: flex;
  height: 30px;
  width: 359px;
  align-items: center;
  list-style-type: none;
  font-family: Open Sans;
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
  border-bottom: 1px solid ${palette.greyish};
  background-color: ${palette.greyScale};
  margin-left: 24px;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
