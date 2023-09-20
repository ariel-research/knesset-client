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
import { ALL_KNESSET_NUMBERS } from "../../assets/consts";

const EMPTY_BILL = { id: "", label: "" };

const SearchBills = (props) => {
  const { setIsLoading } = props;
  const title = "חיפוש הצעות חוק";
  const description =
    "חיפוש הצעות חוק השייכות לכנסת ספציפית, או על פי טקסט חופשי";
  const [allBills, setAllBills] = useState([]);
  const [filteredBillsByKnessetNum, setFilteredBillsByKnessetNum] = useState(
    []
  );
  const [selectedKnessetNum, setSelectedKnessetNum] = useState("0");
  const currentSearchedBill = useSelector((state) => state.searchedBill);
  const dispatch = useDispatch();

  const addBillHandler = () => {
    if (currentSearchedBill.id !== EMPTY_BILL.id) {
      dispatch(addBill(currentSearchedBill));
      dispatch(clear());
    }
  };

  const onKnessetNumSelectHandler = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "0") {
      setFilteredBillsByKnessetNum([...allBills]);
    }
    setSelectedKnessetNum(selectedValue);
    const arr = [];
    getBillsOfKnesset(selectedValue).then((res) => {
      const bills = res.data.bills;
      bills.forEach((bill) => {
        const current = { id: bill.id, label: bill.name };
        arr.push(current);
      });
      setFilteredBillsByKnessetNum([...arr]);
    });
  };

  const addKnessetNumBIlls = () => {
    setIsLoading(true);
    const arr = [];

    //if the default option was selected - load all bills
    if (selectedKnessetNum === "0") {
      dispatch(addMultipleBills(allBills));
      setIsLoading(false);
      return;
    }

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
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getAllBills()
      .then((res) => {
        // setAllBills(res.data);
        setFilteredBillsByKnessetNum(res.data);
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
            defaultLabel="מספר כנסת"
            defaultValue="0"
          />

          <AutoCompleteContainer>
            <AutoComplete data={filteredBillsByKnessetNum} />
          </AutoCompleteContainer>
        </BillsSelectionContainer>
        <ActionButtonsContainer>
          <ActionButton id="add_bill" onClick={addBillHandler}>
            הוסף הצעת חוק שנבחרה
          </ActionButton>
          {/* <ActionButton id="add_all_bills" onClick={addKnessetNumBIlls}>
            הוסף את כל הצעות הכנסת
          </ActionButton> */}
        </ActionButtonsContainer>
      </TabContent>
    </TabContainer>
  );
};

export default SearchBills;
