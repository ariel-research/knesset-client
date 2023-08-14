import styled, { css } from "styled-components";
import { palette } from "../../assets/colorsPalette";
import UserVoteBox from "../common/UserVoteBox";
import TableFooter from "./TableFooter";
import useTable from "./useTable";
import { useState } from "react";

const Table = (props) => {
    const { headers, data } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const [rows, setRows] = useState(5);
    const [slicedData, numOfPages] = useTable(data, currentPage, rows);

    const renderHeaders = () => {
        return (
            headers.map((header, i) => {
                return (
                    <TableHeader key={i}>{header}</TableHeader>
                )
            })
        )
    };

    const renderTableData = () => {
        return (
            slicedData.map((el, i) => {
                return (
                    <tr key={el.id}>
                        <TableCell>
                            <UserVoteBox billId={el.id} />
                        </TableCell>
                        <TableCell>{el.label}</TableCell>
                        <TableCell>{el.knessetNum}</TableCell>
                    </tr>
                )
            })
        )
    };

    return (
        <>
            <TableContainer>
                <thead>
                    <tr>
                        {renderHeaders()}
                    </tr>
                </thead>
                <tbody>
                    {slicedData && renderTableData()}
                </tbody>
            </TableContainer>
            <TableFooter range={numOfPages} setCurrentPage={setCurrentPage} rows={rows} setRows={setRows} />
        </>
    )
};

const Cell = css`
  padding: 1rem;
  text-align: right;
`;

const TableContainer = styled.table`
  width: 100%;
  color: white;
  border-collapse: collapse;
  color: black;
`;

const TableHeader = styled.th`
    ${Cell}
    background-color: ${palette.brand};
    position: sticky;
    font-family: sans-serif;
    text-transform: uppercase;
    font-weight: 600;
    color: white;
`;

const TableCell = styled.td`
    ${Cell}
`;

export default Table;