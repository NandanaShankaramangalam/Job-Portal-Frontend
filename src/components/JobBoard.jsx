import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";
import { filters } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setJobs } from "../redux/actions";
import Search from "../components/Search";
import JobCardList from "./JobCardList";
import Loader from "./Loader";

const JobBoard = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState();
  const [selectedFilter, setSelectedFilter] = useState({});
  const [page, setPage] = useState(1);
  const jobState = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  //Infinite scroll
  useEffect(() => {
    fetchData((page - 1) * 10);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

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
    setLoading(true);
    fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        const result = [...jobState.jobs, ...res.jdList];
        dispatch(setJobs(result));
        setLoading(false);
        console.log("Response from API", result);
      })
      .catch((error) => console.error(error));
  };
  return (
    <>
      <div className="filter-container">
        {filters.map((filter, index) => (
          <Filter
            key={index}
            filter={filter}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        ))}
        <Search
          className="search-container"
          searchText={searchText}
          setSearchText={setSearchText}
        />
      </div>
      <div style={{ paddingBottom: "30px" }}>
        <JobCardList selectedFilter={selectedFilter} searchText={searchText} />
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "20px",
              color: "gray",
            }}
          >
            <Loader />
          </div>
        )}
      </div>
    </>
  );
};

export default JobBoard;
