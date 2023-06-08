import styled from "styled-components";
import { palette } from "../../assets/colorsPalette";

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
