
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
// Importamos o PrismaClient do arquivo client.ts dentro da pasta gerada
import { PrismaClient } from '../generated/prisma/client'

/**
 * No Prisma 7, para conexões diretas com PostgreSQL, precisamos usar um adaptador.
 * Isso permite que o Prisma utilize drivers nativos do ecossistema JS/TS (como o 'pg').
 */

// 1. Carregamos a URL de conexão do ambiente
const connectionString = process.env.DATABASE_URL

if (!connectionString) {
    throw new Error('DATABASE_URL não encontrada no arquivo .env')  
}

// 2. Criamos um pool de conexões usando o driver 'pg'
const pool = new Pool({ connectionString })

// 3. Criamos o adaptador que traduz as consultas do Prisma para o driver 'pg'
// O 'as any' aqui é necessário para evitar conflitos entre diferentes versões das tipagens do @types/pg
const adapter = new PrismaPg(pool as any)

// 4. Instanciamos o PrismaClient passando o adaptador
export const prisma = new PrismaClient({ adapter })
