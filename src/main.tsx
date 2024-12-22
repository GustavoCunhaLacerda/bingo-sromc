import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import "./index.css";
import RoutesComponent from "./routes";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <RoutesComponent />
  </BrowserRouter>
);
