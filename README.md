# getflix

A NextJS search form that can be used with [QBittorrent](https://www.qbittorrent.org/).

Always run QBittorrent from a VPN connection. See https://github.com/binhex/arch-qbittorrentvpn for a docker container with QBittorrent and VPN network.


![image](https://github.com/steventux/getflix/assets/93511/53abcfe3-aac2-4b02-8e44-2ceaa399e14f)


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started


First, configure .env.local or similar with details of your QBittorrent installation.

```
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NEXT_PUBLIC_QBITTORRENT_URL=http://localhost:8080
NEXT_PUBLIC_QBITTORRENT_USER=admin
NEXT_PUBLIC_QBITTORRENT_PASS=adminadmin
```

Now you can run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running the tests

```bash
npm run test
```

## Deployment

To deploy this project, you can use the following commands:

```bash
npm run build
npm run prod_start
```


This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Docker

To build and run this project in a docker container, use the following commands:

```bash
docker build -t getflix .
docker run -p 3000:3000 getflix
```

or use docker compose:

```bash
docker compose --build up
```

or use the Makefile:

```bash
make build
make run
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
