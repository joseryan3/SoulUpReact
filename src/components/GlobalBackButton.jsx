import { useLocation, useNavigate } from 'react-router-dom';
import './GlobalBackButton.css';

const parentRoutes = {
    '/admin': '/',
    '/admin/usuarios': '/admin',
    '/admin/videos': '/admin',
    '/admin/suporte': '/admin',
    '/cadastro': '/login',
    '/login': '/',
    '/resetarsenha': '/login',
    '/upload': '/'
};

function GlobalBackButton() {
    const location = useLocation();
    const navigate = useNavigate();

    const voltar = () => {
        if (window.history.state?.idx > 0) {
            navigate(-1);
            return;
        }

        navigate(parentRoutes[location.pathname] || '/', { replace: true });
    };

    return (
        <button
            type="button"
            className="global-back-button"
            onClick={voltar}
            aria-label="Voltar à página anterior"
        >
            <span aria-hidden="true">←</span>
            Voltar
        </button>
    );
}

export default GlobalBackButton;
