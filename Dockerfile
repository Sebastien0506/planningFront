FROM nginx:alpine

# ✅ Copie le contenu exact de dist/browser
COPY dist/browser /usr/share/nginx/html

# (Optionnel) Configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]