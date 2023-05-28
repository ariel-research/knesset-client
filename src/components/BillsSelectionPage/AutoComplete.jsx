import { useState } from "react";
import {
  AutoCompleteInput,
  AutoCompleteRow,
  AutoCompleteRowsContainer,
  AutoCompleteWrapper,
} from "./AutoComplete.styled";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../redux/searchedBillSlice";
import { useEffect } from "react";

const AutoComplete = (props) => {
  const { data } = props;
  const [userInput, setUserInput] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const searchedBill = useSelector((select) => select.searchedBill);
  const dispatch = useDispatch();

  const onSuggestionClickHandler = (val) => {
    setUserInput(val.label);
    setFilteredSuggestions([]);
    dispatch(update(val));
  };

  const onChangeHandler = (e) => {
    const value = e.target.value;
    setUserInput(value);
    const filtered = data.filter(
      (suggestion) =>
        suggestion.label.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
    if (value) {
      //sort by prefix
      filtered.sort((a, b) => {
        if (a.label.startsWith(value) && !b.label.startsWith(value)) {
          return -1;
        }
        if (b.label.startsWith(value) && !a.label.startsWith(value)) {
          return 1;
        }
        return a.label.localeCompare(b.label);
      });
      //present only the first 30 results
      setFilteredSuggestions(
        filtered.splice(0, filtered.length < 30 ? filtered.length : 30)
      );
    } else {
      setFilteredSuggestions([]);
    }
  };

  useEffect(() => {
    setUserInput(searchedBill.label);
  }, [searchedBill]);

  return (
    <AutoCompleteWrapper id="autocomplete-wrapper">
      <AutoCompleteInput
        id="autocomplete-input"
        autoComplete="off"
        placeholder="...הקלד כאן"
        onChange={onChangeHandler}
        value={userInput}
      />
      {filteredSuggestions.length > 0 && (
        <AutoCompleteRowsContainer>
          {filteredSuggestions.map((bill, index) => {
            return (
              <AutoCompleteRow
                key={index}
                onClick={() => onSuggestionClickHandler(bill)}
              >
                {bill.label}
              </AutoCompleteRow>
            );
          })}
        </AutoCompleteRowsContainer>
      )}
    </AutoCompleteWrapper>
  );
};

export default AutoComplete;
