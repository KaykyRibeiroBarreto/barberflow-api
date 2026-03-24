import express from 'express'
import { userRoutes } from './routes/user.routes'

const app = express()

// Habilita o middleware para JSON
app.use(express.json())

/**
 * Registrando as rotas da aplicação.
 * O prefixo '/users' será adicionado a todas as rotas dentro de 'userRoutes'.
 */
app.use('/users', userRoutes)

/**
 * Rota principal de verificação
 */
app.get('/', (req, res) => {
  res.json({ message: 'BarberFlow API está rodando!' })
})

const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
})
