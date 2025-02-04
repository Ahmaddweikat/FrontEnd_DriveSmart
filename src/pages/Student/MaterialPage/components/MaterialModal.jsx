import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Box,
  Grid,
  Card,
  Button,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import WarningSigns from "../test/constants/WarningSigns";
import GuidanceSigns from "../test/constants/GuidanceSign";
import InquirySigns from "../test/constants/InquirySigns";
import RoadSurfaceSigns from "../test/constants/Signspaintedontheroadsurface";
import TrafficLightsSigns from "../test/constants/TrafficlightsandlanecontrolSigns";
import HelpingSigns from "../test/constants/HelpingSigns";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

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

const PDFViewer = ({ pdfPath }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Create a blob URL from the PDF file
    fetch(pdfPath)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading PDF:", err);
        setError("Failed to load PDF. Please try again later.");
        setLoading(false);
      });

    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfPath]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setError(null);
    setLoading(false);
  };

  const onDocumentLoadError = (error) => {
    console.error("Error loading PDF:", error);
    setError("Failed to load PDF. Please try again later.");
    setLoading(false);
  };

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => {
    if (pageNumber > 1) {
      changePage(-1);
    }
  };

  const nextPage = () => {
    if (pageNumber < numPages) {
      changePage(1);
    }
  };

  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.2, 2.0));
  };

  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.2, 0.6));
  };

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "300px",
          flexDirection: "column",
          gap: 2,
          p: 3,
          bgcolor: "error.light",
          borderRadius: 2,
        }}
      >
        <Typography color="error" variant="h6">
          {error}
        </Typography>
        <Typography variant="body2" color="error.dark">
          Unable to load: {pdfPath}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          mb: 2,
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={previousPage}
          disabled={pageNumber <= 1 || loading}
          startIcon={<NavigateBeforeIcon />}
        >
          Previous
        </Button>
        <Typography>
          Page {pageNumber} of {numPages || "?"}
        </Typography>
        <Button
          variant="contained"
          onClick={nextPage}
          disabled={pageNumber >= numPages || loading}
          endIcon={<NavigateNextIcon />}
        >
          Next
        </Button>
        <Button
          variant="contained"
          onClick={zoomIn}
          disabled={loading}
          startIcon={<ZoomInIcon />}
        >
          Zoom In
        </Button>
        <Button
          variant="contained"
          onClick={zoomOut}
          disabled={loading}
          startIcon={<ZoomOutIcon />}
        >
          Zoom Out
        </Button>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          overflow: "auto",
          maxHeight: "calc(80vh - 100px)",
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 2,
        }}
      >
        <iframe src={pdfUrl} width="100%" height="100%"></iframe>
      </Box>
    </Box>
  );
};

const MaterialModal = ({ open, onClose, material }) => {
  if (!material) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = material.pdfPath;
    link.download = `${material.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderContent = () => {
    if (material.type === "signs") {
      return (
        <Grid container spacing={3}>
          {signCategories
            .filter((category) => category.title === material.category)
            .map((category, index) => (
              <Grid item xs={12} key={index}>
                <Card className={`${category.color} p-4 mb-4`}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 3,
                      textAlign: "center",
                      fontWeight: 700,
                      background:
                        "linear-gradient(45deg, #72b626 30%, #8ed136 90%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      borderBottom: "3px solid",
                      borderColor: "#72b626",
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
      );
    } else if (material.type === "pdf") {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            p: 4,
          }}
        >
          <Typography variant="h6" textAlign="center">
            {material.description}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
              sx={{
                background: "linear-gradient(45deg, #72b626 30%, #8ed136 90%)",
                color: "white",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #5c9220 30%, #72b626 90%)",
                },
              }}
            >
              Download PDF
            </Button>
          </Box>
          <PDFViewer pdfPath={material.pdfPath} />
        </Box>
      );
    }

    return (
      <Typography variant="body1">
        {material.description || "No description available"}
      </Typography>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: "90vh",
        },
      }}
    >
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">{material.title}</Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>{renderContent()}</DialogContent>
    </Dialog>
  );
};

export default MaterialModal;
