import './Precos.css';

import { Link } from 'react-router-dom';

function Precos() {

// Verifica usuário logado
const usuarioLogado =
    JSON.parse(
        localStorage.getItem('usuarioLogado')
    );

return (

    <main className="pricing-page">

        {/* Hero */}
        <section className="pricing-hero">

            <span>
                PREÇOS
            </span>

            <h1>
                Planos para cada jornada esportiva
            </h1>

            <p>
                Comece grátis e evolua junto
                com sua performance.
                Cancele quando quiser.
            </p>

        </section>

        {/* Cards */}
        <section className="pricing-grid">

            {/* Starter */}
            <article className="pricing-card starter-card">

                <h2>
                    Starter
                </h2>

                <p>
                    Perfeito para começar
                    a entender sua técnica.
                </p>

                <div className="price-block">

                    <span className="price">
                        Grátis
                    </span>

                    <span className="price-suffix">
                        para sempre
                    </span>

                </div>

                <ul>

                    <li>
                        3 análises de vídeo por mês
                    </li>

                    <li>
                        Métricas básicas de movimento
                    </li>

                    <li>
                        Histórico dos últimos 30 dias
                    </li>

                    <li>
                        Suporte por e-mail
                    </li>

                </ul>

                <Link
                    to={
                        usuarioLogado
                            ? '/historico'
                            : '/cadastro'
                    }
                    className="secondary-button"
                >

                    {usuarioLogado
                        ? 'Ir para o App'
                        : 'Começar agora'}

                </Link>

            </article>

            {/* Pro */}
            <article className="pricing-card pro-card">

                <div className="badge">

                    Mais popular

                </div>

                <h2>
                    Pro
                </h2>

                <p>
                    Para atletas que treinam
                    com frequência.
                </p>

                <div className="price-block">

                    <span className="price">
                        R$ 49
                    </span>

                    <span className="price-suffix">
                        /mês
                    </span>

                </div>

                <ul>

                    <li>
                        Análises ilimitadas
                        de vídeo
                    </li>

                    <li>
                        Métricas avançadas
                        de movimento
                    </li>

                    <li>
                        Comparativo de evolução
                    </li>

                    <li>
                        Relatórios exportáveis
                        em PDF
                    </li>

                    <li>
                        Suporte prioritário
                    </li>

                </ul>

                <Link
                    to={
                        usuarioLogado
                            ? '/perfil/upgrade'
                            : '/cadastro'
                    }
                    className="primary-button"
                >

                    Assinar Pro

                </Link>

            </article>

            {/* Coach */}
            <article className="pricing-card coach-card">

                <h2>
                    Coach
                </h2>

                <p>
                    Para treinadores
                    e equipes profissionais.
                </p>

                <div className="price-block">

                    <span className="price">
                        R$ 149
                    </span>

                    <span className="price-suffix">
                        /mês
                    </span>

                </div>

                <ul>

                    <li>
                        Tudo do Pro
                    </li>

                    <li>
                        Até 30 atletas gerenciados
                    </li>

                    <li>
                        Dashboard de equipe
                    </li>

                    <li>
                        Comparativo entre atletas
                    </li>

                    <li>
                        API para integração
                    </li>

                    <li>
                        Gerente de conta dedicado
                    </li>

                </ul>

                <a
                    href="mailto:contato@soulup.com?subject=Interesse no Plano Coach"
                    className="secondary-button"
                    style={{
                        textDecoration: 'none',
                        textAlign: 'center'
                    }}
                >

                    Falar com vendas

                </a>

            </article>

        </section>

    </main>
);


}

export default Precos;
