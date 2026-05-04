import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SponsorsDirectory from "./pages/SponsorsDirectory";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sponsors" element={<SponsorsDirectory />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
