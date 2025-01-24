import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import {
  MenuBook,
  Assessment,
  CheckCircleOutline,
  LibraryBooks,
  QuizOutlined,
  PictureAsPdf,
  RemoveRedEye,
} from "@mui/icons-material";

import WarningSigns from "../../../TrafficSigns/constants/WarningSigns";
import GuidanceSigns from "../../../TrafficSigns/constants/GuidanceSign";
import InquirySigns from "../../../TrafficSigns/constants/InquirySigns";
import RoadSurfaceSigns from "../../../TrafficSigns/constants/Signspaintedontheroadsurface";
import TrafficLightsSigns from "../../../TrafficSigns/constants/TrafficlightsandlanecontrolSigns";
import HelpingSigns from "../../../TrafficSigns/constants/HelpingSigns";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [openPdfDialog, setOpenPdfDialog] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [openSignsDialog, setOpenSignsDialog] = useState(false);
  const [selectedSignCategory, setSelectedSignCategory] = useState(null);

  const studyMaterials = [
    {
      icon: <LibraryBooks />,
      title: "Road Signs Guide",
      description: "Comprehensive collection of road signs and their meanings",
    },
    {
      icon: <QuizOutlined />,
      title: "Practice Questions",
      description: "Extensive set of theory test practice questions",
    },
    {
      icon: <CheckCircleOutline />,
      title: "Exam Preparation",
      description: "Strategies and tips for passing your driving theory test",
    },
  ];

  const pdfResources = [
    {
      icon: <PictureAsPdf />,
      title: "Road Signs Handbook",
      description: "Comprehensive guide to road signs",
      pdfUrl: "/pdfs/signs.pdf",
    },
    {
      icon: <PictureAsPdf />,
      title: "Driving Theory Manual",
      description: "Complete theory test preparation guide",
      pdfUrl: "/pdfs/Teoria.pdf",
    },
  ];

  const signCategories = [
    {
      title: "Warning Signs",
      signs: WarningSigns,
      color: "bg-yellow-100",
    },
    {
      title: "Guidance Signs",
      signs: GuidanceSigns,
      color: "bg-blue-100",
    },
    {
      title: "Inquiry Signs",
      signs: InquirySigns,
      color: "bg-green-100",
    },
    {
      title: "Road Surface Signs",
      signs: RoadSurfaceSigns,
      color: "bg-purple-100",
    },
    {
      title: "Traffic Lights Signs",
      signs: TrafficLightsSigns,
      color: "bg-red-100",
    },
    {
      title: "Helping Signs",
      signs: HelpingSigns,
      color: "bg-indigo-100",
    },
  ];

  const handleOpenPdf = (pdf) => {
    setSelectedPdf(pdf);
    setOpenPdfDialog(true);
  };

  const handleClosePdfDialog = () => {
    setOpenPdfDialog(false);
    setSelectedPdf(null);
  };

  const handleOpenSignsDialog = (category) => {
    setSelectedSignCategory(category);
    setOpenSignsDialog(true);
  };

  const handleCloseSignsDialog = () => {
    setOpenSignsDialog(false);
    setSelectedSignCategory(null);
  };

  return (
    <div className="flex h-screen overflow-y-auto bg-gray-100">
      <Container maxWidth="lg" className="py-12 px-4">
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                p: 4,
                borderRadius: 3,
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  color: "primary.main",
                  borderBottom: "2px solid",
                  borderColor: "primary.main",
                  pb: 1,
                }}
              >
                Study Materials
              </Typography>

              <List>
                {studyMaterials.map((material, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      mb: 2,
                      borderRadius: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateX(10px)",
                        backgroundColor: "rgba(0,0,0,0.05)",
                      },
                    }}
                  >
                    <ListItemIcon>
                      <Box
                        sx={{
                          backgroundColor: "primary.light",
                          color: "primary.main",
                          borderRadius: "50%",
                          p: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {material.icon}
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                      primary={material.title}
                      secondary={material.description}
                      primaryTypographyProps={{
                        fontWeight: 600,
                        color: "text.primary",
                      }}
                      secondaryTypographyProps={{
                        color: "text.secondary",
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 4,
                borderRadius: 3,
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                background: "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)",
                color: "white",
              }}
            >
              <MenuBook sx={{ fontSize: 80, mb: 3, opacity: 0.7 }} />
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                Ready to Practice?
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => navigate("/student/theory")}
                startIcon={<Assessment />}
                sx={{
                  py: 2,
                  fontSize: "1rem",
                  fontWeight: 600,
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                  },
                }}
              >
                Start Theory Practice
              </Button>
            </Card>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card
            sx={{
              width: "100%",
              p: 3,
              borderRadius: 3,
              background: "linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)",
              color: "white",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                textAlign: "center",
              }}
            >
              Additional Learning Resources
            </Typography>
            <Grid container spacing={2}>
              {/* PDF Resources */}
              {pdfResources.map((resource, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card
                    sx={{
                      background: "rgba(255,255,255,0.2)",
                      color: "white",
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        background: "rgba(255,255,255,0.3)",
                      },
                      cursor: "pointer",
                    }}
                    onClick={() => handleOpenPdf(resource)}
                  >
                    <Box
                      sx={{
                        backgroundColor: "rgba(255,255,255,0.3)",
                        borderRadius: "50%",
                        p: 1,
                        mr: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {resource.icon}
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {resource.title}
                      </Typography>
                      <Typography variant="body2">
                        {resource.description}
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              ))}

              {/* Signs Viewer */}
              <Grid item xs={12} sm={6}>
                <Card
                  sx={{
                    background: "rgba(255,255,255,0.2)",
                    color: "white",
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      background: "rgba(255,255,255,0.3)",
                    },
                    cursor: "pointer",
                  }}
                  onClick={() => setOpenSignsDialog(true)}
                >
                  <Box
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.3)",
                      borderRadius: "50%",
                      p: 1,
                      mr: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <RemoveRedEye />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      View Road Signs
                    </Typography>
                    <Typography variant="body2">
                      Explore different categories of road signs
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Container>

      {/* PDF Viewer Dialog */}
      <Dialog
        open={openPdfDialog}
        onClose={handleClosePdfDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{selectedPdf?.title}</DialogTitle>
        <DialogContent>
          {selectedPdf && (
            <iframe
              src={selectedPdf.pdfUrl}
              width="100%"
              height="500px"
              title={selectedPdf.title}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Signs Viewer Dialog */}
      <Dialog
        open={openSignsDialog}
        onClose={handleCloseSignsDialog}
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle>Road Signs Categories</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {signCategories.map((category, index) => (
              <Grid item xs={12} key={index}>
                <Card className={`${category.color} p-4 mb-4`}>
                  <Typography
                    variant="h5"
                    className="mb-3 text-center"
                    sx={{
                      fontWeight: 700,
                      background:
                        "linear-gradient(45deg, #4CAF50 30%, #81C784 90%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      borderBottom: "3px solid",
                      borderColor: "green.600",
                      paddingBottom: "10px",
                    }}
                  >
                    {category.title}
                  </Typography>
                  <Grid container spacing={2}>
                    {category.signs[0].signs.map((sign, signIndex) => (
                      <Grid item xs={6} sm={4} md={3} key={signIndex}>
                        <Card
                          className="p-3 text-center hover:shadow-lg transition-shadow"
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-between",
                            height: "100%",
                          }}
                        >
                          <img
                            src={sign.img}
                            alt={sign.label}
                            className="mx-auto h-24 object-contain mb-2"
                          />
                          <Box>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {sign.label}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {sign.description || "No description available"}
                            </Typography>
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WelcomePage;
