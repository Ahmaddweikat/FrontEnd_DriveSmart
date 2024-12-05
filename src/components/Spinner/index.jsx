import { CircularProgress } from "@mui/material";

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <CircularProgress sx={{ color: "#72b626" }} />
    </div>
  );
};

export default Spinner;
