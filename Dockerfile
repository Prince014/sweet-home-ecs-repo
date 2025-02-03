FROM public.ecr.aws/docker/library/node:18 AS builder
WORKDIR /app
COPY package.json package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM public.ecr.aws/nginx/nginx:latest
WORKDIR /app
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
