import styled from "styled-components";
import { palette } from "../../assets/colorsPalette";

export const TableContainer = styled.table`
  border-collapse: collapse;
  overflow: hidden;
  border-radius: 8px;
`;

export const TableHead = styled.thead`
  color: #fff;
  background-color: #f5f5f5;
  border-color: #454d55;
`;

export const TableHeaderRow = styled.tr`
  display: table;
  width: 100%;
  table-layout: fixed;
  font-family: Assistant, sans-serif;
  border-bottom: 2px solid ${palette.greyScale};
`;

export const TableBody = styled.tbody`
  display: block;
  height: 470px;
  background-color: white;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 10px;
    height: 328px;
    background: ${palette.greyScale};
  }
  ::-webkit-scrollbar-button {
    display: none;
  }
  ::-webkit-scrollbar-track {
    background: ${palette.greyScale};
  }
  ::-webkit-scrollbar-thumb {
    background: ${palette.brand};
    border-radius: 100px;
`;

export const TableRow = styled.tr`
  display: table;
  width: 100%;
  table-layout: fixed;
  font-family: Assistant, sans-serif;
`;

export const RemoveRowButton = styled.button`
  display: flex;
  background-color: transparent;
  border: 1px solid transparent;
  font-size: 30px;
  cursor: pointer;
  border-radius: 16px;
  &:hover {
    background-color: ${palette.brand};
  }
`;
