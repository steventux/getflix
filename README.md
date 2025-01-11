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
QBITTORRENT_URL=http://localhost:8080
QBITTORRENT_USER=admin
QBITTORRENT_PASS=adminadmin
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


## Docker compose

This project can be run as a pair of containerised services using `docker compose`.

The [binhex-qbittorrentvpn container can be configured with different VPN providers](https://github.com/binhex/arch-qbittorrentvpn/tree/master?tab=readme-ov-file#usage), the current compose.yml file for Getflix assumes use of an OpenVPN provider.

1. Add your own VPN authentication credentials to the compose.yml file.

2. Create local `./.compose/data` and `./.compose/config` directories to store the qbittorrent data and configuration files. 
    eg. To add a NordVPN OpenVPN configuration file, add the relevant file from https://nordvpn.com/ovpn/ to the `./.compose/config/openvpn/` directory.

3. Build and run the container, use the following command:

```bash
docker compose up --build
```

4. Amend the QBittorrent WebUI password after the first time you run the container.
Pay attention to the logged output and look for the line:

```
The WebUI administrator password was not set. A temporary password is provided for this session: <password>
```

5. Login to the WebUI at `http://localhost:8080` (username: admin and password from above) and set a new password. This should match the `QBITTORRENT_PASS` value in the compose.yml file.

6. Restart containers. Getflix should be able to connect to the QBittorrent service and fetch search results and enqueue torrents to download.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
