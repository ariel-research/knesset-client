import styled from "styled-components";

export const CompassResWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.5rem 0 2rem;
  box-sizing: border-box;
`;

export const ResultsHeader = styled.div`
  text-align: center;
  margin-bottom: 1.2rem;
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 1.25rem;
  width: 100%;
  flex-wrap: wrap;
`;

/* ── SCORES CARD ─────────────────────────────── */
export const ScoresCard = styled.div`
  flex: 0 0 350px;
  display: flex;
  flex-direction: column;
  max-height: 560px;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f2;
  box-shadow: 0 4px 16px rgba(0,0,0,.08);
  overflow: hidden;

  @media (max-width: 900px) {
    flex: 1 1 100%;
    max-height: 400px;
  }
`;

export const CardHeader = styled.div`
  padding: 0.85rem 1.1rem;
  border-bottom: 1px solid #e2e8f2;
  background: #f8fafc;
  display: flex;
  align-items: center;
  gap: 0.55rem;
`;

export const CardIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 7px;
  background: linear-gradient(135deg, #6366f1, #2563eb);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg { width: 14px; height: 14px; color: #fff; }
`;

export const CardTitleBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardTitle = styled.span`
  font-size: 0.92rem;
  font-weight: 700;
  color: #1b2a45;
  line-height: 1.2;
`;

export const CardSub = styled.span`
  font-size: 0.71rem;
  color: #64748b;
  margin-top: 1px;
`;

export const ScoresList = styled.div`
  padding: 0.55rem 1.1rem;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  direction: ltr;

  &::-webkit-scrollbar { width: 5px; }
  &::-webkit-scrollbar-thumb { background: #dde3f0; border-radius: 4px; }
`;

export const ScoreRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0;
  border-bottom: 1px solid #f1f5f9;
  direction: rtl;
  &:last-child { border-bottom: none; }
`;

export const ScoreRank = styled.span`
  font-size: 0.72rem;
  color: #94a3b8;
  font-weight: 700;
  min-width: 24px;
  flex-shrink: 0;
`;

export const ScoreName = styled.span`
  flex: 1;
  font-size: 0.9rem;
  font-weight: 500;
  color: #1b2a45;
  line-height: 1.35;
  word-break: break-word;
`;

export const ScoreTrack = styled.div`
  width: 70px;
  height: 5px;
  background: #f1f5f9;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
`;

export const ScoreFill = styled.div`
  height: 100%;
  border-radius: 10px;
  transition: width 1s ease 0.15s;
  background: ${({ positive }) =>
    positive
      ? 'linear-gradient(90deg, #6366f1, #3b82f6)'
      : 'linear-gradient(90deg, #fb7185, #e11d48)'};
`;

export const ScoreVal = styled.span`
  font-size: 0.82rem;
  font-weight: 700;
  min-width: 40px;
  text-align: left;
  flex-shrink: 0;
  color: ${({ positive }) => (positive ? '#4338ca' : '#be123c')};
`;

/* ── VOTES CARD ──────────────────────────────── */
export const VotesCard = styled.div`
  flex: 1;
  min-width: 340px;
  display: flex;
  flex-direction: column;
  max-height: 560px;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f2;
  box-shadow: 0 4px 16px rgba(0,0,0,.08);
  overflow: hidden;

  @media (max-width: 900px) {
    min-width: 0;
    flex: 1 1 100%;
    max-height: 500px;
  }
`;

export const VotesCardHeader = styled.div`
  padding: 0.75rem 1.1rem;
  border-bottom: 1px solid #e2e8f2;
  background: #f8fafc;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-wrap: wrap;
`;

export const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-right: auto;
`;

export const FilterLabel = styled.span`
  font-size: 0.76rem;
  color: #64748b;
  font-weight: 600;
`;

export const FilterSelect = styled.select`
  padding: 0.25rem 0.5rem;
  border: 1.5px solid #e2e8f2;
  border-radius: 6px;
  font-family: 'Heebo', sans-serif;
  font-size: 0.8rem;
  color: #1b2a45;
  background: #fff;
  cursor: pointer;
  outline: none;
  transition: border-color 0.18s;
  direction: rtl;

  &:focus { border-color: #2563eb; }
`;

