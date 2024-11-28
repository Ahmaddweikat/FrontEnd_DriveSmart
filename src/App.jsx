import "./index.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import SignUpPage from "./pages/Student/SignUpPage/SignUpPage";

function App() {
  return (
    // <Form />
    <Router>
      <SignUpPage />
    </Router>
  );
}
ReactDOM.render(<App />, document.getElementById("root")); // Render the App component
export default App;
