FROM nginx:1.18

COPY static index.html /root/dist/
COPY nginx.conf /etc/nginx/
CMD mkdir /etc/nginx/logs/

ENTRYPOINT ["nginx"]
