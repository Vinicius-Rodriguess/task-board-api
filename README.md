# 📝 **Back-End Task Board Api**

Este projeto é a API back-end para um sistema de gerenciamento de notas. Desenvolvido com **NestJS** e **TypeScript**, ele oferece funcionalidades seguras e escaláveis para criação, edição e gerenciamento de notas.

---

## 🚀 **Funcionalidades**

### **Back-End**
- API REST estruturada para gerenciar notas e usuários.
- Autenticação e autorização com **JWT** e **Guards**.
- Segurança aprimorada com **DTOs** e **bcrypt** para hash de senhas.
- Testes unitários utilizando **Jest**.
- Controle de acesso para administradores.
- CRUD completo de notas e usuários.

---

## 🛠️ **Tecnologias Utilizadas**

- **NestJS**: Framework TypeScript para desenvolvimento escalável.
- **TypeScript**: Tipagem estática para maior segurança no código.
- **TypeORM**: ORM para interagir com o banco de dados.
- **PostgreSQL/MySQL**: Banco de dados relacional para armazenamento de informações.
- **JWT (JSON Web Token)**: Autenticação segura.
- **Guards (AuthGuard e AdminGuard)**: Proteção de rotas.
- **Bcrypt**: Hash de senhas para maior segurança.
- **Jest**: Testes unitários.

---

## 🔧 **Como o Sistema Funciona**

1. **Cadastro/Login de Usuários**: Os usuários podem se registrar e autenticar via JWT.
2. **Gerenciamento de Notas**: Endpoints para criação, atualização, exclusão e listagem de notas.
3. **Segurança**: As senhas são protegidas com **bcrypt**, e a autenticação utiliza **JWT** com **AuthGuard** para controle de acesso.
4. **Controle de Acesso**: Algumas rotas são protegidas para administradores usando **AdminGuard**.
5. **Persistência de Dados**: Todas as informações são armazenadas no banco de dados.
6. **Testes**: Cobertura de testes unitários com **Jest**.

---

## 📋 **Requisitos**

- **Node.js** (v14 ou superior).
- **Banco de dados** (PostgreSQL ou MySQL).

---

## 🔧 **Como Configurar o Projeto**

1. Clone este repositório:
   ```bash
   git clone https://github.com/Vinicius-Rodriguess/task-board-api.git
   cd task-board-api
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente no arquivo `.env`.

4. Inicie o servidor:
   ```bash
   npm run start
   ```

5. Para rodar os testes:
   ```bash
   npm run test
   ```

---

## 🖥️ **Exemplo de Uso**

1. **Autenticação**: Envie um POST para `/auth/login` com email e senha.
2. **Gerenciamento de Notas**: Utilize os endpoints `/note` para criar, listar e excluir notas.
3. **Proteção de Rotas**: Algumas rotas exigem um token JWT válido no cabeçalho Authorization.
4. **Gerenciamento de Usuários**: Apenas administradores podem acessar rotas restritas.

---

## 📌 **Limitações**

- Requer configuração de banco de dados.
- O servidor deve estar rodando para o funcionamento da API.

---

## ✅ **Melhorias Futuras**

- Implementação de cache para melhorar a performance.
- Integração com serviços externos para backup de notas.
- Melhorias na segurança e proteção contra ataques comuns.

---

## 👨‍💻 **Autor**

**Vinicius Rodrigues**

- GitHub: [Vinicius-Rodriguess](https://github.com/Vinicius-Rodriguess)
- Email: rodrigues.vini.2004@gmail.com