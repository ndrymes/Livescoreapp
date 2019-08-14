FROM node:10

WORKDIR /usr/src/app
ENTRYPOINT CMD

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["npm", "start"]