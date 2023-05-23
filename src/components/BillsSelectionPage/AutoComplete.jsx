import { useState } from "react";
import Autocomplete from "react-autocomplete";
import { AutoCompleteWrapper, Suggestion, autoCompleteStyle } from "./AutoComplete.styled";

const AutoComplete = (props) => {
  const { data } = props;
  const [value, setValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const onChangeHandler = (e) => {
    const userInput = e.target.value;
    setValue(userInput);
    const filtered = data.filter(
      (suggestion) =>
        suggestion.label.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    if (userInput) {
      //sort by prefix
      filtered.sort((a, b) => {
        if (a.label.startsWith(userInput) && !b.label.startsWith(userInput)) {
          return -1;
        }
        if (b.label.startsWith(userInput) && !a.label.startsWith(userInput)) {
          return 1;
        }
        return a.label.localeCompare(b.label);
      });
      setFilteredSuggestions(
        filtered.splice(0, filtered.length < 30 ? filtered.length : 30)
      );
    }
  };

  return (
    <AutoCompleteWrapper>
      <Autocomplete
        menuStyle={autoCompleteStyle}
        getItemValue={(item) => item.label}
        items={
          filteredSuggestions
            ? filteredSuggestions.map((item) => ({
                label: item.label,
                id: item.id,
              }))
            : data.map((item) => ({
                label: item.label,
                id: item.id,
              }))
        }
        renderItem={(item) => (
          <Suggestion key={item.id}>{item.label}</Suggestion>
        )}
        value={value}
        onChange={(e) => onChangeHandler(e)}
        onSelect={(val) => setValue(val)}
      />
    </AutoCompleteWrapper>
  );
};

export default AutoComplete;
