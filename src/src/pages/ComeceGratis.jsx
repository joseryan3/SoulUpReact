import React from 'react';
import { Link } from 'react-router-dom';

import './ComeceGratis.css';

function ComeceGratis() {
return (

    <main className="hero">

        <div className="hero__container">

            {/* Badge de destaque */}
            <Link
                to="/cadastro"
                className="hero__badge"
            >
                Comece grátis
            </Link>

            {/* Título principal */}
            <h1 className="hero__title">

                Pronto para transformar sua

                {' '}

                <span className="hero__highlight">
                    performance esportiva
                </span>

                ?

            </h1>

            {/* Subtítulo */}
            <p className="hero__subtitle">

                Junte-se a milhares de atletas
                que já estão evoluindo com a SoulUp.

                Seu próximo nível começa aqui.

            </p>

            {/* Botão principal */}
            <Link
                to="/cadastro"
                className="hero__button"
            >

                Começar agora — é grátis

                <span aria-hidden="true">
                    →
                </span>

            </Link>

        </div>

    </main>

);

}

export default ComeceGratis;
