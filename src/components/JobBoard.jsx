import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";
import { filters } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setJobs } from "../redux/actions";
import Search from "../components/Search";
import JobCardList from "./JobCardList";

const JobBoard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit: 10,
      offset: 0,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        dispatch(setJobs(result));
        console.log("Response from API", result);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      <div className="filter-container">
        {filters.map((filter, index) => (
          <Filter key={index} filter={filter} />
        ))}
        <Search className="search-container" />
      </div>
      <div style={{ paddingBottom: "30px" }}>
        <JobCardList />
      </div>
    </>
  );
};

export default JobBoard;
