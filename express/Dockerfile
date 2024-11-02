ARG NODE_VERSION=20.16.0

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.yarn to speed up subsequent builds.
# Leverage a bind mounts to package.json and yarn.lock to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/root/.yarn \
    yarn install --production --frozen-lockfile 

RUN mkdir -p /usr/src/app/dist && chown -R node:node /usr/src/** 

RUN yarn global add typescript

USER root

#USER node

COPY . .

#RUN npx prisma@5.0.0 db pull --url postgres://admin:password!@express-db:5432/express?connect_timeout=999
RUN yarn migrate 
RUN yarn seed

EXPOSE 5000

CMD yarn start
