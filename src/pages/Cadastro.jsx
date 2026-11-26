import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Cadastro.css';

import Logo from '../Assets/logo.png';
import { apiFetch, apiUrl } from '../services/api';

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

    const cadastrarComGoogle = () => {
        sessionStorage.setItem('oauthGooglePendente', 'true');
        window.location.assign(apiUrl('/oauth2/authorization/google'));
    };

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

                <div className="cadastro-divider"><span>ou</span></div>

                <button
                    type="button"
                    className="google-cadastro"
                    onClick={cadastrarComGoogle}
                    disabled={carregando}
                >
                    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                        <path fill="#4285F4" d="M17.64 9.2c0-.63-.06-1.23-.16-1.8H9v3.4h4.84a4.14 4.14 0 0 1-1.8 2.72v2.22h2.92c1.71-1.57 2.68-3.89 2.68-6.54Z" />
                        <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.22c-.81.54-1.84.86-3.04.86-2.35 0-4.33-1.58-5.04-3.71H.96v2.29A9 9 0 0 0 9 18Z" />
                        <path fill="#FBBC05" d="M3.96 10.75A5.41 5.41 0 0 1 3.68 9c0-.61.1-1.2.28-1.75V4.96H.96A9 9 0 0 0 0 9c0 1.45.35 2.82.96 4.04l3-2.29Z" />
                        <path fill="#EA4335" d="M9 3.54c1.32 0 2.5.45 3.43 1.34l2.58-2.58A8.65 8.65 0 0 0 9 0a9 9 0 0 0-8.04 4.96l3.01 2.29C4.67 5.12 6.65 3.54 9 3.54Z" />
                    </svg>
                    Cadastrar com Google
                </button>

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
