import styled from "styled-components";

export const HomepageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #f2f5fa;
`;

/* Centered content column, matches mockup .page */
export const PageContent = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem 3rem;
`;

/* ── Hero ──────────────────────────────────── */
export const Hero = styled.div`
  text-align: center;
  padding: 2rem 1rem 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
`;

export const HeroTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: #eff6ff;
  color: #2563eb;
  padding: 0.28rem 0.85rem;
  border-radius: 20px;
  font-size: 0.76rem;
  font-weight: 600;
  border: 1px solid #bfdbfe;
  svg { width: 12px; height: 12px; flex-shrink: 0; }
`;

export const HeroTitle = styled.h1`
  font-size: 2.1rem;
  font-weight: 800;
  color: #1b2a45;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin: 0;
  em { color: #2563eb; font-style: normal; }
`;

export const HeroBody = styled.p`
  color: #64748b;
  font-size: 0.93rem;
  max-width: 460px;
  line-height: 1.65;
  font-weight: 400;
  margin: 0;
`;

/* ── Stats bar ─────────────────────────────── */
export const StatsRow = styled.div`
  display: flex;
  gap: 0.65rem;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0.5rem 0 1.4rem;
`;

export const StatPill = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: #ffffff;
  border: 1px solid #e2e8f2;
  padding: 0.35rem 0.85rem;
  border-radius: 20px;
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 500;
  box-shadow: 0 1px 3px rgba(0,0,0,.06);
  svg { width: 12px; height: 12px; color: #94a3b8; flex-shrink: 0; }
  strong { color: #1b2a45; font-weight: 700; }
`;

/* ── Tabs ──────────────────────────────────── */
export const TabsWrapper = styled.div`
  display: flex;
  border-bottom: 2px solid #e2e8f2;
  direction: rtl;
  margin-bottom: 1.25rem;
`;

export const TabButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
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
  svg { width: 14px; height: 14px; }
  &:hover { color: #1b2a45; }
`;

export const TabCount = styled.span`
  background: ${({ muted }) => muted ? '#e2e8f2' : '#2563eb'};
  color: ${({ muted }) => muted ? '#64748b' : '#fff'};
  border-radius: 9px;
  font-size: 0.66rem;
  padding: 0.08rem 0.4rem;
  font-weight: 700;
  line-height: 1.4;
`;

/* ── Table wrapper ─────────────────────────── */
export const TableWrapper = styled.div`
  overflow-x: auto;
`;

/* Legacy exports kept for compatibility */
export const HomepageWrapperLegacy = HomepageWrapper;
export const HeadersWrapper = styled.div``;
export const Header = styled.div``;
export const HintsWrapper = styled.ul``;
export const StyledHint = styled.h3``;
export const ActionButton = styled.button`
  background: linear-gradient(135deg, #4f46e5, #2563eb);
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 700;
  color: white;
  border: none;
  padding: 0.7rem 1.8rem;
  cursor: pointer;
`;
export const EmptyMatchesMessage = styled.div`
  font-size: 1.05rem;
  font-weight: 400;
  color: #64748b;
  text-align: center;
  margin: 3rem auto;
  line-height: 1.6;
`;
