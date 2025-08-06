# Étape 1 : Build Angular
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --configuration=production

# Étape 2 : Serveur NGINX
FROM nginx:alpine
COPY --from=builder /app/dist/planningFront /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]