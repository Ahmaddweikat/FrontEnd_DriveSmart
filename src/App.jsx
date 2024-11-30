import "./index.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import Form from "./pages/Student/BookingandScheduling/components/Form/Form";

function App() {
  return (
    <Form />
    // <Router>
    //   <SignUpPage />
    // </Router>
  );
}
ReactDOM.render(<App />, document.getElementById("root")); // Render the App component
export default App;
