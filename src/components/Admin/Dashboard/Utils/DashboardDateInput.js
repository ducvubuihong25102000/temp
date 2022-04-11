import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import viLocale from "date-fns/locale/vi";

export default function DashboardDateInput({
  title,
  placeholder,
  isRequire,
  data,
  setData,
  objectKey,
}) {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    setData({ ...data, [objectKey]: value });
  }, [value]);

  return (
    <LocalizationProvider locale={viLocale} dateAdapter={AdapterDateFns}>
      <div className="create-box-row flex">
        <div className="dashboard-left flex">
          {title} {isRequire ? <span style={{ color: "red" }}>*</span> : null}
        </div>
        <div className="dashboard-right--input">
          <DatePicker
            label={placeholder}
            value={new Date(data[objectKey] || Date.now())}
            onChange={(newValue) => setValue(new Date(newValue))}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
      </div>
    </LocalizationProvider>
  );
}
