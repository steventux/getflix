import { useState, useEffect } from "react";
import { getTorrents, stopTorrent } from "@/app/lib/qbittorrent";
import QueueResult from "@/app/types/queueResult";
import Torrent from "@/app/types/torrent";


export default function Queue() {
  const [queueResults, setQueueResults] = useState<QueueResult[]>([]);

  const fetchQueueResults = () => {
    getTorrents().then((rawData) => {
      const queueResults: QueueResult[] = JSON.parse<QueueResult[]>(rawData);
      setQueueResults(queueResults);
    });
  }

  useEffect(() => {
    fetchQueueResults();
    const intervalId = window.setInterval(() => fetchQueueResults(), 5000);
    return () => { clearInterval(intervalId) };
  }, []);

  useEffect(() => {
    queueResults.forEach((queueResult: QueueResult) => {
      if (queueResult.completion_on <= 0) return;
      if (['completed', 'stoppedUP'].includes(queueResult.state)) return;

      const completed_on = parseInt(queueResult.completion_on.toString().padEnd(13, '0'));
      const elapsedTime = new Date().getTime() - queueResult.completion_on;
      // Pause the torrent after 12 hours
      if (elapsedTime > 43200000) {
        console.log(`Stopping ${queueResult.name}`);
        stopTorrent(queueResult.hash);
      }
    });
  }, [queueResults]);

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
