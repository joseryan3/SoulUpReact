import { useState } from 'react';

import { Link } from 'react-router-dom';

import './ResetarSenha.css';

import Logo from '../Assets/logo.png';
import { apiFetch } from '../services/api';

function ResetarSenha() {


// Estados
const [email, setEmail] = useState('');

const [mensagemSucesso, setMensagemSucesso] =
    useState('');

const [erro, setErro] = useState('');

const [carregando, setCarregando] =
    useState(false);

// Função reset senha
const handleReset = async (e) => {

    e.preventDefault();

    // Limpa mensagens
    setErro('');
    setMensagemSucesso('');

    // Validação simples
    if (!email) {

        setErro(
            'Digite um email válido.'
        );

        return;
    }

    setCarregando(true);

    try {

        const response = await apiFetch(
            '/api/senha/recuperar',
            {
                method: 'POST',

                headers: {
                    'Content-Type':
                        'application/json'
                },

                body: JSON.stringify({
                    email
                })
            }
        );

        // Verifica erro HTTP
        if (!response.ok) {

            let mensagemErro =
                'Não foi possível enviar o link.';

            try {

                const erroJson =
                    await response.json();

                mensagemErro =
                    erroJson.message ||
                    mensagemErro;

            } catch {

                const erroTexto =
                    await response.text();

                if (erroTexto) {

                    mensagemErro =
                        erroTexto;
                }
            }

            throw new Error(mensagemErro);
        }

        // Sucesso
        setMensagemSucesso(
            'Se este email estiver cadastrado, um link de redefinição foi enviado.'
        );

        // Limpa input
        setEmail('');

    } catch (err) {

        console.error(
            'Erro ao redefinir senha:',
            err
        );

        setErro(
            err.message ||
            'Erro ao conectar ao servidor.'
        );

    } finally {

        setCarregando(false);
    }
};

return (

    <div className="auth-page">

        <div className="auth-card reset-card">

            {/* Logo */}
            <img
                src={Logo}
                alt="SoulUp"
                className="auth-logo"
            />

            {/* Título */}
            <h1>
                Redefinir senha
            </h1>

            <p>
                Enviaremos um link
                para redefinir sua senha.
            </p>

            {/* Mensagem sucesso */}
            {mensagemSucesso && (

                <div
                    className="success-message"
                    style={{
                        color: '#00c37d',
                        marginBottom: '15px',
                        fontWeight: 600
                    }}
                >

                    {mensagemSucesso}

                </div>

            )}

            {/* Mensagem erro */}
            {erro && (

                <div
                    className="error-message"
                    style={{
                        color: 'red',
                        marginBottom: '15px',
                        fontWeight: 600
                    }}
                >

                    {erro}

                </div>

            )}

            {/* Form */}
            <form
                className="auth-form"
                onSubmit={handleReset}
            >

                <label htmlFor="email">

                    Email

                </label>

                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                    value={email}
                    disabled={carregando}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <button
                    type="submit"
                    className="primary-button"
                    disabled={carregando}
                >

                    {carregando
                        ? 'Enviando...'
                        : 'Enviar link'}

                </button>

            </form>

            {/* Voltar */}
            <Link
                to="/login"
                className="auth-link"
            >

                ← Voltar ao login

            </Link>

        </div>

    </div>
);


}

export default ResetarSenha;
