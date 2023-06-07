import "./App.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import {
  Home,
  Detail,
  Form,
  Landing,
  Activities,
  Modify,
} from "../src/views/index";
import NavBar from "./components/NavBar/NavBar";
import NotFound from "./views/NotFound/NotFound";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route exact path="/countries/:id" element={<Detail />} />
        <Route exact path="/createactivities" element={<Form />} />
        <Route exact path="/countries" element={<Home />} />
        <Route exact path="/activities" element={<Activities />} />
        <Route exact path="/" element={<Landing />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/not-found" element={<NotFound />} />

        <Route exact path="/modify" element={<Modify />} />
      </Routes>
    </div>
  );
}

export default App;
