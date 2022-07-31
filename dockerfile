FROM node:lts-alpine

WORKDIR /app
COPY . ./
RUN npm install

RUN adduser -D myuser
RUN chown -R myuser /app
USER myuser

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]