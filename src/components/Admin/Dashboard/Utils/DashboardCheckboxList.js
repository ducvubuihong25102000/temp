import * as React from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function CheckboxesGroup({
  title,
  setData,
  data,
  list,
  isRequire,
}) {
  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel
          sx={{ color: "#212529 !important", fontWeight: "300" }}
          component="legend"
        >
          {title} {isRequire ? <span style={{ color: "red" }}>*</span> : null}
        </FormLabel>
        {list.map((item) => (
          <FormGroup sx={{ marginLeft: "8px" }} key={item.name}>
            <FormControlLabel
              sx={{ display: "flex", gap: "0 10px" }}
              control={
                <Checkbox
                  checked={data[item.id]}
                  onChange={handleChange}
                  name={item.id}
                />
              }
              label={item.name}
            />
          </FormGroup>
        ))}
      </FormControl>
    </Box>
  );
}
