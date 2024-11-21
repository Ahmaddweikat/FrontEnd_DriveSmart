import "./index.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import QuestionsForm from "./pages/Student/QuestionsForm/QuestionsForm";
function App() {
  return (
    <QuestionsForm />
    // <Router>
    //   <Settings />
    // </Router>
  );
}
ReactDOM.render(<App />, document.getElementById("root")); // Render the App component
export default App;
