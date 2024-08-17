const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Servir arquivos de música da pasta 'musicas'
app.use('/musicas', express.static(path.join(__dirname, 'musicas')));

// Rota para fornecer a playlist em formato JSON
app.get('/playlist', (req, res) => {
    const caminhoArquivoJson = path.join(__dirname, 'playlist.json');

    // Verificar se o arquivo JSON existe
    if (!fs.existsSync(caminhoArquivoJson)) {
        return res.status(404).send('Arquivo JSON não encontrado');
    }

    // Ler o arquivo JSON e enviá-lo na resposta
    fs.readFile(caminhoArquivoJson, 'utf8', (err, dados) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON:', err);
            return res.status(500).send('Erro ao ler o arquivo JSON');
        }

        // Enviar o conteúdo JSON como resposta
        res.json(JSON.parse(dados));
    });
});

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
