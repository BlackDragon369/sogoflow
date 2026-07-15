import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Topic from "@/pages/Topic";
import Journal from "@/pages/Journal";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topic/:id" element={<Topic />} />
        <Route path="/journal" element={<Journal />} />
      </Routes>
    </Router>
  );
}
