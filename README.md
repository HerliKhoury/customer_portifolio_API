# customer_portifolio_API

Aplicação que gerencia usuários, filmes e reviews.


### Endpoints da aplicação:
| Método | Endpoint | Objetivo | Autorização Token |
|---|---|---|---|
| `POST` | `/users` | Cria um usuário | `Não` |
| `POST` | `/login` | Autentica um usuário e retorna um token de acesso | `Não` |
| `GET` | `/users` | Lista todos os usuários | `Não` |
| `PATCH` | `/users/:id` | Atualiza usuário por id | `Sim` |
| `DELETE` | `/users/:id` | Deleta usuário por id | `Sim` |
| `GET` | `/users/:id/costumers` | Lista de clientes de um usuário por id | `Sim` |
| `GET` | `/costumers` | Listar todos os clientes cadastrados | `Não` |
| `POST` | `/costumers` | Cria um cliente | `Sim` |
| `PATCH` | `/costumers` | Atualiza os dados de um cliente | `Sim` |
| `DELETE` | `/costumers` | Deleta um cliente | `Não` |

### Diagrama de Entidade de Relacionamento

<blockquote class="imgur-embed-pub" lang="en" data-id="a/9vrB72p" data-context="false" ><a href="//imgur.com/a/9vrB72p"></a></blockquote>