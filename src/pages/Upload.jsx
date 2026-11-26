import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Upload.css';
import { apiFetch, apiUrl } from '../services/api';

function Upload() {
    const [videoArquivo, setVideoArquivo] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');
    const [resultadoAnalise, setResultadoAnalise] = useState(null);

    const fileInputRef = useRef(null);
    const pollingRef = useRef(null);
    const navigate = useNavigate();

    const limparPolling = () => {
        if (pollingRef.current) {
            clearInterval(pollingRef.current);
            pollingRef.current = null;
        }
    };

    useEffect(() => {
        return () => limparPolling();
    }, []);

    const handleFileChange = (e) => {
        const arquivo = e.target.files[0];
        if (arquivo) {
            limparPolling();
            setVideoArquivo(arquivo);
            setErro('');
            setResultadoAnalise(null);
        }
    };

    const handleDropzoneClick = () => {
        fileInputRef.current?.click();
    };

    const buscarDetalhesVideo = async (videoId) => {
        const res = await apiFetch(`/api/videos/${videoId}/detalhes`);
        if (!res.ok) return null;
        return await res.json();
    };

    const finalizarSeConcluido = (dados) => {
        const status = (dados?.status || '').toUpperCase();
        if (!status) return false;

        if (status.includes('ERRO')) {
            limparPolling();
            setCarregando(false);
            setErro(dados?.suggestions || 'Falha durante o processamento do vídeo.');
            return true;
        }

        if (!status.includes('PROCESS') && !status.includes('PEND')) {
            limparPolling();
            setCarregando(false);
            return true;
        }

        return false;
    };

    const iniciarPollingSeNecessario = (dados) => {
        limparPolling();
        const videoId = dados?.id;

        if (!videoId || finalizarSeConcluido(dados)) {
            return;
        }

        pollingRef.current = setInterval(async () => {
            try {
                const atualizado = await buscarDetalhesVideo(videoId);
                if (!atualizado) return;

                setResultadoAnalise(atualizado);
                finalizarSeConcluido(atualizado);
            } catch {
                // Mantém tentando até concluir ou estourar erro manual
            }
        }, 2000);
    };

    const handleEnviarVideo = async () => {
        if (!videoArquivo) {
            setErro('Por favor, selecione um vídeo primeiro.');
            return;
        }

        limparPolling();
        setCarregando(true);
        setErro('');

        const formData = new FormData();
        formData.append('file', videoArquivo);

        try {
            const response = await apiFetch('/api/videos/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const mensagemErro = await response.text();
                throw new Error(mensagemErro || 'Falha no upload ou no processamento do vídeo pela IA.');
            }

            const dadosDoVideoSalvo = await response.json();
            setResultadoAnalise(dadosDoVideoSalvo);
            iniciarPollingSeNecessario(dadosDoVideoSalvo);
        } catch (err) {
            setErro(err.message || 'Erro ao conectar com o servidor.');
            setCarregando(false);
        }
    };

    const precisao =
        resultadoAnalise?.accuracyScore ??
        resultadoAnalise?.accuracy_score ??
        resultadoAnalise?.score ??
        null;

    const repeticoes =
        resultadoAnalise?.repetitions ??
        resultadoAnalise?.repeticoes ??
        null;

    const sugestoes =
        resultadoAnalise?.suggestions ??
        'Nenhuma sugestão disponível.';

    const srcVideo = resultadoAnalise?.videoUrl;

    const handleLogout = () => {
        // Lógica de desconexão (pode variar conforme a implementação da autenticação)
        // Exemplo: remover token do localStorage e redirecionar para a página de login
        localStorage.removeItem('token');
        navigate('/login');
    };

    const desconectar = async () => {
        limparPolling();

        try {
            await apiFetch('/api/logout', { method: 'POST' });
        } catch {
            // A limpeza local ainda deve ocorrer mesmo se o backend estiver indisponível.
        }

        localStorage.removeItem('usuarioLogado');
        localStorage.removeItem('token');
        sessionStorage.removeItem('oauthGooglePendente');
        navigate('/login', { replace: true });
    };

    return (
        <div className="upload-page">
            <section className="upload-header">
                <div>
                    <span className="eyebrow">Análise de Movimento</span>
                    <h1>Envie seu vídeo e receba feedback com IA</h1>
                </div>
                <div className="upload-header-actions">
                    <button
                        type="button"
                        className="logout-button"
                        onClick={desconectar}
                    >
                        Desconectar
                    </button>
                </div>
            </section>

            <div className="upload-grid">
                <section className="upload-panel">
                    <div className="panel-title">Upload de Vídeo</div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        accept="video/mp4,video/quicktime,video/x-msvideo"
                        onChange={handleFileChange}
                    />

                    <div className="upload-dropzone" onClick={handleDropzoneClick} style={{ cursor: 'pointer' }}>
                        <div className="upload-icon">⬆️</div>
                        <div className="upload-text">
                            {videoArquivo ? videoArquivo.name : 'Arraste seu vídeo aqui'}
                        </div>
                        <div className="upload-note">ou clique para selecionar • MP4, MOV, AVI</div>
                    </div>

                    {videoArquivo && (
                        <button
                            className="primary-button"
                            onClick={handleEnviarVideo}
                            disabled={carregando}
                            style={{
                                width: '100%',
                                marginTop: '15px',
                                padding: '12px',
                                background: '#00c37d',
                                border: 'none',
                                color: '#fff',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                            }}
                        >
                            {carregando ? 'A IA está analisando seu movimento...' : 'Analisar Exercício Agora'}
                        </button>
                    )}

                    {erro && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center', fontWeight: '600' }}>{erro}</p>}
                </section>

                <section className="result-panel">
                    <div className="panel-status">
                        <div
                            className="result-icon"
                            style={{ backgroundColor: resultadoAnalise && !carregando ? '#00c37d' : '#ccc' }}
                        >
                            {resultadoAnalise && !carregando ? '✔' : '📊'}
                        </div>
                        <div style={{ width: '100%' }}>
                            <h2>Resultados da Análise</h2>

                            {resultadoAnalise ? (
                                <div className="analise-conteudo" style={{ marginTop: '15px' }}>
                                    <p style={{ fontSize: '18px', marginBottom: '8px' }}>
                                        Precisão do Movimento:{' '}
                                        <strong style={{ color: '#00c37d' }}>
                                            {precisao !== null && precisao !== undefined ? `${precisao}%` : '—'}
                                        </strong>
                                    </p>

                                    <p style={{ fontSize: '18px', marginBottom: '12px' }}>
                                        Repetições Detectadas:{' '}
                                        <strong style={{ color: '#00c37d' }}>
                                            {repeticoes !== null && repeticoes !== undefined ? repeticoes : '—'}
                                        </strong>
                                    </p>

                                    <div style={{ background: '#020202', padding: '15px', borderRadius: '8px', color: '#ece5e5' }}>
                                        <strong>Sugestões da IA:</strong>
                                        <p style={{ marginTop: '5px', lineHeight: '1.4' }}>{sugestoes}</p>
                                    </div>

                                    {srcVideo && (
                                        <video
                                            src={apiUrl(srcVideo)}
                                            crossOrigin="use-credentials"
                                            controls
                                            width="100%"
                                            style={{ marginTop: '15px', borderRadius: '8px' }}
                                        />
                                    )}
                                </div>
                            ) : (
                                <p>
                                    {carregando
                                        ? 'Processando o vídeo e gerando os dados...'
                                        : 'Envie um vídeo para ver os resultados aqui'}
                                </p>
                            )}
                        </div>
                    </div>
                </section>
            </div>

            <section className="upload-tips">
                <div className="panel-title">Dicas para melhor análise</div>
                <ul>
                    <li>Filme de um ângulo lateral para melhor visibilidade</li>
                    <li>Use boa iluminação e fundo limpo</li>
                    <li>Grave entre 10-30 segundos do exercício</li>
                    <li>Vista roupas que permitam ver as articulações</li>
                </ul>
            </section>
        </div>
    );
}

export default Upload;