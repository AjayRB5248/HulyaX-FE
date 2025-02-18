import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const customStyles = {
  input: (provided: any) => ({
    ...provided,
    height: 40,
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: "#1d575b",
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    borderColor: "#1d575b!important",
    "&:hover": {
      borderColor: "#1d575b!important",
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#1d575b" : state.isFocused ? "#1d575b8a" : "white",
    color: state.isSelected ? "white" : "black",
    border: state.isFocused ? "1px solid #1d575b2b" : "1px solid transparent",
    "&:hover": {
      backgroundColor: "#1d575b2b",
    },
  }),
};

interface Options {
  id?: string;
  label: string;
  value: string;
}

interface SelectProps {
  defaultValue: string;
  options: Options[];
  onSelectChange: (label: string, value: string) => void;
}

export const CustomSelect: React.FC<SelectProps> = ({ defaultValue, options, onSelectChange }) => {
  return (
    <Select
      styles={customStyles}
      aria-label="Select State"
      closeMenuOnSelect={true}
      components={animatedComponents}
      defaultValue={defaultValue}
      options={options}
      onChange={(e: any) => {
        onSelectChange(e.label, e.value);
      }}
    />
  );
};
