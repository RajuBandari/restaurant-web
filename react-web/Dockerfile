
FROM node:alpine

WORKDIR /app

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
ENV PATH /app/node_modules/.bin:$PATH
RUN yarn
COPY . .
EXPOSE 8080
CMD ["npm", "run", "dev"]