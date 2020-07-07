# Hello Gin w/ AWS CDK

This is a repo to accompany my [blog post](https://blog.dennisokeeffe.com/blog/2020-07-024-hello-fiber/).

## Go Lambda Functions

For the function, to build run:

```s
GOOS=linux GOARCH=amd64 go build -o main main.go
```

The targets are required for Go lambdas.

### Running the function

After deploying, use the URL given back and run:

```s
> curl https://url-example.us-east-1.amazonaws.com/prod/ping
{"message":"pong"}
```

## Infra

### Deploying

```s
cd infra
npm run deploy
```

You'll get a URL endpoint back from the deployment.

### Destroying

```s
cd infra
npm run destroy
```

## Monitoring

Logs from the calls are kept on CloudWatch. An example of a successful output.

```s

2020-07-06T09:04:08.623+10:00
START RequestId: 57c62f65-d48d-40bf-a484-39f63169a6ca Version: $LATEST

2020-07-06T09:04:08.623+10:00
2020/07/05 23:04:08 Gin cold start

2020-07-06T09:04:08.623+10:00
[GIN-debug] [WARNING] Creating an Engine instance with the Logger and Recovery middleware already attached.

2020-07-06T09:04:08.623+10:00
[GIN-debug] [WARNING] Running in "debug" mode. Switch to "release" mode in production.

2020-07-06T09:04:08.623+10:00
- using env: export GIN_MODE=release

2020-07-06T09:04:08.623+10:00
- using code: gin.SetMode(gin.ReleaseMode)

2020-07-06T09:04:08.623+10:00
[GIN-debug] GET /ping --> main.init.0.func1 (3 handlers)

2020-07-06T09:04:08.634+10:00
[GIN] 2020/07/05 - 23:04:08 | 200 | 18.267µs | 211.27.74.18 | GET /ping

2020-07-06T09:04:08.653+10:00
END RequestId: 57c62f65-d48d-40bf-a484-39f63169a6ca

2020-07-06T09:04:08.653+10:00
REPORT RequestId: 57c62f65-d48d-40bf-a484-39f63169a6ca Duration: 21.35 ms Billed Duration: 100 ms Memory Size: 128 MB Max Memory Used: 39 MB Init Duration: 108.66 ms
```
