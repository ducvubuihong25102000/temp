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
  job,
}) {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setData({ ...data, [objectKey]: value });
  };
  return (
    <div>
      <div className="dashboard-left2 flex" style={{ marginBottom: "10px" }}>
        {title} {isRequire ? <span style={{ color: "red" }}>*</span> : null}
      </div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel
          id="demo-multiple-name-label"
          variant="outlined"
          color="primary"
          error={isRequire && data[objectKey] > 0 ? false : true}
          required={isRequire}
        >
          {title}
        </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={data[objectKey] || ""}
          onChange={handleChange}
          input={<OutlinedInput label={title} />}
          MenuProps={MenuProps}
        >
          {!job &&
            list.map((item) => (
              <MenuItem
                key={item.id}
                value={item.id}
                style={{ display: "block", padding: "8px" }}
              >
                {item.job}
              </MenuItem>
            ))}
          {job &&
            list.map((item) => (
              <MenuItem
                key={item.id}
                value={item.id}
                style={{ display: "block", padding: "8px" }}
              >
                {item.name_vi}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
