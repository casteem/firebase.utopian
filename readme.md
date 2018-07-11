# Utopian v2 - API

<p align="center">
  <img src="https://cdn.steemitimages.com/DQmVV3aEvdcwPR6RuJebHWLmibTBtwsLQoc3AnD7RQFE9DA/utopian-post-banner.png" />
</p>

### Quick instructions:

1. Copy `.env.example` to `.env` and adjust variable values.
2. Generate **Firebase admin credentials file** and place on the project root as **`service-account.json`**.

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

### Deployment.

For deployment on Firebase, it's required to configure the project name, that can be done by
creating a file **`.firebaserc`** on the root folder.

```
{
  "projects": {
    "default": "utopian-io"
  }
}
```