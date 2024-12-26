import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PlayLessonOutlinedIcon from "@mui/icons-material/PlayLessonOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import Data from "./components/Data";
import { formSchema } from "./schemas/formSchema";
import TabPanel from "./components/DataComponents/components/TabPanel";
import Home from "../../BookingandScheduling";
import LessonType from "../TypePage/Type";
import Finish from "../Finish/Finish";

const Form = () => {
  const [value, setValue] = useState(0);
  const [selectedLessonType, setSelectedLessonType] = useState("");
  const [numberOfLessons, setNumberOfLessons] = useState(1);
  const validateStep = (newValue) => {
    try {
      formSchema.parse({ currentStep: newValue, isComplete: false });
      return true;
    } catch (error) {
      console.error("Step validation error:", error.errors);
      return false;
    }
  };

  const handleChange = (event, newValue) => {
    if (validateStep(newValue)) {
      setValue(newValue);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          zIndex: 1,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="booking process tabs"
          sx={{
            "& .MuiTab-root.Mui-selected": {
              color: "#72b626",
            },

            "& .MuiTabs-indicator": {
              backgroundColor: "#72b626",
            },
          }}
        >
          <Tab icon={<HomeOutlinedIcon />} label="Home" iconPosition="start" />
          <Tab
            icon={<PlayLessonOutlinedIcon />}
            label="Lesson Type"
            iconPosition="start"
          />
          <Tab
            icon={<BorderColorOutlinedIcon />}
            label="Booking and Scheduling"
            iconPosition="start"
          />
          <Tab
            icon={<CheckCircleOutlineOutlinedIcon />}
            label="Finish"
            iconPosition="start"
          />
        </Tabs>
      </Box>

      <Box
        sx={{
          overflow: "auto",
          flexGrow: 1,
          paddingBottom: "80px", 
        }}
      >
        <TabPanel value={value} index={0}>
          <Home/>
        </TabPanel>
        <TabPanel value={value} index={1}>
        <LessonType/>        
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Data/>
        </TabPanel>
        <TabPanel value={value} index={3}>
        <Finish 
        selectedLessonType={selectedLessonType}
        numberOfLessons={numberOfLessons}
        />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default Form;
