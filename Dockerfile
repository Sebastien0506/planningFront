FROM nginx:alpine

# ✅ On copie le build Angular local dans Nginx
COPY dist /usr/share/nginx/html

# ✅ Ta config nginx personnalisée (si tu en as une)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]