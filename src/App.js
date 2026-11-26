import { useEffect, useState } from 'react';
import './pages/style.css';

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useLocation
} from 'react-router-dom';

import { apiFetch } from './services/api';

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
import GlobalBackButton from './components/GlobalBackButton';
import VisaoGeral from './pages/PaginasDoAdm/VisaoGeral';
import Usuarios from './pages/PaginasDoAdm/Usuarios';
import Videos from './pages/PaginasDoAdm/Videos';
import Suporte from './pages/PaginasDoAdm/Suporte';

// ========================================
// ROTA PRIVADA
// ========================================

const lerUsuarioLocalStorage = () => {
    try {
        return JSON.parse(localStorage.getItem('usuarioLogado'));
    } catch {
        localStorage.removeItem('usuarioLogado');
        return null;
    }
};

const RotaPrivada = ({ children, somenteAdmin = false }) => {
    const [usuario, setUsuario] = useState(() => lerUsuarioLocalStorage());
    const [verificando, setVerificando] = useState(() => !lerUsuarioLocalStorage());
    const location = useLocation();

    useEffect(() => {
        let ativo = true;

        if (usuario) {
            setVerificando(false);
            return () => {
                ativo = false;
            };
        }

        const verificarSessao = async () => {
            try {
                const response = await apiFetch('/api/me');
                if (!ativo) return;

                if (response.ok) {
                    const dadosUsuario = await response.json();
                    localStorage.setItem('usuarioLogado', JSON.stringify(dadosUsuario));
                    setUsuario(dadosUsuario);
                } else {
                    localStorage.removeItem('usuarioLogado');
                    setUsuario(null);
                }
            } catch {
                if (!ativo) return;
                localStorage.removeItem('usuarioLogado');
                setUsuario(null);
            } finally {
                if (ativo) {
                    setVerificando(false);
                }
            }
        };

        verificarSessao();

        return () => {
            ativo = false;
        };
    }, [usuario]);

    if (verificando) {
        return <div style={{ padding: '24px', textAlign: 'center' }}>Verificando sessão...</div>;
    }

    if (!usuario) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    if (somenteAdmin && usuario.tipo !== 'ADMIN') {
        return <Navigate to="/upload" replace />;
    }

    return children;
};

// ========================================
// APP
// ========================================

const AppRoutes = () => {
    const location = useLocation();

    return (
        <>
            {location.pathname !== '/' && <GlobalBackButton />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/resetarsenha" element={<ResetarSenha />} />
                <Route path="/recursos" element={<Recursos />} />
                <Route path="/comecegratis" element={<ComeceGratis />} />
                <Route path="/comofunciona" element={<ComoFunciona />} />
                <Route path="/depoimentos" element={<Depoimentos />} />
                <Route path="/precos" element={<Precos />} />

                <Route
                    path="/upload"
                    element={
                        <RotaPrivada>
                            <Upload />
                        </RotaPrivada>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <RotaPrivada somenteAdmin>
                            <VisaoGeral />
                        </RotaPrivada>
                    }
                />
                <Route
                    path="/admin/usuarios"
                    element={
                        <RotaPrivada somenteAdmin>
                            <Usuarios />
                        </RotaPrivada>
                    }
                />
                <Route
                    path="/admin/videos"
                    element={
                        <RotaPrivada somenteAdmin>
                            <Videos />
                        </RotaPrivada>
                    }
                />
                <Route
                    path="/admin/suporte"
                    element={
                        <RotaPrivada somenteAdmin>
                            <Suporte />
                        </RotaPrivada>
                    }
                />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
};

function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;