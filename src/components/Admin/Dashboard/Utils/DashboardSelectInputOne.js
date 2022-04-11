import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function DashboardSelectInput2({
  list,
  title,
  data,
  setData,
  objectKey,
  isRequire,
  company,
  level,
  job,
}) {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setData({ ...data, [objectKey]: value });
  };
  return (
    <div style={{ marginBottom: "30px" }}>
      <div className="dashboard-left2 flex" style={{ marginBottom: "10px" }}>
        {title} {isRequire ? <span style={{ color: "red" }}>*</span> : null}
      </div>
      <FormControl sx={{ m: 1, width: "95%" }}>
        <InputLabel
          id="demo-multiple-name-label"
          variant="outlined"
          color="primary"
          error={
            isRequire && (data[objectKey]?.length < 1 || data[objectKey] <= 0)
              ? true
              : false
          }
          required={isRequire}
        >
          {title}
        </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          variant="outlined"
          value={data[objectKey] || ""}
          onChange={handleChange}
          input={<OutlinedInput label={title} />}
          MenuProps={MenuProps}
        >
          {job &&
            list.map((item) => (
              <MenuItem
                key={item.id}
                value={item.id}
                style={{ display: "block", padding: "8px" }}
              >
                {item.job}
              </MenuItem>
            ))}
          {company &&
            list.map((item) => (
              <MenuItem
                key={item.id}
                value={item.id}
                style={{ display: "block", padding: "8px" }}
              >
                {item.name}
              </MenuItem>
            ))}
          {level &&
            list.map((item) => (
              <MenuItem
                key={item.id}
                value={item.id}
                style={{ display: "block", padding: "8px" }}
              >
                {item.value_vi + " - " + item.value_en}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
