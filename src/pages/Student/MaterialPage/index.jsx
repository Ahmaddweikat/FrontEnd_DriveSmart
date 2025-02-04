import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import SignalIcon from "@mui/icons-material/SignalCellular4Bar";
import MaterialSearch from "./components/MaterialSearch";
import MaterialGrid from "./components/MaterialGrid";
import MaterialModal from "./components/MaterialModal";
import useMaterials from "./hooks/useMaterials";

const TabPanel = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

const MaterialPage = () => {
  const { materials, loading, error, searchMaterials } = useMaterials();
  const [tabValue, setTabValue] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const signCategories = [
    "Warning Signs",
    "Guidance Signs",
    "Inquiry Signs",
    "Road Surface Signs",
    "Traffic Lights Signs",
    "Helping Signs",
  ];

  const studyBooks = [
    {
      title: "Theory Manual",
      description: "Complete driving theory guide",
      pdfPath: require("./test/constants/Teoria.pdf").default,
      type: "pdf",
    },
    {
      title: "Traffic Signs Guide",
      description: "Comprehensive guide to all traffic signs",
      pdfPath: require("./test/constants/signs.pdf").default,
      type: "pdf",
    },
  ];

  const handleOpenModal = (material) => {
    // If it's a sign material, add the category
    if (tabValue === 0 && material.title) {
      setSelectedMaterial({
        ...material,
        category: material.title,
        type: "signs",
      });
    } else {
      setSelectedMaterial({
        ...material,
        type: "pdf",
      });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMaterial(null);
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  // Transform signs data to include category information
  const signsWithCategories = signCategories.map((category) => ({
    title: category,
    description: `View all ${category.toLowerCase()}`,
    category: category,
    type: "signs",
  }));

  const filteredMaterials = {
    signs: signsWithCategories.filter(
      (material) =>
        material.title.toLowerCase().includes(searchQuery) ||
        material.description.toLowerCase().includes(searchQuery)
    ),
    books: studyBooks.filter(
      (material) =>
        material.title.toLowerCase().includes(searchQuery) ||
        material.description?.toLowerCase().includes(searchQuery)
    ),
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 4,
        height: "calc(100vh - 80px)",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#72b626",
          borderRadius: "4px",
          "&:hover": {
            background: "#5c9220",
          },
        },
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: "bold",
          mb: 4,
          background: "linear-gradient(45deg, #72b626 30%, #8ed136 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Learning Materials
      </Typography>

      <MaterialSearch onSearch={handleSearch} />

      <Paper sx={{ mb: 3 }} elevation={0}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            "& .MuiTab-root": {
              minHeight: "64px",
              fontSize: "1rem",
              "&.Mui-selected": {
                color: "#72b626",
              },
              "&:hover": {
                color: "#72b626",
                opacity: 0.8,
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#72b626",
            },
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tab
            icon={<SignalIcon />}
            label="Traffic Signs"
            iconPosition="start"
            sx={{ textTransform: "none" }}
          />
          <Tab
            icon={<LocalLibraryIcon />}
            label="Study Books"
            iconPosition="start"
            sx={{ textTransform: "none" }}
          />
        </Tabs>
      </Paper>

      <TabPanel value={tabValue} index={0}>
        <MaterialGrid
          materials={filteredMaterials.signs}
          onOpenModal={handleOpenModal}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <MaterialGrid
          materials={filteredMaterials.books}
          onOpenModal={handleOpenModal}
        />
      </TabPanel>

      <MaterialModal
        open={modalOpen}
        onClose={handleCloseModal}
        material={selectedMaterial}
      />
    </Container>
  );
};

export default MaterialPage;
