import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { initialTickets, useAdminCollection } from './adminData';

function Suporte() {
    const [chamados, updateChamados] = useAdminCollection('tickets', initialTickets);
    const [filtroStatus, setFiltroStatus] = useState('Todos');
    const [resposta, setResposta] = useState('');
    const [idSelecionado, setIdSelecionado] = useState(initialTickets[0]?.id ?? null);

    const chamadosFiltrados = chamados.filter((chamado) => (
        filtroStatus === 'Todos' || chamado.status === filtroStatus
    ));
    const chamadoSelecionado = chamadosFiltrados.find((chamado) => chamado.id === idSelecionado)
        || chamadosFiltrados[0];

    const enviarResposta = (event) => {
        event.preventDefault();
        const texto = resposta.trim();
        if (!texto || !chamadoSelecionado) return;

        updateChamados((atuais) => atuais.map((chamado) => (
            chamado.id === chamadoSelecionado.id
                ? {
                    ...chamado,
                    status: chamado.status === 'Resolvido' ? 'Em andamento' : chamado.status,
                    mensagens: [...chamado.mensagens, { texto, data: new Date().toLocaleString('pt-BR') }]
                }
                : chamado
        )));
        setResposta('');
    };

    const atualizarStatus = (event) => {
        const status = event.target.value;
        if (!chamadoSelecionado) return;
        updateChamados((atuais) => atuais.map((chamado) => (
            chamado.id === chamadoSelecionado.id ? { ...chamado, status } : chamado
        )));
    };

    return (
        <AdminLayout
            title="Suporte"
            description="Organize as solicitações e registre respostas nos chamados de exemplo."
        >
            <div className="admin-toolbar">
                <select
                    className="admin-select"
                    aria-label="Filtrar chamados por status"
                    value={filtroStatus}
                    onChange={(event) => setFiltroStatus(event.target.value)}
                >
                    <option>Todos</option>
                    <option>Aberto</option>
                    <option>Em andamento</option>
                    <option>Resolvido</option>
                </select>
            </div>

            <section className="admin-support-grid">
                <div className="admin-panel">
                    <div className="admin-section-heading">
                        <div>
                            <h2>Chamados</h2>
                            <p>{chamadosFiltrados.length} solicitação(ões)</p>
                        </div>
                    </div>
                    <div className="admin-ticket-list">
                        {chamadosFiltrados.map((chamado) => (
                            <button
                                type="button"
                                key={chamado.id}
                                className={`admin-ticket-item${chamado.id === idSelecionado ? ' selected' : ''}`}
                                onClick={() => setIdSelecionado(chamado.id)}
                            >
                                <strong>{chamado.assunto}</strong>
                                <span>{chamado.usuario} · {chamado.data}</span>
                                <span>{chamado.status} · Prioridade {chamado.prioridade.toLowerCase()}</span>
                            </button>
                        ))}
                        {chamadosFiltrados.length === 0 && (
                            <p className="admin-empty-state">Nenhum chamado neste status.</p>
                        )}
                    </div>
                </div>

                <section className="admin-panel admin-ticket-detail" aria-live="polite">
                    {chamadoSelecionado ? (
                        <>
                            <div className="admin-section-heading">
                                <div>
                                    <h2>{chamadoSelecionado.assunto}</h2>
                                    <p>{chamadoSelecionado.usuario} · {chamadoSelecionado.categoria}</p>
                                </div>
                            </div>

                            <div className="admin-ticket-meta">
                                <span className={`admin-badge${chamadoSelecionado.prioridade === 'Alta' ? ' is-pending' : ''}`}>
                                    Prioridade {chamadoSelecionado.prioridade.toLowerCase()}
                                </span>
                                <span className={`admin-badge${chamadoSelecionado.status === 'Resolvido' ? ' is-good' : ' is-pending'}`}>
                                    {chamadoSelecionado.status}
                                </span>
                            </div>

                            <p className="admin-ticket-message">
                                Olá, preciso de ajuda com: {chamadoSelecionado.assunto.toLocaleLowerCase('pt-BR')}.
                            </p>

                            {chamadoSelecionado.mensagens.map((mensagem, index) => (
                                <p className="admin-ticket-message" key={`${chamadoSelecionado.id}-${index}`}>
                                    <strong>Resposta da equipe · {mensagem.data}:</strong> {mensagem.texto}
                                </p>
                            ))}

                            <form className="admin-reply-form" onSubmit={enviarResposta}>
                                <label htmlFor="resposta-suporte">Resposta</label>
                                <textarea
                                    id="resposta-suporte"
                                    className="admin-textarea"
                                    placeholder="Escreva uma resposta para este chamado..."
                                    value={resposta}
                                    onChange={(event) => setResposta(event.target.value)}
                                />
                                <div className="admin-reply-footer">
                                    <select
                                        className="admin-select admin-reply-status"
                                        aria-label="Atualizar status do chamado"
                                        value={chamadoSelecionado.status}
                                        onChange={atualizarStatus}
                                    >
                                        <option>Aberto</option>
                                        <option>Em andamento</option>
                                        <option>Resolvido</option>
                                    </select>
                                    <button className="admin-primary-button" type="submit" disabled={!resposta.trim()}>
                                        Registrar resposta
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <p className="admin-empty-state">Selecione um chamado para consultar os detalhes.</p>
                    )}
                </section>
            </section>
        </AdminLayout>
    );
}

export default Suporte;
