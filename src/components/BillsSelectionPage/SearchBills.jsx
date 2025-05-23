import { useState } from "react";
import { useEffect } from "react";
import { getAllBills, getBillsOfKnesset } from "../../utils/apiUtils";
import AutoComplete from "./AutoComplete";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "../redux/searchedBillSlice";
import { addBill, addMultipleBills } from "../redux/selectedBillsSlice";
import {
  ActionButton,
  ActionButtonsContainer,
  AutoCompleteContainer,
  BillsSelectionContainer,
  TabContainer,
  TabContent,
  TabDescription,
  TabHeader,
} from "./SearchBills.styled";
import StyledSelect from "../common/StyledSelect";

import { ALL_KNESSET_NUMBERS } from "../../assets/consts"; //name and number 

const EMPTY_BILL = { id: "", label: "" };
const DEFAULT_KNESSET =  Object.entries(ALL_KNESSET_NUMBERS).at(-1); //default name,number - the last knesset

const SearchBills = (props) => {
  const { setIsLoading } = props;
  const title = "חיפוש הצעות חוק";
  const description =
    "חיפוש הצעות חוק השייכות לכנסת ספציפית, או על פי טקסט חופשי";
  const [allBills, setAllBills] = useState([]);
  const [filteredBillsByKnessetNum, setFilteredBillsByKnessetNum] = useState(
    []
  );
  const [selectedKnessetNum, setSelectedKnessetNum] = useState(DEFAULT_KNESSET[1]);
  const currentSearchedBill = useSelector((state) => state.searchedBill);
  const dispatch = useDispatch();

  const addBillHandler = () => {
    if (currentSearchedBill.id !== EMPTY_BILL.id) {
      dispatch(addBill(currentSearchedBill));
      dispatch(clear());
    }
  };

  // user selection
  const onKnessetNumSelectHandler = (e) => {
    const selectedValue = e.target.value;
    
    // 0 = show all bills
    if (selectedValue === "0") {
      setFilteredBillsByKnessetNum([...allBills]);
    }

    setSelectedKnessetNum(selectedValue);

    // show bills of selected knesset
    const arr = [];
    getBillsOfKnesset(selectedValue).then((res) => {
      const billsarr = res.data;
      const bills=billsarr.flat();
      
      bills.forEach((bill) => {
        const current = { id: bill.id, label: bill.name };
        arr.push(current);
      });
      console.log("bills selected handler:",arr);
      setFilteredBillsByKnessetNum([...arr]);
    });
  };

  // for voting
  const addKnessetNumBIlls = () => {
    setIsLoading(true);
    const arr = [];

    //if the first option was selected - load all bills
    if (selectedKnessetNum === "0") {
      dispatch(addMultipleBills(allBills));
      setIsLoading(false);
      return;
    }

    getBillsOfKnesset(selectedKnessetNum)
      .then((res) => {
        const bills = res.data;
        
        bills.forEach((bill) => {
          const current = { id: bill.id, label: bill.name };
          arr.push(current);
        });
        console.log("bills selected:",arr);
        dispatch(addMultipleBills(arr));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // log the filtered bills arr every time it changes
  useEffect(() => {
    console.log("Updated filteredBillsByKnessetNum:", filteredBillsByKnessetNum);
  }, [filteredBillsByKnessetNum]);

  // log the all bills arr every time it changes
  useEffect(() => {
    console.log("Updated allBills:", allBills);
  }, [allBills]);

  useEffect(() => {
    setIsLoading(true);
    getAllBills()
    .then((res) => {
      const arr = [];
      const bills = res.data;
      bills.forEach((bill) => {
        const current = { id: bill.id, label: bill.name };
        arr.push(current);
      });
      console.log("arr: ",arr)
      setAllBills(arr);    })
    .catch((err) => {
      console.log(err);
    })
    getBillsOfKnesset(selectedKnessetNum)
      .then((res) => {
        const arr = [];
        const bills = res.data;
        bills.forEach((bill) => {
          const current = { id: bill.id, label: bill.name };
          arr.push(current);
        });
        console.log("arr: ",arr)
        setFilteredBillsByKnessetNum(arr);
        
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setIsLoading]);

  return (
    <TabContainer>
      <TabHeader id={`tab_title`}>{title}</TabHeader>
      <TabContent>
        <TabDescription id="tab_description">{description}</TabDescription>
        <BillsSelectionContainer>
          <StyledSelect
            idPrefix="knesset_num_"
            onChangeFunc={onKnessetNumSelectHandler}
            selectValue={selectedKnessetNum}
            optionsLabels={Object.keys(ALL_KNESSET_NUMBERS)}
            optionsValues={Object.values(ALL_KNESSET_NUMBERS)}
            defaultLabel={DEFAULT_KNESSET[0]}
            defaultValue={DEFAULT_KNESSET[1]}
          />

          <AutoCompleteContainer>
            <AutoComplete data={filteredBillsByKnessetNum} />
          </AutoCompleteContainer>
        </BillsSelectionContainer>
        <ActionButtonsContainer>
          <ActionButton id="add_bill" onClick={addBillHandler}>
            הוסף הצעת חוק שנבחרה
          </ActionButton>
          <ActionButton id="add_all_bills" onClick={addKnessetNumBIlls}>
            הוסף את כל הצעות הכנסת
          </ActionButton>
        </ActionButtonsContainer>
      </TabContent>
    </TabContainer>
  );
};

export default SearchBills;
