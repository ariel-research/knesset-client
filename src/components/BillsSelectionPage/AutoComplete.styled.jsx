import styled from "styled-components";

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
  height: 36px;
  border: none;
  outline: none;
  background: transparent;
  text-align: right;
  font-family: 'Heebo', sans-serif;
  font-size: 0.9rem;
  color: #1b2a45;
  direction: rtl;

  &::placeholder {
    color: #94a3b8;
  }
`;

export const AutoCompleteRowsContainer = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 100%;
  min-width: 340px;
  height: fit-content;
  max-height: 220px;
  overflow-y: auto;
  background: #ffffff;
  border: 1px solid #e2e8f2;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0,0,0,.1);
  z-index: 50;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb {
    background: #dde3f0;
    border-radius: 4px;
  }
`;

export const AutoCompleteRowsWrapper = styled.div`
  max-height: 220px;
  overflow-y: auto;
`;

export const AutoCompleteRow = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  text-align: right;
  direction: rtl;
  font-family: 'Heebo', sans-serif;
  font-size: 0.85rem;
  color: #1b2a45;
  border-bottom: 1px solid #f1f5f9;
  cursor: pointer;
  padding: 0 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background 0.1s;

  &:last-child { border-bottom: none; }
  &:hover { background: #f8faff; }
`;

/* legacy exports kept for compatibility */
export const CreateNewTeamButton = styled.button`display: none;`;
export const NewTeamInput = styled.input`display: none;`;
export const CreateNewTeam = styled.div`display: none;`;
export const InputWrapper = styled.div`display: flex; align-items: center; padding: 0 16px;`;
export const IconButton = styled.button`background: transparent; border: none; cursor: pointer;`;
