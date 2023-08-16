import styled from "styled-components";
import { palette } from "../assets/colorsPalette";

export const HeadersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${palette.brand};
  margin-bottom: 0.5rem;
`;

export const Header = styled.div`
  font-family: Open Sans;
  align-self: center;
  font-weight: 400;
  font-size: 40px;
  font-family: Poppins, sans-serif;
`;

export const HintsWrapper = styled.ul`
  font-size: 16px;
  font-weight: 500;
  font-size: 20px;
  font-family: Poppins, sans-serif;
  list-style-position: inside;
  direction: rtl;
`;

export const HomepageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    gap: 1rem;
`;

export const StyledHint = styled.h3`
    width: 50rem;
    text-align: center;
`;

export const TableWrapper = styled.div`
    opacity: ${(props) => props.loadingState ? 0.2 : 1};
    width: min(1000px, 100% - 3rem);
`;

export const ActionButton = styled.button`
  background-color: ${(props) => props.disabled ? 'grey' : palette.brand};
  border-radius: 8px;
  font-size: 20px;
  color: white;
  font-family: sans-serif;
  border: 1px solid transparent;
  cursor: pointer;
`;