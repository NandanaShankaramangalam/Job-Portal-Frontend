import React from "react";
import Filter from "../components/Filter";
import { filters } from "../utils/constants";
import Search from "../components/Search";
import JobCard from "../components/JobCard";

const JobBoard = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        {filters.map((filter, index) => {
          return (
            <div key={index}>
              <Filter filter={filter} />
            </div>
          );
        })}
        <Search />
      </div>
      <div style={{ paddingBottom: "30px" }}>
        <JobCard />
      </div>
    </>
  );
};

export default JobBoard;