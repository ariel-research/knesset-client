import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import {
  getAllBills,
  getAllKnessetNum,
  getBillsOfKnesset,
} from "../../utils/apiUtils";
import AutoComplete from "../BillsSelectionPage/AutoComplete";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "../redux/searchedBillSlice";
import { addBill, addMultipleBills } from "../redux/selectedBillsSlice";
import TabsCards from "../Tabs/TabsCards";
import { palette } from "../../assets/colorsPalette";

const EMPTY_BILL = { id: "", label: "" };

const SearchBills = () => {
  const [allBills, setAllBills] = useState([]);
  const [allKnessetNum, setAllKnessetNum] = useState([]);
  const [selectedKnessetNum, setSelectedKnessetNum] = useState("1");
  const currentSearchedBill = useSelector((state) => state.searchedBill);
  const dispatch = useDispatch();

  const addBillHandler = () => {
    if (currentSearchedBill.id !== EMPTY_BILL.id) {
      dispatch(addBill(currentSearchedBill));
      dispatch(clear());
    }
  };

  const addKnessetNumBIlls = () => {
    const arr = [];
    getBillsOfKnesset(selectedKnessetNum)
      .then((res) => {
        const bills = res.data.bills;
        bills.forEach((bill) => {
          const current = { id: bill.id, label: bill.name };
          arr.push(current);
        });
        dispatch(addMultipleBills(arr));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const tabsHeaders = [
    {
      title: "מספר כנסת",
      description: "חפש הצעות חוק המשוייכות לכנסת מסויימת",
      content: (
        <select
          value={selectedKnessetNum}
          onChange={(e) => setSelectedKnessetNum(e.target.value)}
        >
          {allKnessetNum.map((num, index) => (
            <option key={`knesset-num_${index}`} value={num.KnessetNum}>
              {num.KnessetNum}
            </option>
          ))}
        </select>
      ),
      action: (
        <ActionButton onClick={addKnessetNumBIlls}>
          הוסף הצעות חוק המשוייכות לכנסת
        </ActionButton>
      ),
    },
    {
      title: "טקסט חופשי",
      description: "חפש הצעות חוק על פי טקסט חופשי",
      content: <AutoComplete data={allBills} />,
      action: (
        <ActionButton onClick={addBillHandler}>הוסף הצעת חוק</ActionButton>
      ),
    },
  ];

  useEffect(() => {
    getAllBills()
      .then((res) => {
        setAllBills(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getAllKnessetNum()
      .then((res) => {
        setAllKnessetNum(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <BillsSelectionContainer>
      <TabsCards tabsHeaders={tabsHeaders} />
    </BillsSelectionContainer>
  );
};

const BillsSelectionContainer = styled.div``;

const ActionButton = styled.button`
  background-color: ${palette.brand};
  border-radius: 8px;
  font-size: 20px;
  color: white;
  font-family: sans-serif;
  border: 1px solid transparent;
  cursor: pointer;
`;

export default SearchBills;
