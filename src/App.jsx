import "./index.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import Lessons from "./pages/Student/ProfilePage/LessonsPage/Lessons";

function App() {
  return (
    // <GetALicense />
    <Router>
      <Lessons />
    </Router>
  );
}
ReactDOM.render(<App />, document.getElementById("root")); // Render the App component
export default App;
