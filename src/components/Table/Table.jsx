import UserVoteBox from "../common/UserVoteBox";
import TableFooter from "./TableFooter";
import useTable from "./useTable";
import { useState } from "react";
import { RecordsSelect, TableCell, TableContainer, TableHeader, TableNav } from "./Table.styled";

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

    const selectNumOfResHandler = (e) => {
        setRows(e.target.value);
    };

    return (
        <>
            <TableNav>
                <RecordsSelect id="selectOption" value={rows} onChange={selectNumOfResHandler}>
                    <option value={5}>חמש רשומות</option>
                    <option value={10}>עשר רשומות</option>
                    <option value={50}>חמישים רשומות</option>
                </RecordsSelect>
            </TableNav>
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

export default Table;