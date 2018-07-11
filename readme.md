# Utopian v2 - API

### Quick instructions:

1. Copy `.env.example` to `.env` and adjust variable values.
2. Generate **Firebase admin credentials file** and place on the project root as **`'service-account.json'`**.

### Building:

> Build for server usage (HTTPS server outside firebase).

```
npm run build:server
```

> Build for firebase deployment.

```
npm run build:firebase
```

### Development

> Run development server:

```
npm run dev
```

// include deploy.