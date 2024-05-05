import React, { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Image, { StaticImageData } from "next/image";
import withNiceSelect from "src/layouts/_common/nice-select/withNiceSelect";
import moment from "moment";

interface SelectFieldProps {
  imageSrc?: StaticImageData;
  altText?: any;
  label: string;
  options: { value: string; label: string }[];
  onSelectChange: (fieldLabel: string, value: string) => void;
  className?: string;
  defaultValue?: any;
}

const SelectField: React.FC<SelectFieldProps> = ({
  imageSrc,
  altText,
  label,
  options,
  onSelectChange,
  className,
  defaultValue,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectChange(label, e.target.value);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    const formattedDate = date ? moment(date).format("DD/MM/YYYY") : "";
    onSelectChange(label, formattedDate);
  };

  return (
    <div className="form-group">
      {imageSrc && (
        <>
          <div className="thumb">
            <Image src={imageSrc} alt={altText} />
          </div>
          <span className="type">{label}</span>
        </>
      )}
      {label === "date" ? (
        <div className="position-relative">
          <DatePicker value={selectedDate} onChange={handleDateChange} className="custom-date-picker" />
          {selectedDate && (
            <span className="date-clear-icon" onClick={() => handleDateChange(null)}>
              <i className="fa fa-times"></i>
            </span>
          )}
        </div>
      ) : (
        <select
          className={`${className ? className : "select-bar"}`}
          onChange={handleSelectChange}
          value={defaultValue}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default withNiceSelect(SelectField);
