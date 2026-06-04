import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/global.css.ts";
import Routes from "./routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Routes />
  </StrictMode>
);
