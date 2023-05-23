import styled from "styled-components";
import { palette } from "../../assets/colorsPalette";

export const TableContainer = styled.table`
  border-collapse: collapse;
  overflow: hidden;
`;

export const TableHead = styled.thead`
  color: #fff;
  background-color: ${palette.brand};
  border-color: #454d55;
`;

export const TableHeaderRow = styled.tr`
  display: table;
  width: 100%;
  table-layout: fixed;
  font-family: Open Sans;
  border-bottom: 2px solid ${palette.greyScale};
`;

export const TableBody = styled.tbody`
  display: block;
  height: 327px;
  overflow-y: scroll;
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
  font-family: Open Sans;
`;
