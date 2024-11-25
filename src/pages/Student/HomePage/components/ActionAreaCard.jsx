import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import useCardData from "../constants/ActionCardsData/cardsData";

export default function ActionAreaCard({ isExpanded }) {
  const cardsData = useCardData();

  return (
    <div className="flex flex-wrap justify-start gap-2">
      {cardsData.map((card, index) => (
        <Card
          sx={{
            maxWidth: isExpanded ? 305 : 355,
            marginBottom: 2,
            marginLeft: isExpanded ? 0 : 1,
          }}
          key={index}
        >
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
