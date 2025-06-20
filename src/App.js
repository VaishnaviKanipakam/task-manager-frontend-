import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import AddTask from "./components/AddTask"
import EditTask from "./components/EditTask"

import "./App.css"

const App = () => {
    return(
      <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/add-task" element={<AddTask />}></Route>
            <Route exact path="/edit-task/:id" element={<EditTask />}></Route>
          </Routes>
      </BrowserRouter>
    )
}

export default App