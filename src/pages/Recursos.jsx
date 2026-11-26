import React from 'react';

import './Recursos.css';

function Recursos() {

const recursos = [
    {
        id: 1,
        icon: '🎥',
        title: 'Análise de Vídeo',
        description:
            'Envie seus vídeos de treino e receba feedback detalhado sobre cada movimento.',
        className: 'feature-video'
    },

    {
        id: 2,
        icon: '🧠',
        title: 'IA Inteligente',
        description:
            'Algoritmos avançados identificam padrões e sugerem correções personalizadas.',
        className: 'feature-ai'
    },

    {
        id: 3,
        icon: '📈',
        title: 'Evolução Contínua',
        description:
            'Acompanhe seu progresso ao longo do tempo com métricas claras e objetivas.',
        className: 'feature-growth'
    },

    {
        id: 4,
        icon: '🛡️',
        title: 'Prevenção de Lesões',
        description:
            'Identifique movimentos incorretos antes que causem problemas físicos.',
        className: 'feature-safety'
    },

    {
        id: 5,
        icon: '👥',
        title: 'Para Todos os Níveis',
        description:
            'Do iniciante ao profissional, correções adaptadas ao seu nível de experiência.',
        className: 'feature-levels'
    },

    {
        id: 6,
        icon: '⚡',
        title: 'Resultados Rápidos',
        description:
            'Veja melhorias significativas na sua performance em poucas semanas.',
        className: 'feature-fast'
    }
];

return (

    <main className="page">

        {/* Hero */}
        <section className="hero">

            <span className="eyebrow">
                RECURSOS
            </span>

            <h1>

                Tudo que você precisa para

                {' '}

                <span>
                    evoluir
                </span>

            </h1>

            <p>

                Ferramentas inteligentes
                para autogestão do seu treino
                e desenvolvimento esportivo.

            </p>

        </section>

        {/* Grid */}
        <section className="features-grid">

            {recursos.map((recurso) => (

                <article
                    key={recurso.id}
                    className={`feature-card ${recurso.className}`}
                >

                    {/* Ícone */}
                    <div className="icon">

                        {recurso.icon}

                    </div>

                    {/* Título */}
                    <h2>

                        {recurso.title}

                    </h2>

                    {/* Descrição */}
                    <p>

                        {recurso.description}

                    </p>

                </article>

            ))}

        </section>

    </main>

);

}

export default Recursos;
