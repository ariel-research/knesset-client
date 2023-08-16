import { useState } from "react";
import styled from "styled-components";

const TableFooter = (props) => {
    const { range, setCurrentPage, rows, setRows } = props;
    const [activeButton, setActiveButton] = useState(1);

    const pageButtonHandler = (data) => {
        setCurrentPage(data);
        setActiveButton(data);
    };

    const selectNumOfResHandler = (e) => {
        setRows(e.target.value);
    };

    const renderPaginationButtons = () => {
        return (
            range.map((num) => {
                return (
                    <FooterButton isActive={activeButton === num ? true : false} key={num} onClick={() => pageButtonHandler(num)}>{num}</FooterButton>
                )
            })
        );
    };

    return (
        <TableFooterWrapper>
            {range && renderPaginationButtons()}
            <select id="selectOption" value={rows} onChange={selectNumOfResHandler}>
                <option value={5}>חמש רשומות</option>
                <option value={10}>עשר רשומות</option>
                <option value={50}>חמישים רשומות</option>
            </select>
        </TableFooterWrapper>
    )

};

const TableFooterWrapper = styled.div`
    background-color: #f1f1f1;
    padding: 8px 0px;
    width: 100%;
    font-weight: 500;
    text-align: left;
    font-size: 16px;
    color: #2c3e50;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-x: scroll;
    gap: 5px
`;

const FooterButton = styled.button`
    border: none;
    padding: 7px 14px;
    border-radius: 10px;
    cursor: pointer;
    margin-right: 4px;
    margin-left: 4px;
    color: ${(props) => props.isActive ? 'white' : '#2c3e50'};
    background: ${(props) => props.isActive ? '#185adb' : '#f9f9f9'};
`;

export default TableFooter;