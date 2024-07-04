# getflix

A NextJS search form that can be used with [Torrent-Api-py](https://github.com/Ryuk-me/Torrent-Api-py) and [Deluge](https://deluge-torrent.org/).

Always consider running Deluge from a VPN connection. See https://github.com/binhex/arch-delugevpn for a container based solution.


![image](https://github.com/steventux/getflix/assets/93511/53abcfe3-aac2-4b02-8e44-2ceaa399e14f)


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started


First, configure .env.local or similar with details of your Torrent-Api-py and Deluge services.

```
NEXT_PUBLIC_TORRENT_API_BASE_URL=http://localhost:8009
NEXT_PUBLIC_DELUGE_URL=http://localhost:8112/json
NEXT_PUBLIC_DELUGE_WEBUI=http://localhost:8112/
NEXT_PUBLIC_DELUGE_PASS=deluge
NEXT_PUBLIC_DELUGE_PATH=/data/complete
```

Now you can run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
