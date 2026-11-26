import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { initialTickets, initialUsers, initialVideos, useAdminCollection } from './adminData';

function VisaoGeral() {
    const [usuarios] = useAdminCollection('users', initialUsers);
    const [videos] = useAdminCollection('videos', initialVideos);
    const [chamados] = useAdminCollection('tickets', initialTickets);

    const metricas = [
        { label: 'Usuários cadastrados', value: usuarios.length, detail: `${usuarios.filter((item) => item.status === 'Ativo').length} ativos`, to: '/admin/usuarios' },
        { label: 'Vídeos analisados', value: videos.length, detail: `${videos.filter((item) => item.status === 'Em análise').length} em análise`, to: '/admin/videos' },
        { label: 'Chamados abertos', value: chamados.filter((item) => item.status !== 'Resolvido').length, detail: 'Acompanhe as solicitações', to: '/admin/suporte' },
        { label: 'Análises concluídas', value: videos.filter((item) => item.status === 'Concluído').length, detail: 'Vídeos com processamento finalizado', to: '/admin/videos' }
    ];

    return (
        <AdminLayout
            title="Visão geral"
            description="Acompanhe os principais indicadores e acesse rapidamente as áreas da plataforma."
        >
            <section className="admin-stats-grid" aria-label="Indicadores administrativos">
                {metricas.map((metrica) => (
                    <Link className="admin-stat-card" to={metrica.to} key={metrica.label}>
                        <span className="admin-stat-label">{metrica.label}</span>
                        <strong className="admin-stat-value">{metrica.value}</strong>
                        <span className="admin-stat-detail">{metrica.detail}</span>
                    </Link>
                ))}
            </section>

            <section className="admin-panel">
                <div className="admin-section-heading">
                    <div>
                        <h2>Atividade recente</h2>
                        <p>Resumo dos registros que precisam de acompanhamento.</p>
                    </div>
                </div>
                <div className="admin-activity-list">
                    <div className="admin-activity-item">
                        <span className="admin-activity-dot" aria-hidden="true" />
                        <span>{videos.filter((video) => video.status === 'Em análise').length} vídeo(s) aguardando revisão.</span>
                    </div>
                    <div className="admin-activity-item">
                        <span className="admin-activity-dot" aria-hidden="true" />
                        <span>{chamados.filter((chamado) => chamado.status !== 'Resolvido').length} chamado(s) ainda não resolvidos.</span>
                    </div>
                    <div className="admin-activity-item">
                        <span className="admin-activity-dot" aria-hidden="true" />
                        <span>{usuarios.filter((usuario) => usuario.status === 'Ativo').length} conta(s) ativa(s) no cadastro de demonstração.</span>
                    </div>
                </div>
                <div className="admin-quick-links" aria-label="Ações rápidas">
                    <Link className="admin-action" to="/admin/usuarios">Gerenciar usuários</Link>
                    <Link className="admin-action" to="/admin/videos">Revisar vídeos</Link>
                    <Link className="admin-action" to="/admin/suporte">Atender suporte</Link>
                </div>
            </section>
        </AdminLayout>
    );
}

export default VisaoGeral;
