import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Search({ searchText, setSearchText }) {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Search Company Name"
        variant="outlined"
        onChange={(e) => setSearchText(e.target.value)}
      />
    </Box>
  );
}
