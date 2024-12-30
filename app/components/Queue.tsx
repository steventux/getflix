import { useState, useEffect } from "react";
import { getTorrents } from "@/app/lib/qbittorrent";
import QueueResult from "@/app/types/queueResult";
import Torrent from "@/app/types/torrent";


export default function Queue() {
  const [queueResults, setQueueResults] = useState<QueueResult[]>([]);

  const fetchQueueResults = () => {
    getTorrents().then((rawData) => {
      const rawQueueResults: QueueResult[] = JSON.parse(rawData);
      const filteredQueueResults = rawQueueResults.filter((result: QueueResult) => {
        ['downloading', 'completed'].includes(result.state);
      });
      setQueueResults(filteredQueueResults);
    }).catch((err) => { console.error(err) });
  }

  useEffect(() => {
    fetchQueueResults();
    const intervalId = window.setInterval(() => fetchQueueResults(), 5000);
    return () => { clearInterval(intervalId) };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      { queueResults.length > 0 && (
        <ul>
          { queueResults.map((queueResult: QueueResult, idx: number) => (
            <li key={idx}>
              <div className="flex justify-between">
                <span className="text-base font-medium text-blue-700 dark:text-white">{queueResult.name}</span>
                <span className="text-sm font-medium text-blue-700 dark:text-white pl-2">{Math.round(queueResult.progress * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: Math.round(queueResult.progress * 100) + '%' }}></div>
              </div>
            </li>
          )) }
        </ul>
      ) }
    </div>
  );
}
