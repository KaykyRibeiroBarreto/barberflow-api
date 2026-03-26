# 🚨 Guia de Tratamento de Erros (Error Handling)

Seja bem-vindo! Se você está tentando entender como os erros são capturados e respondidos nesta API, este guia é para você. 

Imagine que nossa API é um **Restaurante**.

---

## 🍽️ A Analogia do Restaurante

Para entender o fluxo, pense assim:
1. **O Cliente (Frontend/Insomnia):** Faz um pedido (Requisição HTTP).
2. **O Garçom (Rotas):** Leva o pedido para a cozinha. Se ele notar que você pediu algo que não tem no menu (ex: esqueceu o e-mail), ele já te avisa ali mesmo.
3. **O Chef (Banco de Dados/Prisma):** Tenta preparar o prato. Se ele queimar a comida ou descobrir que um ingrediente acabou (ex: e-mail duplicado), ele avisa o garçom.
4. **O Gerente (Middleware `errorHandler`):** É a única pessoa autorizada a falar com o cliente quando algo dá errado. Ele traduz os gritos da cozinha em uma mensagem educada para o cliente.

---

## 🧱 Os 3 Pilares do nosso Sistema

### 1. A Etiqueta de Erro (`AppError.ts`)
Pense no `AppError` como uma "etiqueta personalizada" que colocamos em um problema. 
Quando sabemos exatamente o que deu errado (ex: "Senha curta demais"), criamos um `AppError`.

- **Por que usamos?** Para diferenciar erros que **nós** criamos (erros de negócio) de erros que o **sistema** criou (erros de sintaxe, banco fora do ar).
- **O que ele tem?** Uma mensagem amigável e um código (ex: 400 para erro do cliente, 404 para não encontrado).

### 2. O Tradutor Central (`errorHandler.ts`)
Este é o nosso **Gerente**. No Express, ele é um "Middleware Global". 
Toda vez que alguém dá um `throw` (lança) um erro em qualquer lugar da API, esse erro cai direto nas mãos dele.

**O que ele faz?**
- **Se for um `AppError`:** Ele pensa: *"Ah, eu conheço esse erro. O programador previu isso."* Ele pega a mensagem e o código que você definiu e envia para o cliente.
- **Se NÃO for um `AppError`:** Ele pensa: *"Eita, algo explodiu e eu não esperava!"*. Ele loga o erro real no console (para os desenvolvedores verem) e diz ao cliente: *"Erro Interno do Servidor (500)"*. Isso evita que o cliente veja mensagens técnicas feias ou perigosas.

### 3. O Arremessador de Erros (`user.routes.ts`)
Nas rotas, usamos o comando `throw`. No momento que você dá um `throw`, a execução daquela função **para na hora** e o erro "pula" direto para o nosso Gerente (Middleware).

---

## 🔄 O Passo a Passo no Código

### Passo 1: Validando o básico
```typescript
if (!email) {
  // "Ei, Gerente! O cliente esqueceu o e-mail. Avisa ele com erro 400!"
  throw new AppError('E-mail é obrigatório', 400);
}
```

### Passo 2: Lidando com o Banco (Prisma)
Às vezes o erro vem de fora. Usamos `try/catch` para capturar e "etiquetar":
```typescript
try {
  await prisma.user.create(...);
} catch (error) {
  if (error.code === 'P2002') {
    // "Gerente, o Chef disse que esse e-mail já existe. Avisa o cliente!"
    throw new AppError('E-mail já cadastrado');
  }
  // Se for outro erro (ex: banco caiu), lançamos o erro original
  throw error; 
}
```

---

## ✅ Por que fazer assim?

1. **Código Limpo:** Suas rotas não ficam cheias de `res.status(400).json(...)`. Você só lança o erro e confia que o Gerente vai cuidar disso.
2. **Segurança:** Erros críticos do sistema nunca chegam ao usuário final.
3. **Padronização:** Todas as respostas de erro da sua API terão sempre a mesma "cara":
   ```json
   {
     "status": "error",
     "message": "Sua mensagem aqui"
   }
   ```

---
*Dica: Sempre que criar uma nova regra de negócio, pergunte-se: "Isso é um erro que eu previ?". Se sim, use `throw new AppError()`!*
