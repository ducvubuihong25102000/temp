import React from "react";
import { useTheme } from "@mui/material/styles";
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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function DashboardSelectInput2({
  list,
  title,
  data,
  setData,
  objectKey,
  isRequire,
}) {
  const theme = useTheme();
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setData(
      // On autofill we get a the stringified value.
      typeof value === "string"
        ? { ...data, [objectKey]: value.split(",") }
        : { ...data, [objectKey]: value }
    );
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel
          id="demo-multiple-name-label"
          variant="outlined"
          color="primary"
          error={
            isRequire && (data[objectKey]?.length < 1 || data[objectKey] < 0)
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
          value={data[objectKey] || ""}
          onChange={handleChange}
          input={<OutlinedInput label={title} />}
          MenuProps={MenuProps}
        >
          {list.map((item) => (
            <MenuItem
              key={item.id}
              value={item.name} 
              style={{display: 'block', paddingLeft: '10px'}}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
