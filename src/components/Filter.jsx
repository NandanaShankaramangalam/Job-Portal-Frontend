import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Filter({ filter }) {
  const [selectedFilter, setSelectedFilter] = React.useState("");

  const handleChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, marginLeft: "15px", width: "200px" }}>
        <InputLabel id="demo-simple-select-helper-label">
          {filter.title}
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={selectedFilter}
          label="Filter"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {filter.values.map((data, index) => {
            return (
              <MenuItem value={data} index={index}>
                {data}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
