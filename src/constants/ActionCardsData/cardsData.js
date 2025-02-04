import img1 from "../../assets/HomePage/schools/images/alquds1.jpg";
import img2 from "../../assets/HomePage/schools/images/alrajaa.png";
import img3 from "../../assets/HomePage/schools/svgs/mekkawe.svg";
import img4 from "../../assets/HomePage/schools/images/falasteen_logo.png";
import img5 from "../../assets/HomePage/schools/images/sama.png";
import img6 from "../../assets/HomePage/schools/images/Dweikat.png";
import img7 from "../../assets/HomePage/schools/images/AL-AWAEL.jpg";

const schoolData = [
  {
    image: img1,
    title: "AL-QUDS",
    description:
      "Al-Qudus is a Driving school in Nablus city and it's one of the best 5 in the city.",
    city: "Nablus",
    address: "Amman Street",
    phone: 2322222,
    email: "alquds@example.com",
    rating: 5,
    website: "https://alquds-alhadetha.com",
    licenseTypes: ["Car", "Motorcycle"], // Added license types
  },
  {
    image: img2,
    title: "AL-RAJAA",
    description:
      "Al-Rajaa is a Driving school in Nablus city and it's one of the best 5 in the city.",
    city: "Nablus",
    address: "Amman Street",
    phone: 2322222,
    email: "alraja@example.com",
    rating: 5,
    website: "https://alraja-sch.com",
    licenseTypes: ["Truck", "Bus"], // Added license types
  },
  {
    image: img3,
    title: "MEKKAWI",
    description:
      "Al-Mekkawi is a Driving school in Nablus city and it's one of the best 5 in the city.",
    city: "Nablus",
    address: "Amman Street",
    phone: 2322222,
    email: "mekkawe@example.com",
    rating: 5,
    website: "https://mekkawe.com",
    licenseTypes: ["Car", "Taxi"], // Added license types
  },
  {
    image: img4,
    title: "PALESTINE",
    description:
      "Al-Rajaa is a Driving school in Ramallah city and it's one of the best 5 in the city.",
    city: "Ramallah",
    address: "Amman Street",
    phone: 2322222,
    email: "palestine@example.com",
    rating: 4,
    website: "https://palestine-sch.com",
    licenseTypes: ["Truck", "Taxi"], // Added license types
  },
  {
    image: img5,
    title: "SAMA",
    description:
      "Sama is a Driving school in Nablus city and it's one of the best 5 in the city.",
    city: "Nablus",
    address: "Amman Street",
    phone: 2322222,
    email: "sama@example.com",
    rating: 5,
    website: "https://sama-sch.com",
    licenseTypes: ["Car", "Bus"], // Added license types
  },
  {
    image: img6,
    title: "DWEIKAT",
    description:
      "Dweikat is a Driving school in Nablus city and it's one of the best 5 in the city.",
    city: "Nablus",
    address: "Amman Street",
    phone: 2322222,
    email: "dweikat@example.com",
    rating: 4,
    website: "https://dweikat-sch.com",
    licenseTypes: ["Car", "Motorcycle"], // Added license types
  },
  {
    image: img7,
    title: "AL-AWAEL",
    description:
      "Al-Awael is a Driving school in Nablus city and it's one of the best 5 in the city.",
    city: "Nablus",
    address: "Amman Street",
    phone: 2322222,
    email: "alwael@example.com",
    rating: 3,
    website: "https://alwael-sch.com",
    licenseTypes: ["Taxi", "Truck"], // Added license types
  },
  {
    title: "Driving School A",
    city: "Nablus",
    licenseTypes: ["Car", "Truck"], // Added license types
    rating: 4.5,
    image: "path/to/image.jpg",
    description: "Learn to drive with the best.",
    website: "https://example.com",
  },
  {
    image: img1,
    title: "AL-QUDS",
    description:
      "Al-Qudus is a Driving school in Nablus city and it's one of the best 5 in the city.",
    city: "Nablus",
    address: "Amman Street",
    phone: 2322222,
    email: "alquds@example.com",
    rating: 5,
    website: "https://alquds-alhadetha.com",
    licenseTypes: ["Car", "Motorcycle"], // Added license types
  },
  {
    image: img2,
    title: "AL-RAJAA",
    description:
      "Al-Rajaa is a Driving school in Nablus city and it's one of the best 5 in the city.",
    city: "Nablus",
    address: "Amman Street",
    phone: 2322222,
    email: "alraja@example.com",
    rating: 5,
    website: "https://alraja-sch.com",
    licenseTypes: ["Truck", "Bus"], // Added license types
  },
  {
    image: img3,
    title: "MEKKAWI",
    description:
      "Al-Mekkawi is a Driving school in Nablus city and it's one of the best 5 in the city.",
    city: "Nablus",
    address: "Amman Street",
    phone: 2322222,
    email: "mekkawe@example.com",
    rating: 5,
    website: "https://mekkawe.com",
    licenseTypes: ["Car", "Taxi"], // Added license types
  },
  {
    image: img4,
    title: "PALESTINE",
    description:
      "Al-Rajaa is a Driving school in Ramallah city and it's one of the best 5 in the city.",
    city: "Ramallah",
    address: "Amman Street",
    phone: 2322222,
    email: "palestine@example.com",
    rating: 4,
    website: "https://palestine-sch.com",
    licenseTypes: ["Truck", "Taxi"], // Added license types
  },
  {
    image: img5,
    title: "SAMA",
    description:
      "Sama is a Driving school in Nablus city and it's one of the best 5 in the city.",
    city: "Nablus",
    address: "Amman Street",
    phone: 2322222,
    email: "sama@example.com",
    rating: 5,
    website: "https://sama-sch.com",
    licenseTypes: ["Car", "Bus"], // Added license types
  },
  {
    image: img6,
    title: "DWEIKAT",
    description:
      "Dweikat is a Driving school in Nablus city and it's one of the best 5 in the city.",
    city: "Nablus",
    address: "Amman Street",
    phone: 2322222,
    email: "dweikat@example.com",
    rating: 4,
    website: "https://dweikat-sch.com",
    licenseTypes: ["Car", "Motorcycle"], // Added license types
  },
  {
    image: img7,
    title: "AL-AWAEL",
    description:
      "Al-Awael is a Driving school in Nablus city and it's one of the best 5 in the city.",
    city: "Nablus",
    address: "Amman Street",
    phone: 2322222,
    email: "alwael@example.com",
    rating: 3,
    website: "https://alwael-sch.com",
    licenseTypes: ["Taxi", "Truck"], // Added license types
  },
  {
    title: "Driving School A",
    city: "Nablus",
    licenseTypes: ["Car", "Truck"], // Added license types
    rating: 4.5,
    image: "path/to/image.jpg",
    description: "Learn to drive with the best.",
    website: "https://example.com",
  },
  {
    image: img1,
    title: "AL-QUDS",
    description:
      "Al-Qudus is a Driving school in Nablus city and it's one of the best 5 in the city.",
    city: "Nablus",
    address: "Amman Street",
    phone: 2322222,
    email: "alquds@example.com",
    rating: 5,
    website: "https://alquds-alhadetha.com",
    licenseTypes: ["Car", "Motorcycle"], // Added license types
  },
  {
    image: img2,
    title: "AL-RAJAA",
    description:
      "Al-Rajaa is a Driving school in Nablus city and it's one of the best 5 in the city.",
    city: "Nablus",
    address: "Amman Street",
    phone: 2322222,
    email: "alraja@example.com",
    rating: 5,
    website: "https://alraja-sch.com",
    licenseTypes: ["Truck", "Bus"], // Added license types
  },
  {
    image: img3,
    title: "MEKKAWI",
    description:
      "Al-Mekkawi is a Driving school in Nablus city and it's one of the best 5 in the city.",
    city: "Nablus",
    address: "Amman Street",
    phone: 2322222,
    email: "mekkawe@example.com",
    rating: 5,
    website: "https://mekkawe.com",
    licenseTypes: ["Car", "Taxi"], // Added license types
  },
  {
    image: img4,
    title: "PALESTINE",
    description:
      "Al-Rajaa is a Driving school in Ramallah city and it's one of the best 5 in the city.",
    city: "Ramallah",
    address: "Amman Street",
    phone: 2322222,
    email: "palestine@example.com",
    rating: 4,
    website: "https://palestine-sch.com",
    licenseTypes: ["Truck", "Taxi"], // Added license types
  },
  {
    image: img5,
    title: "SAMA",
    description:
      "Sama is a Driving school in Nablus city and it's one of the best 5 in the city.",
    city: "Nablus",
    address: "Amman Street",
    phone: 2322222,
    email: "sama@example.com",
    rating: 5,
    website: "https://sama-sch.com",
    licenseTypes: ["Car", "Bus"], // Added license types
  },
  {
    image: img6,
    title: "DWEIKAT",
    description:
      "Dweikat is a Driving school in Nablus city and it's one of the best 5 in the city.",
    city: "Nablus",
    address: "Amman Street",
    phone: 2322222,
    email: "dweikat@example.com",
    rating: 4,
    website: "https://dweikat-sch.com",
    licenseTypes: ["Car", "Motorcycle"], // Added license types
  },
  {
    image: img7,
    title: "AL-AWAEL",
    description:
      "Al-Awael is a Driving school in Nablus city and it's one of the best 5 in the city.",
    city: "Nablus",
    address: "Amman Street",
    phone: 2322222,
    email: "alwael@example.com",
    rating: 3,
    website: "https://alwael-sch.com",
    licenseTypes: ["Taxi", "Truck"], // Added license types
  },
  {
    title: "Driving School A",
    city: "Nablus",
    licenseTypes: ["Car", "Truck"], // Added license types
    rating: 4.5,
    image: "path/to/image.jpg",
    description: "Learn to drive with the best.",
    website: "https://example.com",
  },
];

const useCardData = () => {
  // Return the updated school data with licenseTypes
  return schoolData;
};

export default useCardData;
