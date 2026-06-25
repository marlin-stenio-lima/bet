import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Affiliates from './pages/Affiliates';
import LogzzLP from './pages/LogzzLP';
import ClareadorLP from './pages/ClareadorLP';
import ClareadorLPZap from './pages/ClareadorLPZap';
import AlivaxLP from './pages/AlivaxLP';
import BrasilHaitiBet from './pages/BrasilHaitiBet';
import PenaltyGame from './pages/PenaltyGame';
import AdminDashboard from './pages/AdminDashboard';

function AffiliateDashboard() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Painel do Afiliado</h1></div>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BrasilHaitiBet />} />
        <Route path="/penalty" element={<PenaltyGame />} />
        <Route path="/penalti" element={<PenaltyGame />} />
        <Route path="/boost" element={<Home />} />
        <Route path="/afiliados" element={<Affiliates />} />
        <Route path="/logzz" element={<LogzzLP />} />
        <Route path="/clareador" element={<ClareadorLP />} />
        <Route path="/zap" element={<ClareadorLPZap />} />
        <Route path="/alivax" element={<AlivaxLP />} />
        <Route path="/bet" element={<BrasilHaitiBet />} />
        <Route path="/app/admin" element={<AdminDashboard />} />
        <Route path="/app/dashboard" element={<AffiliateDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
