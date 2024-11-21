import "./index.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ReactDOM from "react-dom";

// import Test from "./ProfilePage/TestPage/Test";
import SchoolsPage from "./pages/SchoolsPage/SchoolsPagelsPage";
function App() {
  return (
    <SchoolsPage />
    // <Router>
    //   <Test />
    // </Router>
  );
}
ReactDOM.render(<App />, document.getElementById("root")); // Render the App component
export default App;
