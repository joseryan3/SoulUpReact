import { useMemo, useState } from 'react';
import AdminLayout from './AdminLayout';
import { initialUsers, useAdminCollection } from './adminData';

function Usuarios() {
    const [usuarios, updateUsuarios] = useAdminCollection('users', initialUsers);
    const [busca, setBusca] = useState('');
    const [filtroStatus, setFiltroStatus] = useState('Todos');

    const usuariosFiltrados = useMemo(() => usuarios.filter((usuario) => {
        const termo = busca.trim().toLocaleLowerCase('pt-BR');
        const correspondeBusca = !termo
            || usuario.nome.toLocaleLowerCase('pt-BR').includes(termo)
            || usuario.email.toLocaleLowerCase('pt-BR').includes(termo);
        const correspondeStatus = filtroStatus === 'Todos' || usuario.status === filtroStatus;
        return correspondeBusca && correspondeStatus;
    }), [busca, filtroStatus, usuarios]);

    const alternarStatus = (id) => {
        updateUsuarios((atuais) => atuais.map((usuario) => (
            usuario.id === id
                ? { ...usuario, status: usuario.status === 'Ativo' ? 'Inativo' : 'Ativo' }
                : usuario
        )));
    };

    return (
        <AdminLayout
            title="Usuários"
            description="Consulte os cadastros e altere o estado das contas de demonstração."
        >
            <section className="admin-panel">
                <div className="admin-section-heading">
                    <div>
                        <h2>Contas cadastradas</h2>
                        <p>{usuariosFiltrados.length} de {usuarios.length} usuários</p>
                    </div>
                </div>

                <div className="admin-toolbar">
                    <input
                        className="admin-input"
                        type="search"
                        placeholder="Buscar por nome ou e-mail"
                        aria-label="Buscar usuários por nome ou e-mail"
                        value={busca}
                        onChange={(event) => setBusca(event.target.value)}
                    />
                    <select
                        className="admin-select"
                        aria-label="Filtrar usuários por status"
                        value={filtroStatus}
                        onChange={(event) => setFiltroStatus(event.target.value)}
                    >
                        <option>Todos</option>
                        <option>Ativo</option>
                        <option>Inativo</option>
                    </select>
                </div>

                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Usuário</th>
                                <th>E-mail</th>
                                <th>Cadastro</th>
                                <th>Status</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuariosFiltrados.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td>{usuario.nome}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.cadastro}</td>
                                    <td>
                                        <span className={`admin-badge${usuario.status === 'Ativo' ? ' is-good' : ''}`}>
                                            {usuario.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            className="admin-action"
                                            onClick={() => alternarStatus(usuario.id)}
                                        >
                                            {usuario.status === 'Ativo' ? 'Desativar' : 'Ativar'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {usuariosFiltrados.length === 0 && (
                        <p className="admin-empty-state">Nenhum usuário corresponde aos filtros.</p>
                    )}
                </div>
            </section>
        </AdminLayout>
    );
}

export default Usuarios;
