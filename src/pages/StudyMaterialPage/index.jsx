import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Search,
  MenuBook,
  PlayCircleOutline,
  Description,
  CloudDownload,
  BookmarkBorder,
  Bookmark,
  AccessTime,
  Grade,
  FilterList,
} from '@mui/icons-material';

const studyMaterials = [
  {
    id: 1,
    title: "Traffic Signs and Signals",
    type: "PDF Guide",
    category: "Basic",
    duration: "2 hours",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1544985361-b420d7a77043",
    description: "Complete guide to understanding traffic signs and signals",
    downloadUrl: "/materials/traffic-signs.pdf",
  },
  {
    id: 2,
    title: "Road Rules Essentials",
    type: "Video Course",
    category: "Rules",
    duration: "1.5 hours",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d",
    description: "Essential rules every driver needs to know",
    downloadUrl: "/materials/road-rules.mp4",
  },
  {
    id: 3,
    title: "Safe Driving Techniques",
    type: "Interactive Guide",
    category: "Safety",
    duration: "3 hours",
    level: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d",
    description: "Master the art of safe and defensive driving",
    downloadUrl: "/materials/safe-driving.html",
  },
  {
    id: 4,
    title: "Vehicle Control Basics",
    type: "PDF Guide",
    category: "Basic",
    duration: "1 hour",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d",
    description: "Learn the fundamentals of vehicle control",
    downloadUrl: "/materials/vehicle-control.pdf",
  },
];

const StudyMaterialPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTab, setCurrentTab] = useState(0);
  const [bookmarked, setBookmarked] = useState([]);

  const handleBookmark = (materialId) => {
    setBookmarked(prev => 
      prev.includes(materialId)
        ? prev.filter(id => id !== materialId)
        : [...prev, materialId]
    );
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const filterMaterials = () => {
    let filtered = [...studyMaterials];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(material =>
        material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply tab filter
    switch (currentTab) {
      case 1: // Beginner
        filtered = filtered.filter(material => material.level === "Beginner");
        break;
      case 2: // Intermediate
        filtered = filtered.filter(material => material.level === "Intermediate");
        break;
      case 3: // Advanced
        filtered = filtered.filter(material => material.level === "Advanced");
        break;
      default:
        break;
    }

    return filtered;
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f7' ,         overflow: 'auto',
    }}>
      {/* Header Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          pt: 8,
          pb: 6,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              position: 'relative',
              zIndex: 1,
            }}
          >
            Study Materials
          </Typography>
          <Typography
            variant="h5"
            sx={{
              maxWidth: 600,
              mb: 4,
              opacity: 0.9,
              position: 'relative',
              zIndex: 1,
            }}
          >
            Access comprehensive learning resources to master your driving theory
          </Typography>

          {/* Search Bar */}
          <Box sx={{ maxWidth: 600, position: 'relative', zIndex: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search study materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                backgroundColor: 'white',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small">
                      <FilterList />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Container>

        {/* Decorative Background Elements */}
        <MenuBook
          sx={{
            position: 'absolute',
            right: '5%',
            bottom: '10%',
            fontSize: 180,
            opacity: 0.1,
            transform: 'rotate(15deg)',
          }}
        />
      </Box>

      {/* Content Section */}
      <Container maxWidth="lg" sx={{ mt: -4, position: 'relative', zIndex: 2 }}>
        {/* Filter Tabs */}
        <Card sx={{ mb: 4, borderRadius: 2 }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ px: 2 }}
          >
            <Tab label="All Materials" />
            <Tab label="Beginner" />
            <Tab label="Intermediate" />
            <Tab label="Advanced" />
          </Tabs>
        </Card>

        {/* Materials Grid */}
        <Grid container spacing={3}>
          {filterMaterials().map((material) => (
            <Grid item xs={12} sm={6} md={4} key={material.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  },
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={material.thumbnail}
                    alt={material.title}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,1)',
                      },
                    }}
                    onClick={() => handleBookmark(material.id)}
                  >
                    {bookmarked.includes(material.id) ? (
                      <Bookmark color="primary" />
                    ) : (
                      <BookmarkBorder />
                    )}
                  </IconButton>
                </Box>

                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      {material.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {material.description}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 'auto' }}>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                      <Chip
                        size="small"
                        icon={<Description sx={{ fontSize: 16 }} />}
                        label={material.type}
                      />
                      <Chip
                        size="small"
                        icon={<AccessTime sx={{ fontSize: 16 }} />}
                        label={material.duration}
                      />
                      <Chip
                        size="small"
                        icon={<Grade sx={{ fontSize: 16 }} />}
                        label={material.level}
                      />
                    </Box>

                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={material.type === 'Video Course' ? <PlayCircleOutline /> : <CloudDownload />}
                      sx={{
                        mt: 2,
                        textTransform: 'none',
                        borderRadius: 2,
                      }}
                    >
                      {material.type === 'Video Course' ? 'Watch Now' : 'Download'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default StudyMaterialPage;
