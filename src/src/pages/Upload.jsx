import { useState, useRef } from 'react';
import './Upload.css';
import { apiFetch, apiUrl } from '../services/api';

function Upload() {
    // Estados para gerenciar o arquivo selecionado e o status do upload
    const [videoArquivo, setVideoArquivo] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');
    
    // Estado para guardar o resultado que virá do seu banco/Spring Boot após a análise
    const [resultadoAnalise, setResultadoAnalise] = useState(null);

    // Referência para acionar o input de arquivo oculto ao clicar na dropzone
    const fileInputRef = useRef(null);

    // 1. Função executada quando o usuário clica e seleciona um arquivo
    const handleFileChange = (e) => {
        const arquivo = e.target.files[0];
        if (arquivo) {
            setVideoArquivo(arquivo);
            setErro('');
            setResultadoAnalise(null); // Limpa o resultado anterior
        }
    };

    // 2. Aciona o clique no input oculto
    const handleDropzoneClick = () => {
        fileInputRef.current.click();
    };

    // 3. Função que envia o arquivo de vídeo para o Spring Boot
    const handleEnviarVideo = async () => {
        if (!videoArquivo) {
            setErro('Por favor, selecione um vídeo primeiro.');
            return;
        }

        setCarregando(true);
        setErro('');

        // O FormData é obrigatório para enviar arquivos (MultipartFile no Java)
        const formData = new FormData();
        formData.append('file', videoArquivo); // "file" deve bater com o @RequestParam("file") do Java

        try {
            const response = await apiFetch('/api/videos/upload', {
                method: 'POST',
                body: formData,
                // IMPORTANTE: Não defina o Header Content-Type manualmente aqui, o navegador faz isso sozinho ao ver o FormData!
            });

            if (!response.ok) {
                const mensagemErro = await response.text();
                throw new Error(mensagemErro || 'Falha no upload ou no processamento do vídeo pela IA.');
            }

            // O back-end retorna o objeto Video com as informações e sugestões salvas
            const dadosDoVideoSalvo = await response.json();
            setResultadoAnalise(dadosDoVideoSalvo);

        } catch (err) {
            setErro(err.message || 'Erro ao conectar com o servidor.');
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="upload-page">
            <section className="upload-header">
                <div>
                    <span className="eyebrow">Análise de Movimento</span>
                    <h1>Envie seu vídeo e receba feedback com IA</h1>
                </div>
            </section>

            <div className="upload-grid">
                {/* PAINEL DE UPLOAD */}
                <section className="upload-panel">
                    <div className="panel-title">Upload de Vídeo</div>
                    
                    {/* Input HTML real escondido para podermos customizar o design da dropzone */}
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        style={{ display: 'none' }} 
                        accept="video/mp4, video/mov, video/avi"
                        onChange={handleFileChange}
                    />

                    <div className="upload-dropzone" onClick={handleDropzoneClick} style={{ cursor: 'pointer' }}>
                        <div className="upload-icon">⬆️</div>
                        <div className="upload-text">
                            {videoArquivo ? videoArquivo.name : 'Arraste seu vídeo aqui'}
                        </div>
                        <div className="upload-note">ou clique para selecionar • MP4, MOV, AVI</div>
                    </div>

                    {/* Botão de envio que aparece apenas quando há um arquivo selecionado */}
                    {videoArquivo && (
                        <button 
                            className="primary-button" 
                            onClick={handleEnviarVideo} 
                            disabled={carregando}
                            style={{ width: '100%', marginTop: '15px', padding: '12px', background: '#00c37d', border: 'none', color: '#fff', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                            {carregando ? 'A IA está analisando seu movimento...' : 'Analisar Exercício Agora'}
                        </button>
                    )}

                    {erro && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center', fontWeight: '600' }}>{erro}</p>}
                </section>

                {/* PAINEL DE RESULTADOS DINÂMICOS */}
                <section className="result-panel">
                    <div className="panel-status">
                        <div className="result-icon" style={{ backgroundColor: resultadoAnalise ? '#00c37d' : '#ccc' }}>
                            {resultadoAnalise ? '✔' : '📊'}
                        </div>
                        <div>
                            <h2>Resultados da Análise</h2>
                            
                            {/* Caso a análise tenha sido concluída com sucesso */}
                            {resultadoAnalise ? (
                                <div className="analise-conteudo" style={{ marginTop: '15px' }}>
                                    <p style={{ fontSize: '18px', marginBottom: '10px' }}>
                                        Precisão do Movimento: <strong style={{ color: '#00c37d' }}>{resultadoAnalise.accuracyScore}%</strong>
                                    </p>
                                    <div style={{ background: '#f5f7ff', padding: '15px', borderRadius: '8px', color: '#333' }}>
                                        <strong>Sugestões da IA:</strong>
                                        <p style={{ marginTop: '5px', lineHeight: '1.4' }}>{resultadoAnalise.suggestions}</p>
                                    </div>
                                    {/* Exibe o player com o vídeo vindo do back-end se o seu servidor estático estiver ativo */}
                                    <video 
                                        src={apiUrl(resultadoAnalise.videoUrl)} 
                                        controls 
                                        width="100%" 
                                        style={{ marginTop: '15px', borderRadius: '8px' }} 
                                    />
                                </div>
                            ) : (
                                // Caso nenhum vídeo tenha sido enviado ainda
                                <p>{carregando ? 'Processando o vídeo e gerando os dados...' : 'Envie um vídeo para ver os resultados aqui'}</p>
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
