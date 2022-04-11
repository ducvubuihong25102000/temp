import React from "react";
import { TextField } from "@material-ui/core";

export default function DashboardTextInput({
  title,
  placeholder,
  isRequire,
  data,
  setData,
  objectKey,
  textType,
  number,
  none,
}) {
  const handleChange = (value) => {
    if (number) {
      if (/^[0-9]*$/.test(value)) {
        setData({
          ...data,
          [objectKey]: Number(value),
        });
      }
    } else {
      setData({
        ...data,
        [objectKey]: value,
      });
    }
  };
  return (
    <div className="create-box-row2">
      {!none && (
        <div className="dashboard-left2 flex">
          {title} {isRequire ? <span style={{ color: "red" }}>*</span> : null}
        </div>
      )}
      <div className="dashboard-right--input2">
        <TextField
          error={
            isRequire && (data[objectKey]?.length < 1 || data[objectKey] <= 0)
              ? true
              : false
          }
          type={textType}
          id="outlined-totalPrice"
          label={placeholder}
          variant="outlined"
          color="primary"
          className="dashboard-right--input2-input"
          value={data[objectKey] || ""}
          onChange={(event) => handleChange(event.target.value)}
          required={isRequire}
        />
      </div>
    </div>
  );
}
