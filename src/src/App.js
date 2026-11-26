import './pages/style.css';

import {
BrowserRouter,
Routes,
Route,
Navigate
} from 'react-router-dom';

// Páginas
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Upload from './pages/Upload';
import ResetarSenha from './pages/ResetarSenha';
import Recursos from './pages/Recursos';
import ComeceGratis from './pages/ComeceGratis';
import ComoFunciona from './pages/ComoFunciona';
import Depoimentos from './pages/Depoimentos';
import Precos from './pages/Precos';

// ========================================
// ROTA PRIVADA
// ========================================

const RotaPrivada = ({ children }) => {

// Busca usuário salvo
const usuarioLogado =
    localStorage.getItem(
        'usuarioLogado'
    );

// Se não existir usuário
// redireciona para login
if (!usuarioLogado) {

    return (
        <Navigate
            to="/login"
            replace
        />
    );
}

// Se existir usuário
return children;


};

// ========================================
// APP
// ========================================

function App() {


return (

    <BrowserRouter>

        <Routes>

            {/* ========================= */}
            {/* PÁGINAS PÚBLICAS */}
            {/* ========================= */}

            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/cadastro"
                element={<Cadastro />}
            />

            <Route
                path="/resetarsenha"
                element={<ResetarSenha />}
            />

            <Route
                path="/recursos"
                element={<Recursos />}
            />

            <Route
                path="/comecegratis"
                element={<ComeceGratis />}
            />

            <Route
                path="/comofunciona"
                element={<ComoFunciona />}
            />

            <Route
                path="/depoimentos"
                element={<Depoimentos />}
            />

            <Route
                path="/precos"
                element={<Precos />}
            />

            {/* ========================= */}
            {/* PÁGINAS PRIVADAS */}
            {/* ========================= */}

            <Route
                path="/upload"
                element={
                    <RotaPrivada>

                        <Upload />

                    </RotaPrivada>
                }
            />

            {/* Exemplo:
                histórico protegido
            */}

            <Route
                path="/historico"
                element={
                    <RotaPrivada>

                        <Upload />

                    </RotaPrivada>
                }
            />

            {/* ========================= */}
            {/* ROTA INVÁLIDA */}
            {/* ========================= */}

            <Route
                path="*"
                element={
                    <Navigate
                        to="/"
                        replace
                    />
                }
            />

        </Routes>

    </BrowserRouter>
);


}

export default App;
