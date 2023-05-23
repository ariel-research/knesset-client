import styled from "styled-components";
import { palette } from "../../assets/colorsPalette";

export const TabContainer = styled.div`
  width: 100%;
  max-width: 500px;
`;

export const TabHeader = styled.div`
  display: flex;
  justify-content: center;
`;

export const TabButton = styled.button`
  padding: 10px 20px;
  background-color: white;
  font-size: 16px;
  border-right: ${(props) => (props.active ? "1px solid #dee2e6" : "none")};
  border-left: ${(props) => (props.active ? "1px solid #dee2e6" : "none")};
  border-top: ${(props) => (props.active ? `5px solid ${palette.brand}` : "none")};
  border-bottom: ${(props) => (props.active ? `1px solid ${palette.bleakWhite}` : "none")};
  color: ${palette.brand};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.active ? "blue" : "lightgray")};
  }
`;

export const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 100px;
  align-items: center;
  border: 1px solid #dee2e6;
  padding: 20px;
  gap: 10px;
`;

export const TabDescription = styled.div`
  font-weight: 500;
  color: ${palette.greyish};
`;