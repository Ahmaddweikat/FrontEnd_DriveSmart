import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import LocalCarWashOutlinedIcon from "@mui/icons-material/LocalCarWashOutlined";
import LocalTaxiOutlinedIcon from "@mui/icons-material/LocalTaxiOutlined";
import DirectionsBusFilledOutlinedIcon from "@mui/icons-material/DirectionsBusFilledOutlined";

export const licenseSections = [
  {
    id: 1,
    title: "Private License",
    icon: (
      <DirectionsCarOutlinedIcon
        className="text-[#72b626] group-hover:text-[#FFFFFF] transition-all duration-300"
        style={{ width: "60px", height: "60px" }}
      />
    ),
    description: "Automatic",
  },
  {
    id: 2,
    title: "Private License",
    icon: (
      <LocalCarWashOutlinedIcon
        className="text-[#72b626] group-hover:text-[#FFFFFF] transition-all duration-300"
        style={{ width: "60px", height: "60px" }}
      />
    ),
    description: "Regular Gear",
  },
  {
    id: 3,
    title: "Bus License",
    icon: (
      <DirectionsBusFilledOutlinedIcon
        className="text-[#72b626] group-hover:text-[#FFFFFF] transition-all duration-300"
        style={{ width: "60px", height: "60px" }}
      />
    ),
    description: "Heavy / Light",
  },
  {
    id: 4,
    title: "Taxi License",
    icon: (
      <LocalTaxiOutlinedIcon
        className="text-[#72b626] group-hover:text-[#FFFFFF] transition-all duration-300"
        style={{ width: "60px", height: "60px" }}
      />
    ),
    description: "Taxi / Bus",
  },
];
