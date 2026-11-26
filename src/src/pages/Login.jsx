import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import './styleLogin.css';

import Logo from '../Assets/logo.png';
import { apiFetch } from '../services/api';

import {
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    Box,
    CircularProgress
} from '@mui/material';

function Login({ onLogin }) {


// Estados
const [email, setEmail] = useState('');
const [senha, setSenha] = useState('');
const [erro, setErro] = useState('');
const [carregando, setCarregando] = useState(false);

const navigate = useNavigate();

// Função de login
const autenticar = async () => {

    // Limpa erro anterior
    setErro('');

    // Validação simples
    if (!email || !senha) {

        setErro('Preencha email e senha.');

        return;
    }

    setCarregando(true);

    try {

        const response = await apiFetch(
            '/api/login',
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    email,
                    senha
                })
            }
        );

        // Verifica erro HTTP
        if (!response.ok) {

            let mensagemErro =
                'Usuário ou senha inválidos.';

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
                    mensagemErro = erroTexto;
                }
            }

            throw new Error(mensagemErro);
        }

        // Dados do usuário/token
        const data = await response.json();

        // Verificação extra
        if (!data) {

            throw new Error(
                'Erro ao autenticar usuário.'
            );
        }

        // Salva usuário
        localStorage.setItem(
            'usuarioLogado',
            JSON.stringify(data)
        );

        // Callback opcional
        if (onLogin) {

            onLogin(data);
        }

        // Redireciona
        navigate('/historico');

    } catch (err) {

        console.error(
            'Erro no login:',
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

// Enter para logar
const handleKeyDown = (e) => {

    if (e.key === 'Enter') {

        autenticar();
    }
};

return (

    <div className="login-page">

        <Container
            maxWidth="sm"
            disableGutters
        >

            <Paper
                elevation={4}
                sx={{
                    padding: { xs: 3, sm: 4 },
                    borderRadius: 4,
                    background:
                        'rgba(255,255,255,0.96)',
                    maxWidth: 460,
                    width: '100%',
                    mx: 'auto'
                }}
            >

                {/* Header */}
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={2}
                >

                    <img
                        src={Logo}
                        alt="SoulUp"
                        className="login-logo"
                    />

                    <Typography
                        variant="h5"
                        sx={{
                            color: '#1e1e2d',
                            fontWeight: 700
                        }}
                    >

                        Entrar no SoulUp

                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            color: '#6f748a',
                            textAlign: 'center'
                        }}
                    >

                        Acesse sua conta
                        para continuar

                    </Typography>

                </Box>

                {/* Formulário */}
                <Box
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    mt={4}
                >

                    {/* Email */}
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        onKeyDown={handleKeyDown}
                        disabled={carregando}
                        InputProps={{
                            sx: {
                                borderRadius: 3,
                                background: '#f5f7ff'
                            }
                        }}
                    />

                    {/* Senha */}
                    <TextField
                        label="Senha"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={senha}
                        onChange={(e) =>
                            setSenha(e.target.value)
                        }
                        onKeyDown={handleKeyDown}
                        disabled={carregando}
                        InputProps={{
                            sx: {
                                borderRadius: 3,
                                background: '#f5f7ff'
                            }
                        }}
                    />

                    {/* Esqueceu senha */}
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >

                        <Link
                            to="/resetarsenha"
                            className="login-forgot"
                        >

                            Esqueceu a senha?

                        </Link>

                    </Box>

                    {/* Botão login */}
                    <Button
                        variant="contained"
                        onClick={autenticar}
                        disabled={carregando}
                        sx={{
                            mt: 1,
                            py: 1.4,
                            borderRadius: 3,
                            background: '#00c37d',
                            color: '#ffffff',
                            fontWeight: 700,
                            textTransform: 'none',
                            boxShadow:
                                '0 16px 30px rgba(0, 195, 125, 0.18)',

                            '&:hover': {
                                background: '#00b36d'
                            }
                        }}
                    >

                        {carregando ? (
                            <CircularProgress
                                size={24}
                                color="inherit"
                            />
                        ) : (
                            'Entrar'
                        )}

                    </Button>

                    {/* Mensagem erro */}
                    {erro && (

                        <Typography
                            color="error"
                            sx={{
                                mt: 1,
                                fontWeight: 600,
                                textAlign: 'center'
                            }}
                        >

                            {erro}

                        </Typography>

                    )}

                </Box>

                {/* Footer */}
                <Box
                    mt={3}
                    textAlign="center"
                >

                    <Typography
                        variant="body2"
                        sx={{
                            color: '#6f748a'
                        }}
                    >

                        Não tem conta?

                        {' '}

                        <Link
                            to="/cadastro"
                            className="login-link"
                        >

                            Cadastre-se

                        </Link>

                    </Typography>

                </Box>

            </Paper>

        </Container>

    </div>
);


}

export default Login;
