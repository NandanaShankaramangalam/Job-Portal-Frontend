import React, { useMemo } from "react";
import JobCard from "./JobCard";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const JobCardList = ({ selectedFilter, searchText }) => {
  const jobState = useSelector((state) => state.jobs);

  // Memoize the filtered jobs to avoid unnecessary re-calculations
  const filteredJobs = useMemo(() => {
    if (!selectedFilter && !searchText) return jobState?.jobs;

    return jobState?.jobs?.filter((job) => {
      const matchesFilter = Object.entries(selectedFilter).every(
        ([key, value]) => {
          if (key === "Roles") {
            return job.jobRole?.toLowerCase() === value?.toLowerCase();
          }
          if (key === "Location") {
            return job.location?.toLowerCase() === value?.toLowerCase();
          }
          if (key === "Remote") {
            return job.location?.toLowerCase() === value?.toLowerCase();
          }
          if (key === "Experience") {
            return job.minExp === value;
          }
          if (key === "Min Base Pay") {
            return job.minJdSalary >= value;
          }
          return true;
        }
      );

      const matchesSearch = searchText
        ? job.companyName.toLowerCase().includes(searchText.toLowerCase())
        : true;

      return matchesFilter && matchesSearch;
    });
  }, [jobState?.jobs, selectedFilter, searchText]);

  console.log("filteredjobbb=", filteredJobs);

  return (
    <div>
      <Box display="flex" flexWrap="wrap">
        {jobState &&
          filteredJobs.map((job) => (
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
