import express from 'express'
import { userRoutes } from './routes/user.routes'
import { errorHandler } from './middlewares/errorHandler'

const app = express()

// Habilita o middleware para JSON, assim as requisições com corpo JSON serão processadas corretamente
app.use(express.json())

/**
 * Registrando as rotas da aplicação.
 * O prefixo '/users' será adicionado a todas as rotas dentro de 'userRoutes'.
 */

app.use('/users', userRoutes)

app.get('/', (req, res) => {
    res.json({ message: 'BarberFlow API está rodando!' })
})

// Middleware global de tratamento de erros (DEVE ser o último)              
app.use(errorHandler)

export { app }