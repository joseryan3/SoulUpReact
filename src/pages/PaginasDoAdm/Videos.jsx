import { useMemo, useState } from 'react';
import AdminLayout from './AdminLayout';
import { initialVideos, useAdminCollection } from './adminData';

function Videos() {
    const [videos, updateVideos] = useAdminCollection('videos', initialVideos);
    const [busca, setBusca] = useState('');
    const [filtroStatus, setFiltroStatus] = useState('Todos');

    const videosFiltrados = useMemo(() => videos.filter((video) => {
        const termo = busca.trim().toLocaleLowerCase('pt-BR');
        const correspondeBusca = !termo
            || video.usuario.toLocaleLowerCase('pt-BR').includes(termo)
            || video.exercicio.toLocaleLowerCase('pt-BR').includes(termo);
        const correspondeStatus = filtroStatus === 'Todos' || video.status === filtroStatus;
        return correspondeBusca && correspondeStatus;
    }), [busca, filtroStatus, videos]);

    const concluirRevisao = (id) => {
        updateVideos((atuais) => atuais.map((video) => (
            video.id === id ? { ...video, status: 'Concluído' } : video
        )));
    };

    return (
        <AdminLayout
            title="Vídeos"
            description="Acompanhe a fila de processamento e revise os vídeos enviados."
        >
            <section className="admin-panel">
                <div className="admin-section-heading">
                    <div>
                        <h2>Fila de vídeos</h2>
                        <p>{videos.filter((video) => video.status === 'Em análise').length} aguardando revisão · {videos.length} no total</p>
                    </div>
                </div>

                <div className="admin-toolbar">
                    <input
                        className="admin-input"
                        type="search"
                        placeholder="Buscar por usuário ou exercício"
                        aria-label="Buscar vídeos por usuário ou exercício"
                        value={busca}
                        onChange={(event) => setBusca(event.target.value)}
                    />
                    <select
                        className="admin-select"
                        aria-label="Filtrar vídeos por status"
                        value={filtroStatus}
                        onChange={(event) => setFiltroStatus(event.target.value)}
                    >
                        <option>Todos</option>
                        <option>Em análise</option>
                        <option>Concluído</option>
                    </select>
                </div>

                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Usuário</th>
                                <th>Exercício</th>
                                <th>Envio</th>
                                <th>Status</th>
                                <th>Precisão</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {videosFiltrados.map((video) => (
                                <tr key={video.id}>
                                    <td>{video.usuario}</td>
                                    <td>{video.exercicio}</td>
                                    <td>{video.data}</td>
                                    <td>
                                        <span className={`admin-badge${video.status === 'Concluído' ? ' is-good' : ' is-pending'}`}>
                                            {video.status}
                                        </span>
                                    </td>
                                    <td>{video.precisao}</td>
                                    <td>
                                        {video.status === 'Em análise' ? (
                                            <button
                                                type="button"
                                                className="admin-action"
                                                onClick={() => concluirRevisao(video.id)}
                                            >
                                                Marcar concluído
                                            </button>
                                        ) : <span className="admin-badge">Revisado</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {videosFiltrados.length === 0 && (
                        <p className="admin-empty-state">Nenhum vídeo corresponde aos filtros.</p>
                    )}
                </div>
            </section>
        </AdminLayout>
    );
}

export default Videos;
