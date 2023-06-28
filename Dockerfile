FROM node:16 as builder

WORKDIR /data/web

COPY yarn.lock .
COPY package.json .

RUN yarn config set registry https://registry.npmmirror.com/

RUN yarn install

COPY . .
RUN yarn run build

FROM nginx:alpine as nginx

RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone 

WORKDIR /data/web

RUN mkdir -p /app/www

COPY  --from=builder /data/web/dist /app/www

EXPOSE 443 
EXPOSE 80

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./nginx/config.sh /root
RUN chmod +x /root/config.sh

CMD ["/root/config.sh"]
