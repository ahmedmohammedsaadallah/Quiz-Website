import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import Quiz from "./Components/Quiz";
import Result from "./Components/Result";
import Layout from "./Components/Layout";
import Authenticate from "./Components/Authenticate";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Authenticate />}>
          <Route path="/" element={<Layout />}>
            <Route path="/Quiz" element={<Quiz />} />
            <Route path="/Result" element={<Result />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
