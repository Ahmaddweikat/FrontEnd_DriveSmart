import { CircularProgress } from "@mui/material";

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <CircularProgress sx={{ color: "#72b626" }} />
    </div>
  );
};

export default Spinner;
