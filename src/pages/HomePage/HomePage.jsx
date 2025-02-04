import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NorthIcon from "@mui/icons-material/North";
import TrafficOutlinedIcon from "@mui/icons-material/TrafficOutlined";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import ActionAreaCard from "./components/ActionAreaCard";
import TimeCard from "./components/FlipCard";
import FlipSection from "./components/FlipSection";
import ImageSlider from "./components/ImageSlider";
import useScrollManagement from "./../../hooks/useScrollManagement";

const HomePage = () => {
  const { showBackToTop } = useScrollManagement();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="grid grid-row-6 bg-custombg">
      {/* Header Section */}
      <header className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img
                  src="DRIVESMART.png"
                  alt="DriveSmart Logo"
                  className="h-8 w-auto"
                />
                {/* <span className="ml-2 text-xl font-bold text-customGreen">
                  DriveSmart
                </span> */}
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/signin">
                <button className="px-4 py-2 text-customGreen hover:text-customGreen/80 font-medium">
                  Sign In
                </button>
              </Link>
              <Link to="/signup/student">
                <button className="px-4 py-2 bg-customGreen text-white rounded-lg hover:bg-customGreen/90 transition-colors font-medium">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="w-full">
        <ImageSlider />
      </div>

      {/* Updated Registration Section */}
      <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
              <span className="text-customGreen">Drive</span> Your Future with
              Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join DriveSmart today and start your journey towards becoming a
              confident driver
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
              <Link to="/schools">
                <button className="w-full sm:w-auto px-8 py-3 bg-customGreen text-white rounded-lg hover:bg-customGreen/90 transition-all transform hover:-translate-y-0.5 font-medium shadow-lg">
                  Find a Driving School
                </button>
              </Link>
              <Link to="/signup/schoolManager">
                <button className="w-full sm:w-auto px-8 py-3 border-2 border-customGreen text-customGreen rounded-lg hover:bg-customGreen/10 transition-all transform hover:-translate-y-0.5 font-medium">
                  Register Your School
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div>
        <div className="flex justify-center mt-16 mb-12">
          <div>
            <h1 className="text-5xl">
              <span className="text-customGreen">Obtaining </span>the license
            </h1>
            <h4 className="flex justify-center text-2xl mt-4">
              Department service hours
            </h4>
          </div>
        </div>
        <div className="flex items-center text-center my-4">
          <span className="outer-line flex-grow border-b border-gray-300"></span>
          <span className="mx-4">
            <AccessAlarmsIcon style={{ width: 40, height: 40 }} />
          </span>
          <span className="outer-line flex-grow border-b border-gray-300"></span>
        </div>
        <TimeCard className="w-full md:w-1/2 lg:w-1/3" />
      </div>
      <div>
        <div className="flex justify-center mt-16 mb-12">
          <div>
            <h4 className="flex justify-center text-2xl mt-4">
              License Sections
            </h4>
          </div>
        </div>
        <div className="flex items-center text-center my-8 relative">
          {/* Left line */}
          <span className="outer-line flex-grow border-b border-gray-300"></span>

          {/* Center icon */}
          <span className="mx-4">
            <TrafficOutlinedIcon style={{ width: 40, height: 40 }} />
          </span>

          {/* Right line */}
          <span className="outer-line flex-grow border-b border-gray-300 relative">
            {/* Positioned button above the line */}
          </span>
        </div>
        <FlipSection className="w-full md:w-1/2 lg:w-1/3" />
      </div>
      <div>
        <div>
          <h4 className="flex justify-center text-2xl mt-8">Driving Schools</h4>
        </div>
        <div className="flex items-center text-center my-8 relative">
          {/* Left line */}
          <span className="outer-line flex-grow border-b border-gray-300"></span>

          {/* Center icon */}
          <span className="mx-4">
            <EmojiTransportationIcon style={{ width: 40, height: 40 }} />
          </span>

          {/* Right line */}
          <span className="outer-line flex-grow border-b border-gray-300 relative">
            {/* Positioned button above the line */}
            <Button
              variant="outlined"
              endIcon={<MoreHorizIcon />}
              style={{
                color: "#72b626",
                position: "absolute",
                top: "-40px",
                right: "20px",
              }}
            >
              See all
            </Button>
          </span>
        </div>
        <ActionAreaCard />
      </div>

      <div>
        <div>
          {showBackToTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-5 right-5 bg-customGreen text-white p-2 rounded-full shadow-lg transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              aria-label="Back to top"
            >
              <NorthIcon />
            </button>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
