"use server"

import { qBittorrentClient, TorrentAddParameters } from '@robertklep/qbittorrent';

const qBittorrentUrl = process.env.NEXT_PUBLIC_QBITTORRENT_URL || 'http://localhost:8080';
const qBittorrentUser = process.env.NEXT_PUBLIC_QBITTORRENT_USER || 'admin';
const qBittorrentPass = process.env.NEXT_PUBLIC_QBITTORRENT_PASS || 'adminadmin';

const client = new qBittorrentClient(qBittorrentUrl, qBittorrentUser, qBittorrentPass);
client.search.updatePlugins();

const addTorrent = async (url: string) => {
  await client.torrents.add(<TorrentAddParameters>{ urls: [url], seedingTimeLimit: 720 });
}

const getTorrents = async () => {
  const results = await client.torrents.info({ filter: 'all' })
    .catch((err) => { console.error(err); return [] });
  return JSON.stringify(results); 
}

const deleteTorrent = async (hash: string) => {
  await client.torrents.delete([hash], true);
}

const startSearch = (query: string) => {
  return client.search.start(query);
}

const searchResults = (id: number) => {
  return client.search.results(id);
}

const clearSearch = (id: number) => {
  return client.search.delete(id);
}

export { addTorrent, deleteTorrent, getTorrents, startSearch, searchResults, clearSearch };
