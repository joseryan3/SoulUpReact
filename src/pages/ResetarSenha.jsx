import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './ResetarSenha.css';
import Logo from '../Assets/logo.png';
import { apiFetch, readApiError } from '../services/api';

function ResetarSenha() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [email, setEmail] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [mensagemSucesso, setMensagemSucesso] = useState('');
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);

    const handleReset = async (event) => {
        event.preventDefault();
        setErro('');
        setMensagemSucesso('');

        if (!token && !email.trim()) {
            setErro('Digite um e-mail válido.');
            return;
        }

        if (token && !novaSenha) {
            setErro('Digite a nova senha.');
            return;
        }

        setCarregando(true);
        try {
            const response = await apiFetch(token ? '/api/senha/resetar' : '/api/senha/recuperar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(token ? { token, newPassword: novaSenha } : { email: email.trim() })
            });

            if (!response.ok) {
                throw new Error(await readApiError(response, 'Não foi possível concluir a solicitação.'));
            }

            setMensagemSucesso(token
                ? 'Senha alterada com sucesso. Agora você pode entrar.'
                : 'Se este e-mail estiver cadastrado, um link de redefinição foi enviado.');
            setEmail('');
            setNovaSenha('');
        } catch (error) {
            setErro(error.message || 'Não foi possível conectar ao servidor.');
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card reset-card">
                <img src={Logo} alt="SoulUp" className="auth-logo" />
                <h1>{token ? 'Escolha uma nova senha' : 'Redefinir senha'}</h1>
                <p>{token
                    ? 'Use ao menos oito caracteres, incluindo maiúscula, minúscula, número e caractere especial.'
                    : 'Enviaremos um link para redefinir sua senha.'}</p>
                {mensagemSucesso && <div className="success-message">{mensagemSucesso}</div>}
                {erro && <div className="error-message">{erro}</div>}
                <form className="auth-form" onSubmit={handleReset}>
                    {!token && <>
                        <label htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            disabled={carregando}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </>}
                    {token && <>
                        <label htmlFor="novaSenha">Nova senha</label>
                        <input
                            id="novaSenha"
                            type="password"
                            required
                            minLength="8"
                            value={novaSenha}
                            disabled={carregando}
                            onChange={(event) => setNovaSenha(event.target.value)}
                        />
                    </>}
                    <button type="submit" className="primary-button" disabled={carregando}>
                        {carregando ? 'Enviando...' : token ? 'Alterar senha' : 'Enviar link'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetarSenha;
