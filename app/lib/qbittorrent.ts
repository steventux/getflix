"use server"

import { qBittorrentClient } from '@robertklep/qbittorrent';

const qBittorrentUrl = process.env.NEXT_PUBLIC_QBITTORRENT_URL || 'http://raspberrypi.local:8080';
const qBittorrentUser = process.env.NEXT_PUBLIC_QBITTORRENT_USER || 'admin';
const qBittorrentPass = process.env.NEXT_PUBLIC_QBITTORRENT_PASS || '81tt0rr3nt';

const client = new qBittorrentClient(qBittorrentUrl, qBittorrentUser, qBittorrentPass);

const addTorrent = async (url: string) => {
  await client.torrents.add(url);
}

const getTorrents = async () => {
  const results = await client.torrents.info({ filter: 'downloading|completed' });
  return JSON.stringify(results); 
}

const stopTorrent = async (hash: string) => {
  await client.request('/torrents/stop', { hashes : hash });
}

export { addTorrent, getTorrents, stopTorrent }
