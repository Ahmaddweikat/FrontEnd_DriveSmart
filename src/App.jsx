import "./index.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import TrafficSigns from "./pages/TrafficSigns/TrafficSigns";

function App() {
  return (
    <TrafficSigns />
    // <Router>
    //   <Settings />
    // </Router>
  );
}
ReactDOM.render(<App />, document.getElementById("root")); // Render the App component
export default App;
