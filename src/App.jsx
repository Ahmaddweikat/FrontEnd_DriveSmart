import "./index.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import GetALicense from "./pages/Student/GetALicense/GetALicense";

function App() {
  return (
    <GetALicense />
    // <Router>
    //   <SignUpPage />
    // </Router>
  );
}
ReactDOM.render(<App />, document.getElementById("root")); // Render the App component
export default App;
