import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { AppError } from '../errors/AppError'

/**
 * Arquivo de rotas para a entidade User.
 */
const userRoutes = Router()

/**
 * POST /users - Cria um novo usuário
 */
userRoutes.post('/', async (req, res) => {
  const { name, email, password, phone, role } = req.body

  if (!name || !email || !password) {
    throw new AppError('Nome, email e senha são obrigatórios')
  }

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: password, // Lembrete: usar bcrypt no futuro
        phone,
        role: role || 'CLIENT',
      },
    })

    res.status(201).json(user)
  } catch (error: any) {
    // Erro específico do Prisma: Unique constraint failed
    if (error.code === 'P2002') {
      throw new AppError('Este e-mail já está em uso', 400)
    }

    // Se for outro erro inesperado, apenas relançamos para o middleware global
    throw error
  }
})

/**
 * GET /users - Lista todos os usuários
 */
userRoutes.get('/', async (req, res) => {
  const users = await prisma.user.findMany()
  res.status(200).json(users)
})

export { userRoutes }
