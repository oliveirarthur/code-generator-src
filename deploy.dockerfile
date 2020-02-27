FROM alpine/git:latest

COPY ./deploy /deploy
COPY ./web/dist /app

ENTRYPOINT [ "/deploy/docker-entrypoint.sh" ]
