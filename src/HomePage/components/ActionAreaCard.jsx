import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

import img1 from "../Images/alquds1.jpg";
import img2 from "../Images/logo.png";
import img3 from "../Images/mekkawe.svg";
import img4 from "../Images/falasteen_logo.png";
import img5 from "../Images/sama.png";
import img6 from "../Images/Dweikat.png";

export default function ActionAreaCard({ isExpanded }) {
  const cardsData = [
    {
      image: img1,
      title: "AL-QUDS",
      description:
        "Al-Qudus is Driving school in Nablus city and it's one of the best 5 in the city.",
      city: "Nablus",
      rating: 5,
      typesOfCars: [
        {
          type: "Car",
          car: ["OPEL", "Hyundai", "Series"],
        },
        {
          type: "Truck",
          bus: ["JAC", "Volvo"],
        },
        {
          type: "Motrocycle",
          motor: ["KTM", "Vespa"],
        },
      ],
      website: "https://alquds-alhadetha.com",
      typesOfLicenses: [
        {
          type: "Car",
        },
        {
          type: "Motorcycle",
        },
        {
          type: "Tracktor",
        },
        {
          type: "Bus",
        },
        {
          type: "Taxi",
        },
      ],
    },
    {
      image: img2,
      title: "AL-RAJAA",
      description:
        "Al-Rajaa is Driving school in Nablus city and it's one of the best 5 in the city.",
      city: "Nablus",
      rating: 5,
      typesOfCars: [
        {
          type: "Car",
          car: ["Volkswagen", "Hyundai", "Skoda"],
        },
        {
          type: "Truck",
          bus: ["Mercedes", "CAT"],
        },
        {
          type: "Motrocycle",
          motor: ["KTM", "Vespa"],
        },
      ],
      website: "https://alraja-sch.com",
    },
    {
      image: img3,
      title: "MEKKAWI",
      description:
        "Al-Mekkawi is Driving school in Nablus city and it's one of the best 5 in the city.",
      typesOfCars: [
        {
          type: "Car",
          car: ["Volkswagen", "Hyundai", "Skoda"],
        },
        {
          type: "Truck",
          bus: ["Mercedes", "CAT"],
        },
        {
          type: "Motrocycle",
          motor: ["KTM", "Vespa"],
        },
      ],
      website: "https://mekkawe.com",
    },
    {
      image: img4,
      title: "PALESTINE",
      description:
        "Al-Rajaa is Driving school in Nablus city and it's one of the best 5 in the city.",
      typesOfCars: [
        {
          type: "Car",
          car: ["Volkswagen", "Hyundai", "Skoda"],
        },
        {
          type: "Truck",
          bus: ["Mercedes", "CAT"],
        },
        {
          type: "Motrocycle",
          motor: ["KTM", "Vespa"],
        },
      ],
      website: "https://alraja-sch.com",
    },
    {
      image: img5,
      title: "SAMA",
      description:
        "Al-Rajaa is Driving school in Nablus city and it's one of the best 5 in the city.",
      typesOfCars: [
        {
          type: "Car",
          car: ["Volkswagen", "Hyundai", "Skoda"],
        },
        {
          type: "Truck",
          bus: ["Mercedes", "CAT"],
        },
        {
          type: "Motrocycle",
          motor: ["KTM", "Vespa"],
        },
      ],
      website: "https://alraja-sch.com",
    },
    {
      image: img6,
      title: "DWEIKAT",
      description:
        "Al-Rajaa is Driving school in Nablus city and it's one of the best 5 in the city.",
      typesOfCars: [
        {
          type: "Car",
          car: ["Volkswagen", "Hyundai", "Skoda"],
        },
        {
          type: "Truck",
          bus: ["Mercedes", "CAT"],
        },
        {
          type: "Motrocycle",
          motor: ["KTM", "Vespa"],
        },
      ],
      website: "https://alraja-sch.com",
    },
    // Add more cards as needed
  ];

  return (
    <div className="flex flex-wrap justify-start gap-2">
      {" "}
      {/* Added flex-wrap and justify-between */}
      {cardsData.map((card, index) => (
        <Card
          sx={{
            maxWidth: isExpanded ? 305 : 355,
            marginBottom: 2,
            marginLeft: isExpanded ? 0 : 1,
          }}
          key={index}
        >
          {" "}
          {/* Added margin-bottom for spacing between rows */}
          <CardActionArea>
            <CardMedia
              component="img"
              height={100}
              image={card.image}
              alt={card.title}
              sx={{ objectFit: "cover" }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {card.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
}
