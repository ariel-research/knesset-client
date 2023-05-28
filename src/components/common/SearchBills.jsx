import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { getAllBills, getAllKnessetNum } from "../../utils/apiUtils";
import AutoComplete from "../BillsSelectionPage/AutoComplete";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "../redux/searchedBillSlice";
import { addBill } from "../redux/selectedBillsSlice";
import TabsCards from "../Tabs/TabsCards";

const EMPTY_BILL = { id: "", label: "" };

const SearchBills = () => {
  const [allBills, setAllBills] = useState([]);
  const [allKnessetNum, setAllKnessetNum] = useState([]);
  const [selectedKnessetNum, setSelectedKnessetNum] = useState('1');
  const currentSearchedBill = useSelector((state) => state.searchedBill);
  const dispatch = useDispatch();

  const addBillHandler = () => {
    if (currentSearchedBill.id !== EMPTY_BILL.id) {
      dispatch(addBill(currentSearchedBill));
      dispatch(clear());
    }
  };

  const addKnessetNumBIlls = () => {
    console.log(selectedKnessetNum);
};

  const tabsHeaders = [
    {
      title: "מספר כנסת",
      description: "חפש הצעות חוק המשוייכות לכנסת מסויימת",
      content: (
        <select value={selectedKnessetNum} onChange={(e) => (setSelectedKnessetNum(e.target.value))}>
          {allKnessetNum.map((num, index) => (
            <option key={`knesset-num_${index}`} value={num.KnessetNum}>
              {num.KnessetNum}
            </option>
          ))}
        </select>
      ),
      action: (
        <button onClick={addKnessetNumBIlls}>
          הוסף הצעות חוק המשוייכות לכנסת
        </button>
      ),
    },
    {
      title: "טקסט חופשי",
      description: "חפש הצעות חוק על פי טקסט חופשי",
      content: <AutoComplete data={allBills} />,
      action: <button onClick={addBillHandler}>הוסף הצעת חוק</button>,
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

export default SearchBills;
