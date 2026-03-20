FROM alpine:latest
RUN apk add --no-cache ca-certificates curl unzip
RUN curl -L https://github.com/pocketbase/pocketbase/releases/download/v0.36.6/pocketbase_0.36.6_linux_amd64.zip \
    -o /tmp/pb.zip && unzip /tmp/pb.zip pocketbase -d /pb && rm /tmp/pb.zip
RUN chmod +x /pb/pocketbase
COPY pb_migrations /pb/pb_migrations
COPY cms/pb_hooks /pb/pb_hooks
EXPOSE 8090
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8090", "--dir=/pb/pb_data"]
