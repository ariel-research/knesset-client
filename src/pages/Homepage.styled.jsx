import styled from "styled-components";

export const HomepageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #f2f5fa;
  gap: 0;
`;

export const HeadersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #1b2a45;
  margin-bottom: 0.5rem;
`;

export const Header = styled.div`
  align-self: center;
  font-weight: 700;
  font-size: 2rem;
  color: #1b2a45;
`;

export const HintsWrapper = styled.ul`
  font-size: 1rem;
  font-weight: 500;
  list-style-position: inside;
  direction: rtl;
  color: #64748b;
`;

export const StyledHint = styled.h3`
  width: 50rem;
  text-align: center;
`;

export const TableWrapper = styled.div`
  opacity: ${(props) => props.loadingState ? 0.2 : 1};
  width: min(1100px, 100% - 2rem);
  transition: opacity 0.2s;
  overflow-x: auto;
`;

export const ActionButton = styled.button`
  background: ${(props) => props.disabled ? '#94a3b8' : 'linear-gradient(135deg, #4f46e5, #2563eb)'};
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 700;
  color: white;
  border: none;
  padding: 0.7rem 1.8rem;
  cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
  box-shadow: ${(props) => props.disabled ? 'none' : '0 4px 16px rgba(79,70,229,.28)'};
  transition: transform 0.18s, box-shadow 0.18s;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(79,70,229,.36);
  }
`;

export const TabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 2px solid #e2e8f2;
  direction: rtl;
  width: min(1100px, 100% - 2rem);
  margin-bottom: 1.25rem;
`;

export const TabButton = styled.button`
  background: none;
  border: none;
  padding: 0.78rem 1.4rem;
  font-weight: 600;
  font-family: 'Heebo', sans-serif;
  font-size: 0.88rem;
  color: ${({ isActive }) => (isActive ? '#2563eb' : '#64748b')};
  border-bottom: 3px solid ${({ isActive }) => (isActive ? '#2563eb' : 'transparent')};
  margin-bottom: -2px;
  transition: all 0.18s;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    color: #1b2a45;
  }
`;

export const EmptyMatchesMessage = styled.div`
  font-size: 1.05rem;
  font-weight: 400;
  color: #64748b;
  text-align: center;
  margin: 3rem auto;
  line-height: 1.6;
`;
