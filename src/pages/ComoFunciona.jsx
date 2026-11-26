import React from 'react';

import './ComoFunciona.css';

function ComoFunciona() {

const passos = [
    {
        id: 1,
        titulo: 'Envie seu vídeo',
        descricao: 'Grave seu treino e faça upload na plataforma.',
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 17h14v2H5zm7-12l-5 5h3v4h4v-4h3z"/>
            </svg>
        )
    },

    {
        id: 2,
        titulo: 'Análise detalhada',
        descricao: 'Nossa IA analisa cada movimento e identifica melhorias.',
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16a6.471 6.471 0 004.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C8.01 14 6 11.99 6 9.5S8.01 5 10.5 5 15 7.01 15 9.5 12.99 14 10.5 14z"/>
            </svg>
        )
    },

    {
        id: 3,
        titulo: 'Receba correções',
        descricao: 'Sugestões claras e visuais para corrigir sua técnica.',
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 16.17L4.83 12 3.41 13.41 9 19 21 7 19.59 5.59z"/>
            </svg>
        )
    },

    {
        id: 4,
        titulo: 'Evolua sempre',
        descricao: 'Aplique as correções e acompanhe sua evolução.',
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17 4V2H7v2H3v6c0 3.3 2.2 6.1 5.2 6.8L8 21h8l-.2-4.2C18.8 16.1 21 13.3 21 10V4h-4zm-6 2h2v3h-2V6zm-1 8.1c-2.3-.5-4-2.6-4-4.7V6h8v3.4c0 2.1-1.7 4.2-4 4.7z"/>
            </svg>
        )
    }
];

return (

    <main className="how-it-works">

        {/* Introdução */}
        <section className="how-it-works__intro">

            <span className="label">
                COMO FUNCIONA
            </span>

            <h1>

                Simples de usar,

                {' '}

                <span>
                    poderoso nos resultados
                </span>

            </h1>

        </section>

        {/* Passos */}
        <section className="steps">

            {passos.map((passo) => (

                <article
                    key={passo.id}
                    className="step"
                >

                    {/* Ícone */}
                    <div className="step__icon">
                        {passo.icon}
                    </div>

                    {/* Número */}
                    <div className="step__bubble">
                        {passo.id}
                    </div>

                    {/* Título */}
                    <h2>
                        {passo.titulo}
                    </h2>

                    {/* Descrição */}
                    <p>
                        {passo.descricao}
                    </p>

                </article>

            ))}

        </section>

    </main>
);


}

export default ComoFunciona;
