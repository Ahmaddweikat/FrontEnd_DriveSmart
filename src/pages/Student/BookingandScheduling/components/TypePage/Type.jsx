import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import img from "../../../../../assets/BookingAndScheduling/Images/test.jpg";
import img2 from "../../../../../assets/BookingAndScheduling/type/images/learning.jpg";
import img3 from "../../../../../assets/BookingAndScheduling/type/images/practial.jpeg";
import img4 from "../../../../../assets/BookingAndScheduling/type/images/revision.png";
import SideBar from "../SideBar";

const Type = () => {
  return (
    <div className="flex overflow-hidden h-screen">
      <SideBar />
      {/* Main Content */}
      <div className="flex-1">
        <div className="max-w-screen-xl mx-auto">
          {/* Image with Heading */}
          <div className="relative">
            <img src={img} alt="home" className="w-full h-auto filter-green" />
            <h2 className="absolute inset-0 flex items-start justify-start pt-16 pl-6 text-white text-3xl font-bold bg-black bg-opacity-50 opacity-0 animate-fade-in">
              Type of Lesson
            </h2>

            {/* Cards Grid */}
            <div className="grid grid-cols-3 gap-4 absolute inset-0 items-center justify-center p-4 mb-8 ml-8">
              <div>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="120"
                      image={img2}
                      alt="img"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Theoretical Lesson
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          marginTop: 4,
                          marginBottom: 2,
                        }}
                      >
                        Theoretical lesson is a lesson that focuses on the
                        theoretical aspect of a subject. It provides students
                        with a deeper understanding of driving signs.
                      </Typography>

                      {/* Duration */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          marginTop: 2,
                          fontStyle: "italic", // Optional: Add italic style for emphasis
                        }}
                      >
                        Duration: 40 minutes
                      </Typography>
                    </CardContent>
                  </CardActionArea>

                  {/* Horizontal line */}
                  <hr
                    className="my-2"
                    style={{ borderColor: "#e0e0e0", borderWidth: "1px" }}
                  />
                  <CardActions>
                    <Button
                      className="hover:bg-gray-200"
                      variant="outlined"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        margin: "0 auto",
                        color: "#72b626",
                        borderColor: "#72b626",
                      }}
                    >
                      Select
                    </Button>
                  </CardActions>
                </Card>
              </div>

              <div>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="120"
                      image={img3}
                      alt="img"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Theoretical Lesson
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          marginTop: 4,
                          marginBottom: 2,
                        }}
                      >
                        Practical lesson is to equip students with the skills
                        necessary to recognize, interpret, and appropriately
                        respond to various driving signs in real-world driving
                        conditions.
                      </Typography>
                      {/* Duration */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          marginTop: 2,
                          fontStyle: "italic", // Optional: Add italic style for emphasis
                        }}
                      >
                        Duration: 40 minutes
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <hr
                    className="my-2"
                    style={{ borderColor: "#e0e0e0", borderWidth: "1px" }}
                  />
                  <CardActions>
                    <Button
                      className="hover:bg-gray-200"
                      variant="outlined"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        margin: "0 auto",
                        color: "#72b626",
                        borderColor: "#72b626",
                      }}
                    >
                      Select
                    </Button>
                  </CardActions>
                </Card>
              </div>

              <div>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="120"
                      image={img4}
                      alt="img"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Revision Lesson
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          marginTop: 4,
                          marginBottom: 2,
                        }}
                      >
                        Revision driving lesson is to help students review and
                        consolidate key driving skills and road safety
                        knowledge. It provides an opportunity to refresh their
                        understanding of vehicle handling.
                      </Typography>
                      {/* Duration */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          marginTop: 2,
                          fontStyle: "italic", // Optional: Add italic style for emphasis
                        }}
                      >
                        Duration: 40 minutes
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <hr
                    className="my-2"
                    style={{ borderColor: "#e0e0e0", borderWidth: "1px" }}
                  />
                  <CardActions>
                    <Button
                      className="hover:bg-gray-200"
                      variant="outlined"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        margin: "0 auto",
                        color: "#72b626",
                        borderColor: "#72b626",
                      }}
                    >
                      Select
                    </Button>
                  </CardActions>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Type;
