# ♻️ Site Resíduos — Plataforma de Gestão e Coleta

Monorepo contendo **Frontend (Next.js)** e **Backend (Strapi CMS)**, totalmente containerizado com **Docker**, garantindo consistência entre ambientes de desenvolvimento e produção.

---

## 📋 Pré-requisitos

Você precisa ter instalado **apenas**:

* **Docker**
* **Docker Compose**

> ℹ️ **Nota:** Não é necessário instalar Node.js, Yarn ou dependências locais. Tudo é gerenciado dentro dos containers.

---

## 🚀 Executando o Projeto Localmente

### 1️⃣ Clonar o Repositório

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd site-residuos
```

---

### 2️⃣ Iniciar os Serviços

Construa as imagens e suba os containers:

```bash
docker-compose up --build
```

> ⏳ Na primeira execução, esse processo pode levar alguns minutos.

---

### 3️⃣ Acessar a Aplicação

Após os serviços estarem ativos (mensagens como *Ready* ou *Welcome back* no terminal):

* 🌐 **Frontend (Site):** [http://localhost:3000](http://localhost:3000)
* 🛠️ **Backend (Admin Strapi):** [http://localhost:1337/admin](http://localhost:1337/admin)

> 🔐 **Login:** Utilize as credenciais de administrador já configuradas.
> Os dados estão salvos no banco de dados versionado no repositório.

---

### 4️⃣ Parar a Aplicação

Para encerrar os serviços:

* Pressione `Ctrl + C` no terminal
  **ou**
* Execute em outra aba:

```bash
docker-compose down
```

---

## 🖥️ Compatibilidade (Windows, Linux, macOS Intel e Apple Silicon)

O projeto utiliza imagens Docker baseadas em **Debian Bullseye**, garantindo alta compatibilidade entre plataformas.

### ✔️ Plataformas Suportadas

* **Apple Silicon (M1 / M2 / M3):** Execução nativa
* **Windows**
* **Linux**
* **macOS Intel**

### 🔧 Como isso funciona?

Ao executar `docker-compose up --build`, o Docker detecta automaticamente a arquitetura do processador e compila dependências nativas (como `sharp` e `sqlite3`) **dentro do container**, evitando problemas de binários incompatíveis ao trocar de máquina.

---

## 🌍 Guia de Deploy (Servidor Remoto)

### 1️⃣ Preparar o Servidor

Certifique-se de que o servidor possua:

* **Docker**
* **Git**

---

### 2️⃣ Baixar o Projeto

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd site-residuos
```

---

### 3️⃣ Configuração de Segurança (Obrigatório para Produção)

O `docker-compose.yml` contém **chaves padrão de desenvolvimento**.

Para produção, recomenda-se:

* Criar um arquivo `.env` com chaves seguras
* Ajustar o `docker-compose.yml` para ler essas variáveis

Chaves importantes:

* `JWT_SECRET`
* `API_TOKEN_SALT`
* `ADMIN_JWT_SECRET`

---

### 4️⃣ Executar em Modo Detached (Segundo Plano)

```bash
docker-compose up -d --build
```

---

### 5️⃣ Configurar Domínio e SSL (Recomendado)

Por padrão, os serviços rodam em:

* Frontend: `:3000`
* Backend: `:1337`

Para uso com domínio (ex: `meusite.com`), configure um **Proxy Reverso** como **Nginx** ou **Traefik**.

#### Exemplo de fluxo com Nginx:

* `meusite.com` → `localhost:3000` (Frontend)
* `api.meusite.com` → `localhost:1337` (Backend)

---

## 📂 Estrutura do Projeto

```
site-residuos/
├── frontend/              # Aplicação Next.js
├── server/                # Aplicação Strapi CMS
│   ├── public/uploads/    # Arquivos e imagens enviados (versionados)
│   └── .tmp/data.db       # Banco de dados SQLite (versionado)
├── docker-compose.yml     # Orquestra frontend e backend
├── Dockerfile.*           # Definições de build das imagens
```

---

## 🛠️ Desenvolvimento e Manutenção

### ➕ Adicionar Novas Dependências

Caso precise instalar um novo pacote (ex: `axios` no frontend):

1. Acesse o container do frontend:

```bash
docker exec -it residuos-frontend /bin/sh
```

2. Instale o pacote:

```bash
yarn add axios
```

3. Saia do container e reconstrua:

```bash
exit
docker-compose up --build
```

---

### 💾 Restaurar ou Versionar o Banco de Dados

Os seguintes arquivos são **rastreados pelo Git**:

* `server/.tmp/data.db`
* `server/public/uploads/`

#### 📌 Cenários comuns:

* **Salvar alterações no banco:**

  ```bash
  git commit
  ```

* **Descartar alterações e restaurar estado original:**

  ```bash
  git checkout server/.tmp/data.db
  ```

---

## 🧰 Tecnologias Utilizadas

* **Next.js**
* **Strapi v4**
* **Docker / Docker Compose**
* **SQLite**