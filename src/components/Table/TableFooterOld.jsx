import { useState } from "react";
import styled from "styled-components";

const PAGINATION_NUM = 5;

const TableFooter = (props) => {
    const { range, setCurrentPage } = props;
    const [activeButton, setActiveButton] = useState(1);

    const pageButtonHandler = (data) => {
        setCurrentPage(data);
        setActiveButton(data);
    };

    const renderPaginationButtons = () => {
        const rangeStart = Math.max(activeButton - PAGINATION_NUM, range[0]);
        const rangeEnd = Math.min(activeButton + PAGINATION_NUM, range[range.length - 1]);
        return range.slice(rangeStart - 1, rangeEnd).map(i => (
            <FooterButton
                isActive={activeButton === i}
                key={i}
                onClick={() => pageButtonHandler(i)}
            >
                {i}
            </FooterButton>
        ));
    };

    return (
        <TableFooterWrapper>
            {range && renderPaginationButtons()}
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