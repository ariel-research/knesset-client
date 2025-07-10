import styled from "styled-components";

export const TableWrapper = styled.div`
  height: 80vh;
  direction: rtl;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

export const TableHead = styled.thead`
  background-color: #f5f5f5;
`;

export const TableHeaderCell = styled.th`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: right;
  font-weight: bold;
  align-items: center;
  display: flex;
  position: sticky;
  z-index: 3;
  background-color: #f5f5f5;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);

  &:nth-child(1) { flex: 1; }
  &:nth-child(2) { flex: 0.8; }
  &:nth-child(3) { flex: 4; }
  &:nth-child(4) { flex: 0.9; }
  &:nth-child(5) { flex: 2; }
`;

export const ScrollableTBody = styled.tbody`
  display: block;
  max-height: 70vh;
  overflow-y: auto;
  width: 100%;
`;

export const TableRow = styled.tr`
  display: flex;
  width: 100%;

  &:nth-child(even) {
    background-color: #fafafa;
  }
`;

export const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #eee;
  vertical-align: top;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: normal;


  &:nth-child(1) { flex: 1; }
  &:nth-child(2) { flex: 0.8; }
  &:nth-child(3) { flex: 4; }
  &:nth-child(4) { flex: 0.9; }
  &:nth-child(5) { flex: 2; }
`;
