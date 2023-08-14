FROM node:slim
WORKDIR /app
COPY /backend /app
RUN npm install
EXPOSE 3000
CMD node index.js