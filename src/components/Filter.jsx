import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Filter({ filter, selectedFilter, setSelectedFilter }) {
  const [showFilter, setShowFilter] = React.useState();

  const handleChange = (event, title) => {
    setShowFilter(event.target.value);
    setSelectedFilter((prevFilter) => ({
      ...prevFilter,
      [title]: event.target.value,
    }));
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FormControl
        sx={{ m: 1, marginLeft: "15px", width: "200px", position: "relative" }}
      >
        <InputLabel id="demo-simple-select-helper-label">
          {filter.title}
        </InputLabel>
        <div
          style={{
            position: "absolute",
            left: "158px",
            top: "50%",
            transform: "translateY(-50%)",
            height: "55%",
            borderRight: "1px solid #ccc",
          }}
        ></div>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={showFilter}
          label="Filter"
          onChange={(event) => handleChange(event, filter?.title)}
          sx={{ "& .MuiSelect-icon": { paddingRight: "0px" } }}
        >
          {filter.values.map((data, index) => (
            <MenuItem key={index} value={data}>
              {data}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
