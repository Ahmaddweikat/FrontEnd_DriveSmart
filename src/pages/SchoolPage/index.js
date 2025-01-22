import React, { useState } from "react";
import { Box, Container, Tabs, Tab, Button } from "@mui/material";
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
// Import components
import TabPanel from "./components/TabPanel";
import HeroSection from "./components/HeroSection";
import InfoCards from "./components/InfoCards";
import ChatInterface from "./components/ChatInterface";
import TrainersTab from "./components/TabContents/TrainersTab";
import CarsTab from "./components/TabContents/CarsTab";
import GalleryTab from "./components/TabContents/GalleryTab";
import AboutTab from "./components/TabContents/AboutTab";
import LicensePackages from "./components/LicensePackages";


const SchoolPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f6f9fc 0%, #ffffff 100%)",
        overflowX: "hidden",
      }}
    >
      <HeroSection />

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <InfoCards />

        {/* Tabs Section */}
        <Box sx={{ mt: 8,  }}>
          <Tabs
            value={tabValue}
            onChange={(e, val) => setTabValue(val)}
            centered
            sx={{color:"#72b626"}}
          >
            <Tab label="About" />
            <Tab label="Trainers" />
            <Tab label="Cars" />
            <Tab label="Gallery" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <AboutTab />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <TrainersTab />
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <CarsTab />
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <GalleryTab />
          </TabPanel>
        </Box>

        <LicensePackages />
      </Container>

      <ChatInterface open={open} setOpen={setOpen} />

      {/* Chat Toggle Button */}
      <Button
        variant="contained"
        onClick={() => setOpen(!open)}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          background: "linear-gradient(135deg, #4CAF50, #388E3C)",
          boxShadow: "0 4px 12px rgba(76,175,80,0.3)",
          "&:hover": {
            background: "linear-gradient(135deg, #388E3C, #2E7D32)",
            boxShadow: "0 6px 16px rgba(76,175,80,0.4)",
            transform: "translateY(-2px)",
          },
          transition: "all 0.3s ease",
        }}
      >
        <SmartToyOutlinedIcon sx={{ fontSize: 40 }} />
      </Button>
    </Box>
  );
};

export default SchoolPage;
