import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";
import { filters } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setJobs } from "../redux/actions";
import Search from "../components/Search";
import JobCardList from "./JobCardList";

const JobBoard = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const jobState = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData((page - 1) * 10);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  const handleScroll = () => {
    // console.log("Height: ", document.documentElement.scrollHeight);
    // console.log("Top: ", document.documentElement.scrollTop);
    // console.log("Window: ", window.innerHeight);
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
      console.log("loading...");
    }
    // if (
    //   window.innerHeight + document.documentElement.scrollTop !==
    //     document.documentElement.offsetHeight ||
    //   loading
    // ) {
    //   return;
    // }
    // fetchData();
  };

  //   useEffect(() => {
  //     const myHeaders = new Headers();
  //     myHeaders.append("Content-Type", "application/json");

  //     const body = JSON.stringify({
  //       limit: 10,
  //       offset: 0,
  //     });

  //     const requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body,
  //     };

  //     fetch(
  //       "https://api.weekday.technology/adhoc/getSampleJdJSON",
  //       requestOptions
  //     )
  //       .then((response) => response.json())
  //       .then((result) => {
  //         dispatch(setJobs(result));
  //         console.log("Response from API", result);
  //       })
  //       .catch((error) => console.error(error));
  //   }, []);
  const fetchData = (offset) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit: 10,
      offset: offset,
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
      .then((res) => {
        const result = [...jobState.jobs, ...res.jdList];
        console.log("mergedJobs=", result); // Merge new data with existing jobs
        dispatch(setJobs(result));
        console.log("Response from API", result);
      })
      .catch((error) => console.error(error));
  };
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
