import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Cadastro.css';

import Logo from '../Assets/logo.png';
import { apiFetch } from '../services/api';

function Cadastro() {


    // ========================================
    // ESTADOS
    // ========================================

    const [nome, setNome] = useState('');

    const [email, setEmail] = useState('');

    const [senha, setSenha] = useState('');

    const [erro, setErro] = useState('');

    const [sucesso, setSucesso] = useState('');

    const [carregando, setCarregando] = useState(false);

    const navigate = useNavigate();

    const requisitosSenha = [
        {
            texto: 'Mínimo de 8 caracteres',
            valido: senha.length >= 8
        },
        {
            texto: 'Uma letra maiúscula',
            valido: /[A-Z]/.test(senha)
        },
        {
            texto: 'Uma letra minúscula',
            valido: /[a-z]/.test(senha)
        },
        {
            texto: 'Um número',
            valido: /\d/.test(senha)
        },
        {
            texto: 'Um caractere especial',
            valido: /[^A-Za-z0-9]/.test(senha)
        }
    ];

    const senhaValida = requisitosSenha.every((requisito) => requisito.valido);

    // ========================================
    // CADASTRO
    // ========================================

    const handleCadastro = async (e) => {

        e.preventDefault();

        // Limpa mensagens
        setErro('');
        setSucesso('');

        // Validação simples
        if (!nome || !email || !senha) {

            setErro(
                'Preencha todos os campos.'
            );

            return;
        }

        if (!senhaValida) {

            setErro(
                'A senha não atende a todos os requisitos.'
            );

            return;
        }

        setCarregando(true);

        const dadosUsuario = {

            nome,
            email,
            senha
        };

        try {

            const response = await apiFetch(
                '/api/usuarios/register',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify(
                        dadosUsuario
                    )
                }
            );

            // ========================================
            // ERRO
            // ========================================

            if (!response.ok) {

                // lê resposta UMA vez só
                const mensagemErro =
                    await response.text();

                throw new Error(
                    mensagemErro ||
                    'Erro ao criar conta.'
                );
            }

            // ========================================
            // SUCESSO
            // ========================================

            const mensagemSucesso =
                await response.text();

            setSucesso(
                mensagemSucesso ||
                'Conta criada com sucesso!'
            );

            // Limpa formulário
            setNome('');
            setEmail('');
            setSenha('');

            // Redireciona
            setTimeout(() => {

                navigate('/login');

            }, 2000);

        } catch (err) {

            console.error(
                'Erro no cadastro:',
                err
            );

            setErro(
                err.message ||
                'Erro ao conectar com o servidor.'
            );

        } finally {

            setCarregando(false);
        }
    };

    // ========================================
    // JSX
    // ========================================

    return (

        <div className="auth-page">

            <div className="auth-card">

                <img
                    src={Logo}
                    alt="SoulUp"
                    className="auth-logo"
                />

                <h1>
                    Criar conta
                </h1>

                <p>
                    Comece sua jornada de evolução
                </p>

                {/* ERRO */}
                {erro && (

                    <div
                        className="error-message"
                        style={{
                            color: 'red',
                            marginBottom: '15px'
                        }}
                    >
                        {erro}
                    </div>
                )}

                {/* SUCESSO */}
                {sucesso && (

                    <div
                        style={{
                            color: 'green',
                            marginBottom: '15px'
                        }}
                    >
                        {sucesso}
                    </div>
                )}

                <form
                    className="auth-form"
                    onSubmit={handleCadastro}
                >

                    {/* NOME */}
                    <label htmlFor="nome">
                        Nome
                    </label>

                    <input
                        id="nome"
                        type="text"
                        placeholder="Seu nome"
                        value={nome}
                        onChange={(e) =>
                            setNome(e.target.value)
                        }
                        required
                    />

                    {/* EMAIL */}
                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    {/* SENHA */}
                    <label htmlFor="senha">
                        Senha
                    </label>

                    <input
                        id="senha"
                        type="password"
                        placeholder="Digite sua senha"
                        value={senha}
                        onChange={(e) =>
                            setSenha(e.target.value)
                        }
                        required
                    />

                    <div className="password-requisitos" aria-live="polite">
                        <p>Requisitos da senha:</p>
                        <ul>
                            {requisitosSenha.map((requisito) => (
                                <li
                                    key={requisito.texto}
                                    className={requisito.valido ? 'valido' : ''}
                                >
                                    <span aria-hidden="true">
                                        {requisito.valido ? '✓' : '○'}
                                    </span>
                                    {' '}{requisito.texto}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* BOTÃO */}
                    <button
                        type="submit"
                        className="primary-button"
                        disabled={carregando}
                    >
                        {carregando
                            ? 'Criando conta...'
                            : 'Criar conta'}
                    </button>

                </form>

                <p className="auth-footer">

                    Já tem conta?

                    {' '}

                    <Link to="/login">
                        Entrar
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Cadastro;
