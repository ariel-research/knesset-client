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
  font-family: Assistant, sans-serif; 
  align-self: center;
  font-weight: 400;
  font-size: 40px;
  `;

export const HintsWrapper = styled.ul`
  font-size: 16px;
  font-weight: 500;
  font-size: 20px;
  font-family: Assistant, sans-serif; 
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
  font-family: Assistant, sans-serif; 
  border: 1px solid transparent;
  cursor: pointer;
`;


export const TabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  border-bottom: 2px solid #eee;
  direction: rtl;
  font-family: Assistant, sans-serif; 

`;


export const TabButton = styled.button`
  background: none;
  border: none;
  padding: 1rem 2rem;
  font-weight: 600;
  font-family: Assistant, sans-serif; 
  font-size: 1rem;
  color: ${({ isActive }) => (isActive ? "#4a90e2" : "#555")};
  border-bottom: ${({ isActive }) => (isActive ? "3px solid #4a90e2" : "3px solid transparent")};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #4a90e2;
  }
`;

export const EmptyMatchesMessage = styled.div`
  font-family: Assistant, sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: ${palette.brand};
  text-align: center;
  margin: 2rem auto;
  line-height: 1.6;
`;