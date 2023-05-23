import { useState, useEffect } from "react";
import TableHeaderCell from "./TableHeaderCell";
import TableRowCell from "./TableRowCell";
import {
  TableBody,
  TableContainer,
  TableHead,
  TableHeaderRow,
  TableRow,
} from "./BillsTable.styled";
import { useDispatch } from "react-redux";

const BillsTable = (props) => {
  const { data, action } = props;
  const [rowsData, setRowsData] = useState([]);
  const dispatch = useDispatch();

  const parseData = (data) => {
    if (!data) {
      return;
    }
    const res = data.map((obj, index) => ({
      ...obj,
      index: index,
      id: obj.id,
      label: obj.label,
    }));
    return res;
  };

  const renderRemoveRowButton = (id, handler) => {
    const handleButtonClick = () => {
      handler(id, action);
    };
    return (
      <button variant="contained" color="primary" onClick={handleButtonClick}>
        הסר
      </button>
    );
  };

  const removeRow = (bill_id, action) => {
    dispatch(action(bill_id));
  };

  const renderTableBody = () => {
    return (
      rowsData &&
      rowsData.map(({ id, label }, index) => {
        return (
          <TableRow key={`suggestion_table_row-${index}`}>
            {action && (
              <TableRowCell width="3%" textAlign="center">
                {renderRemoveRowButton(id, removeRow)}
              </TableRowCell>
            )}

            <TableRowCell width="40%" textAlign="center">
              {label}
            </TableRowCell>
            <TableRowCell width="10%" textAlign="center">
              {id}
            </TableRowCell>
            <TableRowCell width="3%" textAlign="center">
              {index + 1}
            </TableRowCell>
          </TableRow>
        );
      })
    );
  };

  useEffect(() => {
    setRowsData(parseData(data));
  }, [data]);

  return (
    <TableContainer>
      <TableHead>
        <TableHeaderRow>
          <TableHeaderCell key="group_header" width="40%" textAlign="center">
            הצעת חוק
          </TableHeaderCell>
          <TableHeaderCell key="platform_header" width="10%" textAlign="center">
            מזהה חוק
          </TableHeaderCell>
          <TableHeaderCell key="user_header" width="3%" />
        </TableHeaderRow>
      </TableHead>
      <TableBody>{renderTableBody()}</TableBody>
    </TableContainer>
  );
};

export default BillsTable;
