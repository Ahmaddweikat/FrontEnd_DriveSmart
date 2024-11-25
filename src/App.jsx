import "./index.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import Type from "./pages/Student/BookingandScheduling/components/TypePage/Type";

function App() {
  return (
    <Type />
    // <Router>
    //   <Settings />
    // </Router>
  );
}
ReactDOM.render(<App />, document.getElementById("root")); // Render the App component
export default App;
