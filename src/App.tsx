import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navigation";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}     />
        <Route path="/about" element={<About />}    />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />}  />

        <Route path="/admin" element={<AdminLogin />}     />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
