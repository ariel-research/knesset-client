import styled from "styled-components";

export const Suggestion = styled.div`
  background-color: white;
`;

export const autoCompleteStyle = {
  position: "absolute",
  maxHeight: "241px",
  width: "50%",
  left: "25%",
  overflowY: "auto",
  zIndex: 1,
};

export const AutoCompleteWrapper = styled.div`
  display: flex;
  width: 442px;
  justify-content: center;
  border-radius: 5px;
  border: 1px solid transparent;
`;
