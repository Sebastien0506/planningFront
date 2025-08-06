# Étape 1 : Build Angular
FROM node:20 AS builder
WORKDIR /app

# Étape importante : copier les fichiers nécessaires d'abord
COPY package*.json ./
RUN npm install

# Ensuite on copie le reste
COPY . .

# Puis on build le projet Angular
RUN npm run build -- --configuration=production

# Étape 2 : Serveur NGINX
FROM nginx:alpine
COPY --from=builder /app/dist/planningFront /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]