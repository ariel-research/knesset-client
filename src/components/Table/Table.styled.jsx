import styled, { css } from "styled-components";
import { palette } from "../../assets/colorsPalette";

export const Cell = css`
  padding: 1rem;
  text-align: right;
`;

export const TableContainer = styled.table`
  min-height: 200px;
  width: 100%;
  color: white;
  border-collapse: collapse;
  color: black;
`;

export const TableHeader = styled.th`
    ${Cell}
    background-color: ${palette.brand};
    position: sticky;
    font-family: sans-serif;
    text-transform: uppercase;
    font-weight: 600;
    color: white;
`;

export const TableCell = styled.td`
    ${Cell}
`;

export const TableNav = styled.div`
    background-color: #f1f1f1;
    padding: 8px 0px;
    width: 100%;
    font-weight: 500;
    text-align: left;
    font-size: 16px;
    color: #2c3e50;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    display: flex;
    justify-content: right;
    overflow-x: scroll;
`;

export const RecordsSelect = styled.select`
    margin: 0.5rem;
    margin-right: 2rem;
`;