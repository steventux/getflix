import { useState, useEffect } from "react";
import { getTorrents } from "@/app/lib/deluge";
import QueueResult from "@/app/types/queueResult";
import Torrent from "@/app/types/torrent";

export default function Queue() {
  const [torrents, setTorrents] = useState<Torrent[]>([]);

  const fetchTorrents = () => {
    getTorrents().then((result: QueueResult) => {
      const torrents = Object.values(result.torrents).filter((torrent: Torrent) => torrent.state === 'Downloading');
      setTorrents(torrents);
    }).catch((err) => {
      console.error(err);
    })
  }

  useEffect(() => {
    fetchTorrents();
    const intervalId = window.setInterval(() => fetchTorrents(), 5000);
    return () => { clearInterval(intervalId) };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      { torrents.length > 0 && (
        <ul>
          { torrents.map((torrent: Torrent, idx: number) => (
            <li key={idx}>
              <div className="flex justify-between">
                <span className="text-base font-medium text-blue-700 dark:text-white">{torrent.name}</span>
                <span className="text-sm font-medium text-blue-700 dark:text-white pl-2">{Math.round(torrent.progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: Math.round(torrent.progress) + '%' }}></div>
              </div>
            </li>
          )) }
        </ul>
      ) }
    </div>
  );
}
