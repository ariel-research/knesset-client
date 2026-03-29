import styled from "styled-components";

export const TableWrapper = styled.div`
  direction: rtl;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f2;
  box-shadow: 0 4px 16px rgba(0,0,0,.08);
  overflow: hidden;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

export const TableHead = styled.thead`
  background: #f8fafc;
`;

export const TableHeaderCell = styled.th`
  padding: 0.75rem 1rem;
  border-bottom: 2px solid #e2e8f2;
  text-align: right;
  font-size: 0.76rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 3;
  background: #f8fafc;

  /* date */
  &:nth-child(1) { flex: 0 0 110px; }
  /* knesset num */
  &:nth-child(2) { flex: 0 0 80px; }
  /* bill name — takes remaining space */
  &:nth-child(3) { flex: 1; }
  /* link icon */
  &:nth-child(4) { flex: 0 0 60px; justify-content: center; }
  /* vote buttons */
  &:nth-child(5) { flex: 0 0 140px; justify-content: center; }
`;

export const ScrollableTBody = styled.tbody`
  display: block;
  max-height: calc(100vh - 310px);
  min-height: 200px;
  overflow-y: auto;
  width: 100%;

  &::-webkit-scrollbar { width: 5px; }
  &::-webkit-scrollbar-thumb {
    background: #dde3f0;
    border-radius: 4px;
  }
`;

export const TableRow = styled.tr`
  display: flex;
  width: 100%;
  direction: rtl;
  border-bottom: 1px solid #f1f5f9;
  transition: background 0.12s;

  &:hover { background: #f8faff; }
  &:last-child { border-bottom: none; }
`;

export const TableCell = styled.td`
  padding: 0.85rem 1rem;
  font-size: 0.93rem;
  color: #1b2a45;
  display: flex;
  align-items: center;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: normal;

  /* date */
  &:nth-child(1) { flex: 0 0 110px; color: #64748b; font-size: 0.85rem; }
  /* knesset num */
  &:nth-child(2) { flex: 0 0 80px; }
  /* bill name */
  &:nth-child(3) { flex: 1; font-weight: 500; line-height: 1.5; }
  /* link */
  &:nth-child(4) { flex: 0 0 60px; justify-content: center; }
  /* vote */
  &:nth-child(5) { flex: 0 0 140px; justify-content: center; }
`;
