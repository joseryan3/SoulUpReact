import { NavLink } from 'react-router-dom';
import './Admin.css';

const navigation = [
    { to: '/admin', label: 'Visão geral', end: true },
    { to: '/admin/usuarios', label: 'Usuários' },
    { to: '/admin/videos', label: 'Vídeos' },
    { to: '/admin/suporte', label: 'Suporte' }
];

function AdminLayout({ title, description, children }) {
    return (
        <main className="admin-page">
            <div className="admin-container">
                <header className="admin-header">
                    <div>
                        <h1>{title}</h1>
                        <p>{description}</p>
                    </div>
                    <span className="admin-demo-label">Ambiente de demonstração</span>
                </header>

                <nav className="admin-nav" aria-label="Navegação administrativa">
                    {navigation.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <p className="admin-demo-notice">
                    Dados de exemplo. As alterações ficam salvas neste navegador e não são enviadas ao servidor.
                </p>

                {children}
            </div>
        </main>
    );
}

export default AdminLayout;
