import dotenv from 'dotenv/config.js' /* importação do dotenv sempre vai no topo para carregar as variaveis */
import { app } from './app'


const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
})
