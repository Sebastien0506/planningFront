FROM nginx:alpine

# ✅ On copie le build Angular dans le dossier NGINX
COPY dist/browser /usr/share/nginx/html

# ✅ Configuration personnalisée de NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]