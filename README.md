# Hello Fiber

This is a repo to accompany my [blog post](https://blog.dennisokeeffe.com/blog/2020-07-024-hello-fiber/).

## Go Lambda Functions

For the function, to build run:

```s
GOOS=linux GOARCH=amd64 go build -o main main.go
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
