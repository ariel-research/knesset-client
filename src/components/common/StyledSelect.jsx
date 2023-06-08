import { Option, Select } from "./StyledSelect.styled";

const StyledSelect = (props) => {
  const {
    idPrefix,
    onChangeFunc,
    selectValue,
    optionsLabels,
    optionsValues,
    defaultLabel,
    defaultValue,
  } = props;
  return (
    <Select
      id={`${idPrefix}_select`}
      value={selectValue}
      onChange={onChangeFunc}
    >
      {defaultValue && defaultLabel && (
        <Option
          id={`${idPrefix}_${0}`}
          key={`knesset-member${0}`}
          value={defaultValue}
        >
          {defaultLabel}
        </Option>
      )}

      {optionsValues.map((op, index) => (
        <Option
          id={`${idPrefix}_${index + 1}`}
          key={`${idPrefix}_${index + 1}`}
          value={op}
        >
          {optionsLabels[index]}
        </Option>
      ))}
    </Select>
  );
};

export default StyledSelect;
