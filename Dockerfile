# Étape 1 : build de l'application Angular
FROM node:20-alpine as build

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build -- --configuration=production --project=plannignFront

# Étape 2 : serveur NGINX pour héberger les fichiers Angular compilés
FROM nginx:alpine

# ✅ Correction ici :
COPY --from=build /app/dist/browser /usr/share/nginx/html

# Copie la config Nginx (optionnel)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]