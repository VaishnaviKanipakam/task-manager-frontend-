import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddTask from "./components/AddTask";
import InsightsPanel from "./components/InsightsPanel";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <div></div>
      <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
        <Route exact path="/add-task" element={<AddTask />}></Route>
        <Route exact path="/insights" element={<InsightsPanel />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
