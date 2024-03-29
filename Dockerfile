FROM node:16.14-slim as builder

RUN apt update \
  && apt install -y python3 make gcc g++

WORKDIR /opt

ADD . ./

RUN cp -r docs/** i18n/zh-cn/docusaurus-plugin-content-docs/current \
  && npm install -g npm@8.15.1 \
  && npm install \
  && npm run build

FROM nginx:1.20

COPY --from=builder /opt/dist/ /usr/local/nginx/html/