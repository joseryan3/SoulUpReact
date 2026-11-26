import '../pages/style.css';

import Logo from '../Assets/logo.png';

import { Link } from 'react-router-dom';

// Componentes
import ComoFunciona from './ComoFunciona';
import Depoimentos from './Depoimentos';

function Home() {


return (

    <div className="home-page">

        {/* Header */}
        <header className="site-header">

            {/* Logo */}
            <div className="brand">

                <img
                    src={Logo}
                    alt="SoulUp"
                    className="brand-logo"
                />

                <span>
                    SoulUp
                </span>

            </div>

            {/* Navegação */}
            <nav className="site-nav">

                <Link to="/recursos">
                    Recursos
                </Link>

                <Link to="/comofunciona">
                    Como funciona
                </Link>

                <Link to="/depoimentos">
                    Depoimentos
                </Link>

                <Link to="/precos">
                    Preços
                </Link>

            </nav>

            {/* Ações */}
            <div className="header-actions">

                <Link
                    to="/login"
                    className="nav-link secondary"
                >
                    Entrar
                </Link>

                <Link
                    to="/cadastro"
                    className="nav-button"
                >
                    Cadastre-se
                </Link>

            </div>

        </header>

        {/* Hero */}
        <main className="hero-section">

            {/* Texto */}
            <section className="hero-copy">

                <span className="hero-label">

                    Correção inteligente de movimentos

                </span>

                <h1>

                    Eleve sua

                    {' '}

                    <span className="text-cyan">
                        performance
                    </span>

                    <br />

                    com correções

                    {' '}

                    <span className="text-orange">
                        precisas
                    </span>

                </h1>

                <p>

                    Envie seus vídeos de treino
                    e receba sugestões personalizadas
                    para corrigir movimentos,
                    evitar lesões e otimizar
                    seus resultados com inteligência artificial.

                </p>

                {/* CTA */}
                <Link
                    to="/cadastro"
                    className="hero-cta"
                >

                    Começar Agora

                    <span aria-hidden="true">
                        →
                    </span>

                </Link>

            </section>

            {/* Visual */}
            <section className="hero-visual">

                <div className="hero-card">

                    <img
                        src={Logo}
                        alt="Logo SoulUp"
                        className="hero-logo"
                    />

                </div>

            </section>

        </main>

        {/* Como funciona */}
        <section id="como-funciona">

            <ComoFunciona />

        </section>

        {/* Depoimentos */}
        <section id="depoimentos">

            <Depoimentos />

        </section>

    </div>
);

}

export default Home;
