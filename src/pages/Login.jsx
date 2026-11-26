import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './styleLogin.css';
import Logo from '../Assets/logo.png';
import { apiFetch, apiUrl, readApiError } from '../services/api';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const destinoAposLogin = location.state?.from?.pathname || '/upload';

    useEffect(() => {
        const usuarioSalvoRaw = localStorage.getItem('usuarioLogado');
        if (usuarioSalvoRaw) {
            try {
                const usuarioSalvo = JSON.parse(usuarioSalvoRaw);
                const destino = usuarioSalvo?.tipo === 'ADMIN' ? '/admin' : destinoAposLogin;
                navigate(destino, { replace: true });
                return;
            } catch {
                localStorage.removeItem('usuarioLogado');
            }
        }

        const oauthPendente = sessionStorage.getItem('oauthGooglePendente') === 'true';
        if (!oauthPendente) return;

        let ativo = true;

        const confirmarSessaoGoogle = async () => {
            try {
                const response = await apiFetch('/api/me');
                if (!response.ok || !ativo) {
                    sessionStorage.removeItem('oauthGooglePendente');
                    return;
                }

                const usuario = await response.json();
                localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
                sessionStorage.removeItem('oauthGooglePendente');
                onLogin?.(usuario);

                const destino = usuario?.tipo === 'ADMIN' ? '/admin' : destinoAposLogin;
                navigate(destino, { replace: true });
            } catch {
                sessionStorage.removeItem('oauthGooglePendente');
            }
        };

        confirmarSessaoGoogle();

        return () => {
            ativo = false;
        };
    }, [destinoAposLogin, navigate, onLogin]);

    const entrarComGoogle = () => {
        sessionStorage.setItem('oauthGooglePendente', 'true');
        window.location.assign(apiUrl('/oauth2/authorization/google'));
    };

    const autenticar = async (event) => {
        event.preventDefault();
        setErro('');

        if (!email.trim() || !senha) {
            setErro('Preencha e-mail e senha.');
            return;
        }

        setCarregando(true);

        try {
            const response = await apiFetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim(), senha })
            });

            if (!response.ok) {
                throw new Error(await readApiError(response, 'Usuário ou senha inválidos.'));
            }

            const usuario = await response.json();
            localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
            onLogin?.(usuario);

            const destinoFinal = usuario?.tipo === 'ADMIN' ? '/admin' : destinoAposLogin;
            navigate(destinoFinal, { replace: true });
        } catch (error) {
            setErro(error.message || 'Não foi possível conectar ao servidor.');
        } finally {
            setCarregando(false);
        }
    };

    return (
        <main className="login-page">
            <Container maxWidth="sm" disableGutters>
                <Paper
                    component="form"
                    onSubmit={autenticar}
                    elevation={0}
                    className="login-card"
                >
                    <header className="login-header">
                        <img src={Logo} alt="SoulUp" className="login-logo" />
                        <Typography component="h1" variant="h5" className="login-title">
                            Entrar no SoulUp
                        </Typography>
                        <Typography variant="body2" className="login-subtitle">
                            Acesse sua conta para continuar
                        </Typography>
                    </header>

                    <Box className="login-form">
                        <TextField
                            label="E-mail"
                            type="email"
                            fullWidth
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            disabled={carregando}
                            autoComplete="email"
                        />

                        <TextField
                            label="Senha"
                            type={mostrarSenha ? 'text' : 'password'}
                            fullWidth
                            required
                            value={senha}
                            onChange={(event) => setSenha(event.target.value)}
                            disabled={carregando}
                            autoComplete="current-password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            type="button"
                                            onClick={() => setMostrarSenha((valor) => !valor)}
                                            aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                                            edge="end"
                                        >
                                            {mostrarSenha ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <Box className="login-options">
                            <Link to="/resetarsenha" className="login-forgot">
                                Esqueceu a senha?
                            </Link>
                        </Box>

                        {erro && (
                            <Typography role="alert" className="login-error">
                                {erro}
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            disabled={carregando}
                            className="login-submit"
                        >
                            {carregando ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : 'Entrar'}
                        </Button>

                        <Box className="login-divider"><span>ou</span></Box>

                        <Button
                            type="button"
                            variant="outlined"
                            size="large"
                            fullWidth
                            disabled={carregando}
                            className="google-login"
                            onClick={entrarComGoogle}
                            startIcon={
                                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                                    <path fill="#4285F4" d="M17.64 9.2c0-.63-.06-1.23-.16-1.8H9v3.4h4.84a4.14 4.14 0 0 1-1.8 2.72v2.22h2.92c1.71-1.57 2.68-3.89 2.68-6.54Z" />
                                    <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.22c-.81.54-1.84.86-3.04.86-2.35 0-4.33-1.58-5.04-3.71H.96v2.29A9 9 0 0 0 9 18Z" />
                                    <path fill="#FBBC05" d="M3.96 10.75A5.41 5.41 0 0 1 3.68 9c0-.61.1-1.2.28-1.75V4.96H.96A9 9 0 0 0 0 9c0 1.45.35 2.82.96 4.04l3-2.29Z" />
                                    <path fill="#EA4335" d="M9 3.54c1.32 0 2.5.45 3.43 1.34l2.58-2.58A8.65 8.65 0 0 0 9 0a9 9 0 0 0-8.04 4.96l3.01 2.29C4.67 5.12 6.65 3.54 9 3.54Z" />
                                </svg>
                            }
                        >
                            Entrar com Google
                        </Button>
                    </Box>

                    <Box className="login-footer">
                        <Typography variant="body2">
                            Não tem conta?{' '}
                            <Link to="/cadastro" className="login-link">Cadastre-se</Link>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </main>
    );
}

export default Login;