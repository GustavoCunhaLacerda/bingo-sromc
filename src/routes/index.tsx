import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import About from "../pages/About";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
    </Routes>
  );
}
