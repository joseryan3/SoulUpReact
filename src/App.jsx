import "./pages/style.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Upload from "./pages/Upload";
import ResetarSenha from "./pages/ResetarSenha";
import Recursos from "./pages/Recursos";
import ComeceGratis from "./pages/ComeceGratis";
import ComoFunciona from "./pages/ComoFunciona";
import Depoimentos from "./pages/Depoimentos";
import Precos from "./pages/Precos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/resetarsenha" element={<ResetarSenha />} />
        <Route path="/recursos" element={<Recursos />} />
        <Route path="/comecegratis" element={<ComeceGratis />} />
        <Route path="/comofunciona" element={<ComoFunciona />} />
        <Route path="/depoimentos" element={<Depoimentos />} />
        <Route path="/precos" element={<Precos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
