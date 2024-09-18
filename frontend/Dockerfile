FROM node:bookworm-slim
WORKDIR /usr/local/app
COPY . .
EXPOSE 3000
RUN yarn install
CMD [ "yarn", "dev" ]