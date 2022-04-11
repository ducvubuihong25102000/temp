// import React from 'react'
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';

// export default function DashboardSelectInput({
//     title, data, setData, handleClose, sltOpen, disable,
//     handleOpenSlt, subTitle, listSelect, objectKey, objectNameKey }) {
//     console.log({ data });
//     return (
//         <div className="create-box-row flex">
//             <div className="dashboard-left flex">{title}<span style={{ color: "red" }}>*</span></div>
//             <div className="dashboard-right">
//                 <Select
//                     className="MUI-customBorder"
//                     labelId="demo-controlled-open-select-label"
//                     id="demo-controlled-open-select"
//                     open={sltOpen}
//                     onClose={handleClose}
//                     onOpen={handleOpenSlt}
//                     value={data[objectKey] || ""}
//                     disabled={disable || false}
//                     onChange={(event, params) => {
//                         objectNameKey ?
//                             setData({
//                                 ...data,
//                                 [objectKey]: params?.props?.value,
//                                 [objectNameKey]: params?.props?.name
//                             })
//                             : setData({
//                                 ...data,
//                                 [objectKey]: params?.props?.value,
//                             })
//                     }}
//                 >
//                     <MenuItem value={null} selected>
//                         <em style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>{subTitle}</em>
//                     </MenuItem>
//                     {listSelect && listSelect.length > 0 && listSelect?.map((item, index) => {
//                         let value = ""
//                         if (item.id) {
//                             if (objectKey === "customerDistrict" || objectKey === "receiverDistrict") {
//                                 value = item.name
//                             } else {
//                                 value = item.id
//                             }
//                         } else {
//                             value = item.name
//                         }
//                         return <MenuItem key={index} value={value} name={item.name || item.cityName || item.namePayment || item.id}>
//                             {item.name || item.cityName || item.namePayment || item.id}
//                         </MenuItem>
//                     })}
//                 </Select>
//             </div>
//         </div >
//     )
// }

import React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 10;
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
      personName?.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function DashboardSelectInput({
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
      <FormControl sx={{ m: 2, width: 890 }}>
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
          multiple
          value={data[objectKey] || ""}
          onChange={handleChange}
          input={<OutlinedInput label={title} />}
          MenuProps={MenuProps}
        >
          {list.map((item) => (
            <MenuItem
              key={item.id}
              value={item.key}
              style={getStyles(item.key, data[objectKey], theme)}
            >
              {item.key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
