import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Box, Button } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function JobCard({ job }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ ml: "15px", mt: 3, maxWidth: 300 }}>
      <Box
        sx={{
          m: 2,
          mb: 1,
          maxWidth: 150,
          borderRadius: "16px",
          border: "1px solid lightgray",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          padding: "5px",
        }}
      >
        <Box>
          <img src="/images/hourglass.png" width="14px" height="14px"></img>
        </Box>
        <Typography sx={{ padding: "3px", fontSize: "14px", color: "gray" }}>
          Posted 10 days ago
        </Typography>
      </Box>
      <Box sx={{ p: 2, pb: 1, display: "flex" }}>
        <Box>
          {/* <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar> */}
          <img src={`${job?.logoUrl}`} alt="..." width="30px" height="40px" />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
          <Typography
            variant="body"
            gutterBottom
            sx={{ fontSize: "14px", color: "gray" }}
          >
            {job?.companyName}
          </Typography>
          <Typography variant="body" gutterBottom sx={{ fontSize: "15px" }}>
            {job?.jobRole.replace(/\b\w/g, (match) => match.toUpperCase())}
          </Typography>
          <Typography variant="body" gutterBottom sx={{ fontSize: "12px" }}>
            {job?.location.replace(/\b\w/g, (match) => match.toUpperCase())}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ pl: 2 }} display="flex">
        <Typography sx={{ fontSize: "14px", color: "gray", fontWeight: 500 }}>
          Estimated Salary:{" "}
          {job.minJdSalary && job.maxJdSalary
            ? `${job.minJdSalary} - ${job.maxJdSalary} LPA`
            : job.minJdSalary
            ? `min. ${job.minJdSalary} LPA`
            : job.maxJdSalary
            ? `max. ${job.maxJdSalary} LPA`
            : "-"}
        </Typography>
        <Box sx={{ pl: 1 }}>
          <img src="/images/check.png" width="14px" height="14px"></img>
        </Box>
      </Box>
      <Box sx={{ pl: 2, pt: 1 }}>
        <Typography sx={{ fontSize: "15px" }}>About Company:</Typography>
      </Box>
      <Box sx={{ pl: 2 }}>
        <Typography sx={{ fontSize: "13px", fontWeight: 600 }}>
          About us:
        </Typography>
      </Box>
      <Box sx={{ pl: 2, pr: 2, position: "relative", overflow: "hidden" }}>
        <Typography
          variant="body"
          sx={{
            fontSize: "13px",
            color: "#333333",
            lineHeight: "1.2em",
            maxHeight: "calc(1.2em * 12)",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 12,
          }}
        >
          {job?.jobDetailsFromCompany}
        </Typography>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "7em",
            backgroundImage:
              "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))",
          }}
        />
        <Typography
          variant="body"
          sx={{
            position: "absolute",
            bottom: ".15em",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "14px",
            color: "blue",
            cursor: "pointer",
            pointerEvents: "auto",
            zIndex: 1,
          }}
        >
          View Job
        </Typography>
      </Box>
      <Box sx={{ pl: 2, pt: 2 }}>
        <Typography sx={{ fontSize: "14px", color: "gray", fontWeight: 500 }}>
          Minimum Experience
        </Typography>
        <Typography sx={{ fontSize: "14px" }}>
          {job.minExp
            ? job.minExp > 1
              ? `${job.minExp} years`
              : `${job.minExp} year`
            : "-"}
        </Typography>
      </Box>
      <Box sx={{ p: 1 }}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            borderRadius: 1,
            textTransform: "none",
            backgroundColor: "#54efc3",
            color: "black",
            "&:hover": {
              backgroundColor: "#54efc3",
            },
          }}
        >
          <Box sx={{ pt: 1, pr: 1 }}>
            <img src="/images/lightening.png" width="16px" height="16px"></img>
          </Box>
          Easy Apply
        </Button>
      </Box>
      <Box sx={{ p: 1, pb: 0 }}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            borderRadius: 1,
            textTransform: "none",
            backgroundColor: "#4943da",
          }}
        >
          <Box sx={{ pt: 1, pr: 1 }}></Box>
          Unlock referral asks
        </Button>
      </Box>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
}
