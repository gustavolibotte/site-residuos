# Use uma versão específica do Node.js que atenda aos requisitos do projeto
FROM node:16-alpine

WORKDIR /usr/src/app

# Copie os arquivos package.json e yarn.lock para a raiz do projeto
COPY package.json yarn.lock ./

# Copie o restante do código para o contêiner
COPY . .

# Construa os pacotes do frontend e do backend
RUN yarn

EXPOSE 1337
EXPOSE 3000

RUN chown -R node /usr/src/app
USER node

CMD ["yarn", "run", "dev"]
