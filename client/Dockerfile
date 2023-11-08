FROM node:alpine as build

COPY . .
RUN npm ci
RUN npm run build

FROM nginx:alpine

COPY --from=build nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]