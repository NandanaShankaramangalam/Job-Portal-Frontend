import React from "react";
import JobCard from "./JobCard";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const JobCardList = () => {
  const jobState = useSelector((state) => state.jobs);
  console.log("in cardlist redux=", jobState);

  return (
    <div>
      <Box display="flex" flexWrap="wrap">
        {jobState &&
          jobState?.jobs?.map((job) => (
            <Box
              key={job?.jdUid}
              width={{ xs: "100%", sm: "50%", md: "33.33%", lg: "25%" }}
            >
              <JobCard job={job} />
            </Box>
          ))}
      </Box>
    </div>
  );
};

export default JobCardList;
