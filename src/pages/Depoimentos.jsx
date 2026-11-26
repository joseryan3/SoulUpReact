import './Depoimentos.css';

const testimonials = [
{
id: 1,
quote:
'A SoulUp transformou meus treinos. As correções de postura me ajudaram a evoluir muito mais rápido do que eu imaginava.',
name: 'Rafael Mendes',
role: 'Atleta de Crossfit',
initials: 'RM'
},
{
    id: 2,
    quote:
        'Identifiquei problemas na minha pisada que nenhum treinador tinha visto. Hoje corro sem dores no joelho.',
    name: 'Juliana Costa',
    role: 'Corredora amadora',
    initials: 'JC'
},

{
    id: 3,
    quote:
        'Uso com todos os meus alunos. A análise por IA é precisa e me dá argumentos visuais para corrigir movimentos.',
    name: 'Marcos Oliveira',
    role: 'Personal Trainer',
    initials: 'MO'
},

{
    id: 4,
    quote:
        'Plataforma intuitiva e relatórios claros. Recomendo para qualquer pessoa que leva o esporte a sério.',
    name: 'Camila Santos',
    role: 'Praticante de Pilates',
    initials: 'CS'
},

{
    id: 5,
    quote:
        'Melhorei minha amplitude de salto em poucas semanas seguindo as recomendações da IA. Resultado real.',
    name: 'André Lima',
    role: 'Jogador de Vôlei',
    initials: 'AL'
},

{
    id: 6,
    quote:
        'Aos 45 anos, retomei a competição com segurança graças à prevenção de lesões da plataforma.',
    name: 'Patricia Rocha',
    role: 'Atleta Master',
    initials: 'PR'
}


];

function Depoimentos() {


return (

    <main className="testimonials-page">

        {/* Hero */}
        <section className="testimonials-hero">

            <span>
                DEPOIMENTOS
            </span>

            <h1>
                Atletas que evoluíram com a SoulUp
            </h1>

            <p>
                Histórias reais de quem já transformou
                os treinos em resultados.
            </p>

        </section>

        {/* Cards */}
        <section className="testimonials-grid">

            {testimonials.map((item) => (

                <article
                    key={item.id}
                    className="testimonial-card"
                >

                    {/* Estrelas */}
                    <div className="rating">

                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>

                    </div>

                    {/* Depoimento */}
                    <p className="quote">

                        "{item.quote}"

                    </p>

                    {/* Footer */}
                    <div className="testimonial-footer">

                        {/* Avatar */}
                        <div className="avatar">

                            {item.initials}

                        </div>

                        {/* Dados */}
                        <div className="testimonial-user">

                            <strong>
                                {item.name}
                            </strong>

                            <span>
                                {item.role}
                            </span>

                        </div>

                    </div>

                </article>

            ))}

        </section>

    </main>

);

}

export default Depoimentos;
