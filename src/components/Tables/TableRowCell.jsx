import React from "react";
import styled from "styled-components";
import { palette } from "../../assets/colorsPalette";

const TableRowCell = ({
  width,
  textAlign,
  padding,
  noBorders,
  textColor,
  weight,
  ...props
}) => {
  return (
    <TableRowCellStyled
      {...{ width, textAlign, padding, noBorders, textColor, weight, ...props }}
    />
  );
};

const TableRowCellStyled = styled.td`
    height: 64px;
    width: ${({ width }) => (width ? width : "")}};
    text-overflow: ellipsis;
    overflow: hidden; 
    max-width: 100px;
    border-bottom: ${({ noBorders }) =>
      noBorders ? "" : `1px solid ${palette.greyScale}`};
    text-align: ${({ textAlign }) => (textAlign ? textAlign : "")};
    padding:${({ padding }) => (padding ? padding : "")};
    color: ${({ textColor }) => (textColor ? textColor : "")};
    font-weight: ${({ weight }) => (weight ? weight : 600)};
    font-family: Assistant, sans-serif;
`;
export default TableRowCell;
