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
    display: "block",
    padding: "8px",
  };
}

export default function DashboardSelectInput2({
  list,
  title,
  data,
  setData,
  setData1,
  objectKey,
  objectKey1,
  objectKey2,
  isRequire,
  category,
}) {
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    if (!objectKey1) {
      setData(
        typeof value === "string"
          ? { ...data, [objectKey]: value.split(",") }
          : { ...data, [objectKey]: value }
      );
    }
    // On autofill we get a the stringified value.
  };

  const handleClick = (id) => {
    if (category) {
      if (objectKey1.includes(id)) {
        setData({
          ...data,
          [objectKey2]: [...data[objectKey2], id],
        });
        setData1(objectKey1.filter((x) => x !== id));
      } else {
        let result = [];
        let categories = [...objectKey1, id];
        for (let i = 0; i < categories.length; i++) {
          if (!category.includes(categories[i])) {
            result.push(categories[i]);
          }
        }
        setData1([...objectKey1, id]);
        setData({
          ...data,
          [objectKey]: result,
          [objectKey2]: data[objectKey2].filter((x) => x !== id),
        });
      }
    }
  };
  return (
    <div style={{ margin: "30px 0" }}>
      <div className="dashboard-left2 flex" style={{ marginBottom: "10px" }}>
        {title} {isRequire ? <span style={{ color: "red" }}>*</span> : null}
      </div>
      <FormControl sx={{ m: 1, width: "95%" }}>
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
        {objectKey1 && (
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={objectKey1 || ""}
            onChange={handleChange}
            input={<OutlinedInput label={title} />}
            MenuProps={MenuProps}
          >
            {list.map((item) => (
              <MenuItem
                key={item.id}
                value={item.id}
                style={getStyles(item.id, objectKey1, theme)}
                onClick={() => handleClick(item.id)}
              >
                {item.name_vi + " - " + item.name_en}
              </MenuItem>
            ))}
          </Select>
        )}
        {!objectKey1 && (
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={data[objectKey] || ""}
            onChange={handleChange}
            input={<OutlinedInput label={title} />}
            MenuProps={MenuProps}
          >
            {list.map((item) => (
              <MenuItem
                key={item.id}
                value={item.id}
                style={getStyles(item.id, objectKey, theme)}
              >
                {item.name_vi + " - " + item.name_en}
              </MenuItem>
            ))}
          </Select>
        )}
      </FormControl>
    </div>
  );
}
