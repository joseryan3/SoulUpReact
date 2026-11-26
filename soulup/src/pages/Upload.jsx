            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem('usuarioLogado');
                    navigate('/login', { replace: true });
                    return;
                }

                const mensagemErro = await response.text();
                throw new Error(mensagemErro || 'Falha no upload ou no processamento do vídeo pela IA.');
            }
