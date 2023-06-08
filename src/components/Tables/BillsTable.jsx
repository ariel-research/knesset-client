import { useState, useEffect } from "react";
import TableHeaderCell from "./TableHeaderCell";
import TableRowCell from "./TableRowCell";
import {
  RemoveRowButton,
  TableBody,
  TableContainer,
  TableHead,
  TableHeaderRow,
  TableRow,
} from "./BillsTable.styled";
import { useDispatch, useSelector } from "react-redux";
import { TABLE_FLAGS } from "../../assets/consts";
import UserVoteBox from "../common/UserVoteBox";
import { loadBill, removeBillFinal } from "../redux/finalBillsSlice";
import { removeBill } from "../redux/selectedBillsSlice";

const BillsTable = (props) => {
  const { prefix, data, action } = props;
  const [rowsData, setRowsData] = useState([]);
  const searchedBills = useSelector((state) => state.selectedBills);
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

  const renderActionComponent = (id, index) => {
    const billData = searchedBills.find((bill) => bill.id === id);
    return action === TABLE_FLAGS.REMOVE_ROW ? (
      <button
        variant="contained"
        color="primary"
        onClick={() => {
          actionHandler(billData, loadBill);
        }}
      >
        הוסף
      </button>
    ) : (
      <UserVoteBox index={index} billId={id} />
    );
  };

  const actionHandler = (bill_id, action) => {
    dispatch(action(bill_id));
  };

  const renderTableBody = () => {
    return (
      rowsData &&
      rowsData.map(({ id, label }, index) => {
        return (
          <TableRow
            id={`${prefix}-table_row-${index}`}
            key={`${prefix}-table_row-${index}`}
          >
            <TableRowCell
              id={`${prefix}-action-${index}`}
              key={`${prefix}-action-${index}`}
              width="15%"
              textAlign="center"
            >
              {renderActionComponent(id, index)}
            </TableRowCell>
            <TableRowCell
              id={`${prefix}-label-${index}`}
              key={`${prefix}-label-${index}`}
              width="65%"
              textAlign="center"
            >
              {label}
            </TableRowCell>
            <TableRowCell
              id={`${prefix}-identifier-${index}`}
              key={`${prefix}-identifier-${index}`}
              width="15%"
              textAlign="center"
            >
              {id}
            </TableRowCell>
            <TableRowCell
              id={`${prefix}-index-${index}`}
              key={`${prefix}-index-${index}`}
              width="5%"
              textAlign="center"
            >
              <>
                <RemoveRowButton
                  onClick={() => {
                    actionHandler(
                      id,
                      action === TABLE_FLAGS.REMOVE_ROW
                        ? removeBill
                        : removeBillFinal
                    );
                  }}
                >
                  x
                </RemoveRowButton>
              </>
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
          <TableHeaderCell
            id={`${prefix}-action_header`}
            width="15%"
            textAlign="center">
              {action === TABLE_FLAGS.REMOVE_ROW? "" : "הצבעתך"}
            </TableHeaderCell>
          <TableHeaderCell
            id={`${prefix}-label_header`}
            width="65%"
            textAlign="center"
          >
            הצעת חוק
          </TableHeaderCell>
          <TableHeaderCell
            id={`${prefix}-identifier_header`}
            width="15%"
            textAlign="center"
          >
            מזהה חוק
          </TableHeaderCell>
          <TableHeaderCell id={`${prefix}-index_header`} width="5%" />
        </TableHeaderRow>
      </TableHead>
      <TableBody id={`${prefix}-table_body`}>{renderTableBody()}</TableBody>
    </TableContainer>
  );
};

export default BillsTable;
