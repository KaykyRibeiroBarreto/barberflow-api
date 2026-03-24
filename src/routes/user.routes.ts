import { Router } from 'express'
import { prisma } from '../lib/prisma'

/**
 * Arquivo de rotas para a entidade User.
 * O Router do Express permite agrupar rotas relacionadas em um único objeto.
 */
const userRoutes = Router()

/**
 * POST /users - Cria um novo usuário
 */
userRoutes.post('/', async (req: any, res: any) => {
  try {
    const { name, email, password, phone, role } = req.body

    if (!name || !email || !password) {
      res.status(400).json({ error: 'Nome, email e senha são obrigatórios' })
      return
    }

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
    if (error.code === 'P2002') {
      res.status(400).json({ error: 'Este e-mail já está em uso' })
      return
    }

    console.error('Erro ao criar usuário:', error)
    res.status(500).json({ error: 'Erro interno ao criar usuário' })
  }
})

/**
 * GET /users - Lista todos os usuários
 */
userRoutes.get('/', async (req: any, res: any) => {
  try {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    res.status(500).json({ error: 'Erro interno ao buscar usuários' })
  }
})

export { userRoutes }
