import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../pages/style.css';
import Logo from '../Assets/logo.png';

// Componentes
import ComoFunciona from './ComoFunciona';
import Depoimentos from './Depoimentos';

const lerUsuarioLocal = () => {
  try {
    return JSON.parse(localStorage.getItem('usuarioLogado'));
  } catch {
    return null;
  }
};

function Home() {
  const [abaAtiva, setAbaAtiva] = useState('inicio');
  const [usuario, setUsuario] = useState(() => lerUsuarioLocal());
  const navigate = useNavigate();

  const ehAdmin = usuario?.tipo === 'ADMIN';

  const sair = () => {
    localStorage.removeItem('usuarioLogado');
    setUsuario(null);
    navigate('/login');
  };

  return (
    <div className="home-page">
      {/* Header compacto estilo App */}
      <header className="site-header">
        <div className="brand">
          <img
            src={Logo}
            alt="SoulUp"
            className="brand-logo"
          />
          <span>SoulUp</span>
        </div>

        {/* Navegação visível apenas no Desktop */}
        <nav className="site-nav">
          <Link to="/recursos">Recursos</Link>
          <Link to="/comofunciona">Como funciona</Link>
          <Link to="/depoimentos">Depoimentos</Link>
          <Link to="/precos">Preços</Link>
        </nav>

        {/* Ações do topo */}
        <div className="header-actions">
          {usuario ? (
            <>
              <Link to={ehAdmin ? '/admin' : '/upload'} className="nav-link secondary">
                {ehAdmin ? 'Painel Admin' : 'Meus Vídeos'}
              </Link>
              <button type="button" onClick={sair} className="nav-button desktop-only">
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link secondary">
                Entrar
              </Link>
              <Link to="/cadastro" className="nav-button desktop-only">
                Cadastre-se
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero */}
      <main className="hero-section">
        {/* Visual em destaque no topo no mobile */}
        <section className="hero-visual">
          <div className="hero-card">
            <img
              src={Logo}
              alt="Logo SoulUp"
              className="hero-logo"
            />
          </div>
        </section>

        {/* Texto e CTA */}
        <section className="hero-copy">
          <span className="hero-label">
            Correção inteligente de movimentos
          </span>

          <h1>
            Eleve sua{' '}
            <span className="text-cyan">performance</span>
            <br />
            com correções{' '}
            <span className="text-orange">precisas</span>
          </h1>

          <p>
            Envie seus vídeos de treino e receba sugestões personalizadas
            para corrigir movimentos, evitar lesões e otimizar seus
            resultados com inteligência artificial.
          </p>

          <div className="hero-actions-mobile">
            <Link to={usuario ? (ehAdmin ? '/admin' : '/upload') : '/cadastro'} className="hero-cta">
              {usuario ? (ehAdmin ? 'Ir para o Painel' : 'Enviar Vídeo') : 'Começar Agora'}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>

      {/* Como funciona */}
      <section id="como-funciona" className="home-section-block">
        <ComoFunciona />
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="home-section-block">
        <Depoimentos />
      </section>

      {/* Barra de navegação inferior exclusiva para Celular */}
      <nav className="mobile-bottom-nav" aria-label="Navegação principal">
        <Link
          to="/"
          className={`bottom-nav-item ${abaAtiva === 'inicio' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('inicio')}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3 3 10.5V21h6v-6h6v6h6V10.5L12 3Z" />
          </svg>
          <span>Início</span>
        </Link>

        <Link
          to="/recursos"
          className={`bottom-nav-item ${abaAtiva === 'recursos' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('recursos')}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
          </svg>
          <span>Recursos</span>
        </Link>

        <Link
          to="/comofunciona"
          className={`bottom-nav-item ${abaAtiva === 'como' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('como')}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5v14l11-7L8 5Z" />
          </svg>
          <span>Tutorial</span>
        </Link>

        <Link
          to="/precos"
          className={`bottom-nav-item ${abaAtiva === 'precos' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('precos')}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 14.9V18h-2v-1.1c-1.7-.3-3-1.4-3-3h2c0 .8.8 1.3 2 1.3s2-.5 2-1.2c0-.8-.7-1.1-2.3-1.5-2-.5-3.7-1.2-3.7-3.2 0-1.6 1.2-2.7 3-3V6h2v1.1c1.6.3 2.7 1.3 2.8 2.9h-2c-.1-.7-.7-1.2-1.8-1.2s-1.8.4-1.8 1.1c0 .7.7 1 2.3 1.4 2 .5 3.7 1.2 3.7 3.3 0 1.7-1.3 2.9-3.2 3.3Z" />
          </svg>
          <span>Planos</span>
        </Link>

      </nav>
    </div>
  );
}

export default Home;