import styled from "styled-components";
import { palette } from "../../assets/colorsPalette";

export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
`;

export const TabHeader = styled.button`
  height: 50px;
  width: 200px;
  padding: 10px 20px;
  background-color: white;
  font-size: 16px;
  border-right: 1px solid #dee2e6;
  border-left: 1px solid #dee2e6;
  border-top: 5px solid ${palette.brand};
  border-bottom: 1px solid ${palette.bleakWhite};
  color: ${palette.brand};
  transition: background-color 0.3s ease;
`;

export const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  height: 100px;
  border-radius: 8px;
  align-items: center;
  background-color: white;
  border: 1px solid #dee2e6;
  padding: 20px;
  gap: 10px;
`;

export const TabDescription = styled.div`
  text-align: center;
  font-weight: 500;
  color: ${palette.brand};
`;

export const SelectKnessetNum = styled.select`
  border-radius: 4px;
  height: 44px;
  font-family: Assistant, sans-serif;
  font-style: normal;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
`;

export const AutoCompleteContainer = styled.div`
  height: 44px;
  width: 400px;
`;

export const OptionKnessetNum = styled.option`
  appearance: none;
  border-radius: 4px;
  font-family: Assistant, sans-serif;
  text-align: center;
`;

export const BillsSelectionContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 20px;
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const ActionButton = styled.button`
  background-color: ${palette.brand};
  border-radius: 8px;
  font-size: 20px;
  color: white;
  font-family: Assistant, sans-serif;
  border: 1px solid transparent;
  cursor: pointer;
`;
