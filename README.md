Aqui está o conteúdo do arquivo `README.md` em texto plano para você copiar e colar:

```markdown
# Site Resíduos - Plataforma de Gestão e Coleta

Este é um projeto monorepo contendo o Frontend (Next.js) e o Backend (Strapi CMS), totalmente containerizado com Docker para garantir consistência entre ambientes de desenvolvimento e produção.

## 📋 Pré-requisitos

Para executar este projeto, você precisa ter instalado na sua máquina apenas:

* **Docker**
* **Docker Compose**

> **Nota:** Não é necessário ter Node.js ou Yarn instalados localmente, pois tudo é gerenciado pelos containers.

---

## Como Executar Localmente

Siga estes passos para rodar o projeto no seu computador:

### 1. Clonar o Repositório
Baixe o projeto para uma pasta de sua preferência:
```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd site-residuos

```

### 2. Iniciar os Serviços

Execute o comando abaixo para construir as imagens e subir os containers.
*Este passo pode levar alguns minutos na primeira vez.*

```bash
docker-compose up --build

```

### 3. Acessar a Aplicação

Após o terminal indicar que os serviços estão rodando (mensagens de "Ready" ou "Welcome back"), acesse:

* **Site (Frontend):** [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)
* **Painel Administrativo (Backend):** [http://localhost:1337/admin](https://www.google.com/search?q=http://localhost:1337/admin)

> **Login:** Utilize as credenciais de administrador configuradas (os dados estão salvos no banco de dados incluído no repositório).

### 4. Parar a Aplicação

Para desligar os serviços, pressione `Ctrl+C` no terminal ou execute em outra aba:

```bash
docker-compose down

```

---

## 🖥️ Compatibilidade (Windows / Linux / Mac Intel vs Apple Silicon)

Este projeto foi configurado utilizando imagens Docker baseadas em **Debian Bullseye**, o que garante alta compatibilidade.

* **Apple Silicon (M1/M2/M3):** O projeto roda nativamente.
* **Windows / Linux / Mac Intel:** O projeto também rodará sem problemas.

**Como funciona:**
Quando você roda `docker-compose up --build`, o Docker detecta a arquitetura do seu processador e compila as bibliotecas necessárias (como `sharp` e `sqlite3`) especificamente para a sua máquina dentro do container. Isso elimina conflitos comuns de "binários incompatíveis" ao trocar de computador.

---

## Guia de Deploy (Servidor Remoto)

Para colocar este site no ar em um servidor (VPS como DigitalOcean, AWS, Hetzner etc.):

### 1. Preparar o Servidor

Certifique-se de que o servidor tenha **Docker** e **Git** instalados.

### 2. Baixar o Projeto

No servidor, clone o repositório:

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd site-residuos

```

### 3. Configuração de Segurança (Importante)

O arquivo `docker-compose.yml` atual contém chaves de segurança padrão para desenvolvimento. Para produção, recomenda-se criar um arquivo `.env` no servidor com chaves seguras e alterar o `docker-compose.yml` para ler essas variáveis, ou alterá-las diretamente no arquivo antes de subir:

* `JWT_SECRET`
* `API_TOKEN_SALT`
* `ADMIN_JWT_SECRET`

### 4. Executar em Modo "Detached"

Para rodar o site em segundo plano (para que não feche ao sair do terminal):

```bash
docker-compose up -d --build

```

### 5. Configurar Domínio e SSL (Recomendado)

O site estará rodando nas portas `:3000` e `:1337`. Para usar um domínio (ex: `meusite.com`), você deve configurar um **Proxy Reverso** (como Nginx ou Traefik) na frente do Docker.

Exemplo básico de fluxo com Nginx:

* Redirecionar `meusite.com` -> `localhost:3000` (Frontend)
* Redirecionar `api.meusite.com` -> `localhost:1337` (Backend)

---

## 📂 Estrutura do Projeto

* **`frontend/`**: Aplicação Next.js (React).
* **`server/`**: Aplicação Strapi (CMS).
* `public/uploads/`: Imagens e arquivos enviados (versionados no Git).
* `.tmp/data.db`: Banco de dados SQLite (versionado no Git).

* **`docker-compose.yml`**: Orquestrador que liga o Frontend ao Backend.
* **`Dockerfile.*`**: Instruções de construção das imagens.

## 🛠️ Desenvolvimento e Manutenção

### Adicionar Novas Dependências

Se precisar instalar um novo pacote (ex: `yarn add axios` no frontend), não faça isso no seu computador local se não tiver o Node 16 instalado. Use o Docker:

1. Acesse o container:
```bash
docker exec -it residuos-frontend /bin/sh

```

2. Instale o pacote:
```bash
yarn add axios

```

3. Saia e reconstrua:
```bash
exit
docker-compose up --build

```

### Restaurar Banco de Dados

O arquivo de banco de dados (`server/.tmp/data.db`) e as imagens (`server/public/uploads`) estão sendo rastreados pelo Git.

* Para salvar suas alterações no banco: Faça um `git commit`.
* Para descartar alterações e voltar ao estado original: `git checkout server/.tmp/data.db`.

---

**Desenvolvido com:** Next.js, Strapi v4, Docker e SQLite.

```

```