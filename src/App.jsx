import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import Nav from "./components/Nav/Nav";
import Projects from "./pages/Projects";
import Teams from "./pages/Teams";
import Vacations from "./pages/Vacations";
import Resources from "./pages/Resources";
import { ColorSchemeToggle } from "./components/ColorSchemeToggle/ColorSchemeToggle";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <main className="main">
      <ColorSchemeToggle />
      <Nav />
      <Routes>
        <Route path="/" exact element={<Projects />}></Route>
        <Route path="/projects" element={<Projects />}></Route>
        <Route path="/teams" element={<Teams />}></Route>
        <Route path="/resources" element={<Resources />}></Route>
        <Route path="/vacations" element={<Vacations />}></Route>
      </Routes>
    </main>
  );
}
