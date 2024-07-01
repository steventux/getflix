import Torrent from "./torrent";

export default interface QueueResult {
  connected: boolean
  torrents: TorrentsObject
}
interface TorrentsObject {
  [key: string]: Torrent
}
