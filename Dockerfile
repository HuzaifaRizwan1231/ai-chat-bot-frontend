FROM node:20-alpine as builder
WORKDIR /app
COPY . .
# RUN npm install
# RUN npm run build

FROM nginx:1.25.4-alpine-slim as prod
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf  /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]
