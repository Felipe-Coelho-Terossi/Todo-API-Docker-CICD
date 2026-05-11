# To-do API — Node.js + PostgreSQL + Docker + CI/CD
## Demo
https://felipe-coelho-terossi.github.io/Todo-API-Docker-CICD/

API REST de tarefas containerizada com Docker e pipeline de CI/CD automático via GitHub Actions.

![CI/CD](https://github.com/Felipe-Coelho-Terossi/Todo-API-Docker-CICD/actions/workflows/ci.yml/badge.svg)

## Stack

- **Node.js 20** + Express
- **PostgreSQL 16**
- **Docker** + Docker Compose
- **GitHub Actions** — testes automáticos + build e push da imagem

## Como rodar localmente

**Pré-requisitos:** Docker instalado.

```bash
git clone https://github.com/Felipe-Coelho-Terossi/Todo-API-Docker-CICD.git
cd Todo-API-Docker-CICD
docker compose up --build
```

A API estará disponível em `http://localhost:3000`.

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/health` | Status da API |
| GET | `/todos` | Lista todas as tarefas |
| POST | `/todos` | Cria uma tarefa |
| PATCH | `/todos/:id` | Alterna done/undone |
| DELETE | `/todos/:id` | Remove uma tarefa |

## Exemplos

```bash
# Criar tarefa
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Estudar Docker"}'

# Listar tarefas
curl http://localhost:3000/todos

# Alternar status
curl -X PATCH http://localhost:3000/todos/1

# Deletar
curl -X DELETE http://localhost:3000/todos/1
```

## Testes

```bash
DATABASE_URL=postgres://todo:todo@localhost:5432/tododb npm test
```

## CI/CD

A cada push na branch `main`:

1. GitHub Actions sobe um PostgreSQL e roda os testes automaticamente
2. Se os testes passarem, faz o build da imagem Docker e publica no Docker Hub

## Estrutura

```
todo-api/
├── src/
│   ├── index.js        # Servidor Express
│   ├── db.js           # Conexão PostgreSQL
│   └── routes/
│       └── todos.js    # Rotas CRUD
├── tests/
│   └── todos.test.js   # Testes Jest + Supertest
├── .github/
│   └── workflows/
│       └── ci.yml      # Pipeline CI/CD
├── Dockerfile
└── docker-compose.yml
```
