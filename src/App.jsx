import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import About from './pages/About';
import Analysis from './pages/Analysis';
import Approaches from './pages/Approaches';
import AskAI from './pages/AskAI';
import Home from './pages/Home';
import TechnologyDetail from './pages/TechnologyDetail';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/approaches" element={<Approaches />} />
        <Route path="/approaches/:id" element={<TechnologyDetail />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/ask-ai" element={<AskAI />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}
