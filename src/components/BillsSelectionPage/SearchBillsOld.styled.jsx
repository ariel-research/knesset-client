import styled from "styled-components";

export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1.25rem 0 0.5rem;
`;

export const TabHeader = styled.button`
  height: 50px;
  width: 200px;
  padding: 10px 20px;
  background-color: white;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f2;
  color: #2563eb;
  cursor: pointer;
`;

export const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.65rem;
`;

export const TabDescription = styled.div`
  text-align: center;
  font-size: 0.85rem;
  font-weight: 400;
  color: #64748b;
`;

export const BillsSelectionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  background: #ffffff;
  border-radius: 50px;
  padding: 0.45rem 0.85rem 0.45rem 1rem;
  border: 1.5px solid #e2e8f2;
  box-shadow: 0 4px 16px rgba(0,0,0,.08);
  direction: rtl;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus-within {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37,99,235,.1), 0 4px 16px rgba(0,0,0,.08);
  }
`;

export const AutoCompleteContainer = styled.div`
  flex: 1;
  min-width: 300px;
`;

export const SearchIconWrap = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: #94a3b8;
  svg { width: 16px; height: 16px; }
`;

export const SearchDivider = styled.div`
  width: 1px;
  height: 22px;
  background: #e2e8f2;
  flex-shrink: 0;
`;

export const SelectKnessetNum = styled.select`
  border-radius: 4px;
  height: 44px;
  font-family: 'Heebo', sans-serif;
  font-size: 0.9rem;
  border: 1px solid #e2e8f2;
  padding: 0 0.5rem;
  color: #1b2a45;
  background: transparent;
  cursor: pointer;
`;

export const OptionKnessetNum = styled.option`
  font-family: 'Heebo', sans-serif;
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const ActionButton = styled.button`
  background: linear-gradient(135deg, #4f46e5, #2563eb);
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 700;
  color: white;
  border: none;
  padding: 0.5rem 1.2rem;
  cursor: pointer;
`;

export const ResetButton = styled.button`
  background-color: white;
  border: 1.5px solid #e2e8f2;
  color: #64748b;
  font-family: 'Heebo', sans-serif;
  border-radius: 8px;
  font-size: 0.88rem;
  padding: 8px 16px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    border-color: #94a3b8;
    color: #1b2a45;
  }
`;
