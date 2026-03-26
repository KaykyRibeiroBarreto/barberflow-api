# 💈 BarberFlow API

O **BarberFlow** é uma API moderna para gerenciamento de barbearias, focada em agilidade no agendamento e controle de serviços. Desenvolvida com **Node.js**, **TypeScript** e **Prisma ORM**, a aplicação segue as melhores práticas de desenvolvimento back-end.

---

## 🚀 Tecnologias Utilizadas

- **Runtime:** [Node.js](https://nodejs.org/) (v20+)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Framework:** [Express](https://expressjs.com/) (v5.x - com suporte nativo a erros assíncronos)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Banco de Dados:** PostgreSQL (Dockerizado ou Local)
- **Padronização:** ESLint, Prettier e EditorConfig

---

## 🏗️ Padrões de Projeto (Design Patterns)

A aplicação utiliza padrões reconhecidos para garantir manutenibilidade e escalabilidade:

- **Middleware Pattern**: Utilizado no `errorHandler` global para interceptar e tratar exceções de forma centralizada.
- **Singleton Pattern**: Aplicado na conexão com o banco de dados (`src/lib/prisma.ts`), garantindo uma única instância do `PrismaClient`.
- **Router Pattern**: Organização modular de rotas por responsabilidade (ex: `user.routes.ts`).
- **Centralized Error Handling**: Separação clara entre erros de domínio (`AppError`) e erros de infraestrutura.

---

## 🛠️ Funcionalidades Atuais

- [x] **Arquitetura Base**: Estrutura escalável com separação de rotas e middlewares.
- [x] **Tratamento de Erros Global**: Sistema centralizado para capturar erros de negócio e erros inesperados.
- [x] **Módulo de Usuários**:
  - Cadastro de usuários com Roles (Cliente, Barbeiro, Admin).
  - Listagem de usuários cadastrados.
  - Validação de e-mail duplicado via banco de dados.

---

## 🚨 Tratamento de Erros

Um dos diferenciais deste projeto é o seu **ErrorHandler** robusto. 
- Usamos a classe customizada `AppError` para erros previstos (400, 401, 404).
- O middleware global garante que o servidor nunca "caia" e que o cliente receba respostas padronizadas.
- **Saiba mais:** Veja o guia detalhado em [src/errors/README.md](./src/errors/README.md).

---

## 📅 Roadmap (Próximos Passos)

- [ ] **Segurança**: Implementar Hash de senha com `bcryptjs`.
- [ ] **Autenticação**: Login via JWT (JSON Web Token).
- [ ] **Agendamentos**: Lógica de horários disponíveis e marcação de serviços.
- [ ] **Documentação**: Swagger UI para visualização das rotas.
- [ ] **Docker**: Configuração de `docker-compose` para o ambiente de desenvolvimento.

---

## ⚙️ Como Executar

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/KaykyRibeiroBarreto/barberflow-api.git
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz com base no `.env.example` (se disponível) ou adicione sua `DATABASE_URL`.

4. **Rode as migrações do banco:**
   ```bash
   npx prisma migrate dev
   ```

5. **Inicie o servidor:**
   ```bash
   npm run dev
   ```
