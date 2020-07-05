FROM nginx:1.18

COPY index.html /root/dist/
COPY static /root/dist/static/
COPY nginx.conf /etc/nginx/
RUN mkdir /etc/nginx/logs && touch /etc/nginx/logs/host.access.log
ENTRYPOINT ["nginx","-g","daemon off;"]
