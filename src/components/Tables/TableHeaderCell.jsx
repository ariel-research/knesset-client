import React from "react";
import styled from "styled-components";
import { palette } from "../../assets/colorsPalette";

const TableHeaderCell = ({ width, textAlign, noBorders, ...props }) => {
  return (
    <TableHeaderCellStyled {...{ width, textAlign, noBorders, ...props }} />
  );
};

const TableHeaderCellStyled = styled.th`
  position: sticky;
  height: 61px;
  width: ${({ width }) => (width ? width : "")}};
  text-align: left;
  font-family: Assistant, sans-serif;
  text-transform: uppercase;
  font-weight: 600;
  color: black;
  text-align: ${({ textAlign }) => (textAlign ? textAlign : "")};
  border-bottom: ${({ noBorders }) =>
    noBorders ? "" : `2px solid ${palette.greyScale}`};
`;

export default TableHeaderCell;
