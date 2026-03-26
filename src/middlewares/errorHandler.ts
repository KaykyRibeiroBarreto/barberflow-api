import type { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/AppError'

/**
 * Middleware global de tratamento de erros.
 */
export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Response | void {
  // Se o erro for uma instância da nossa classe personalizada
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }

  // Erros inesperados (erros de código, banco fora do ar, etc.)
  console.error('Erro inesperado:', error)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
}
