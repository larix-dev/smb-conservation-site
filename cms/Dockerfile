FROM node:alpine as build

COPY . .
RUN npm ci
RUN npm run build

FROM node:alpine

COPY --from=build .keystone .keystone
COPY --from=build package.json package.json
COPY --from=build node_modules node_modules
COPY --from=build migrations migrations
COPY --from=build schema.prisma schema.prisma

CMD ["npm", "start"]