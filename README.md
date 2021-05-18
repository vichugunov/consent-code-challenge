# Startup

```
cp .env.example .env
docker-compose up
```

# Swagger
You can navigate to http://localhost:3000/api to see a nice swagger definition
To generate and download a Swagger JSON file, navigate to http://localhost:3000/api-json

# Tests

```
cd server
npm i
npm run test:cov
npm run test:e2e
```
