// import React, { useEffect } from "react";
// import JobCard from "./JobCard";
// import { Box } from "@mui/material";
// import { useSelector } from "react-redux";

// const JobCardList = ({ selectedFilter }) => {
//   const jobState = useSelector((state) => state.jobs);
//   const filteredJobs = jobState?.jobs?.filter((job) => {
//     Object.entries(selectedFilter).every(([key, value]) => {
//       console.log("key:", key);
//       console.log("value:", value);
//       console.log("job:", job?.jobRole?.toLowerCase());
//       if (
//         key === "Roles" &&
//         job?.jobRole?.toLowerCase() === value?.toLowerCase()
//       ) {
//         return job;
//       }
//     });
//     return job;
//   });
//   //   const filteredJobs = jobState?.jobs?.filter((job) => {
//   //     return Object.entries(selectedFilter).every(([key, value]) => {
//   //       if (key === "Experience") {
//   //         const [minExp, maxExp] = value.split("-").map(Number);
//   //         console.log(
//   //           "job[key] >= minExp && job[key] <= maxExp=",
//   //           job[key],
//   //           job[key] >= minExp && job[key] <= maxExp
//   //         );
//   //         return job[key] >= minExp && job[key] <= maxExp;
//   //       }
//   //       return job[key] === value;
//   //     });
//   //   });

//   //   const filteredJobs = () => {
//   //     return jobState?.jobs?.filter((job) => {
//   //       // Check if the job meets all filter criteria

//   //     });
//   //   };
//   console.log("filteredjobbb=", filteredJobs);
//   return (
//     // <div>
//     //   <Box display="flex" flexWrap="wrap">
//     //     {jobState &&
//     //       jobState?.jobs?.map((job) => (
//     //         <Box
//     //           key={job?.jdUid}
//     //           width={{ xs: "100%", sm: "50%", md: "33.33%", lg: "25%" }}
//     //         >
//     //           <JobCard job={job} />
//     //         </Box>
//     //       ))}
//     //   </Box>
//     // </div>

//     <div>
//       <Box display="flex" flexWrap="wrap">
//         {jobState &&
//           filteredJobs // Filter jobs based on selected filters
//             .map((job) => (
//               <Box
//                 key={job?.jdUid}
//                 width={{ xs: "100%", sm: "50%", md: "33.33%", lg: "25%" }}
//               >
//                 <JobCard job={job} />
//               </Box>
//             ))}
//       </Box>
//     </div>
//   );
// };

// export default JobCardList;

import React, { useEffect, useMemo } from "react";
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
