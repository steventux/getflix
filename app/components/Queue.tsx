import { useState, useEffect } from "react";
import { getTorrents, deleteTorrent } from "@/app/lib/qbittorrent";
import QueueResult from "@/app/types/queueResult";

export default function Queue() {
  const [queueResults, setQueueResults] = useState<QueueResult[]>([]);

  const fetchQueueResults = () => {
    getTorrents().then((rawData) => {
      if (!rawData) return [];
      const rawQueueResults: QueueResult[] = JSON.parse(rawData);
      const filteredQueueResults = rawQueueResults.filter((result: QueueResult) => {
        return ['completed', 'downloading', 'stalledUP', 'stalled'].includes(result.state);
      });
      setQueueResults(filteredQueueResults);
    }).catch((err) => { console.error(err) });
  }

  const deleteQueuedTorrent = (event: any, hash: string) => {
    event.preventDefault();
    deleteTorrent(hash);
  }

  useEffect(() => {
    fetchQueueResults();
    const intervalId = window.setInterval(() => fetchQueueResults(), 5000);
    return () => { window.clearInterval(intervalId) };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      { queueResults.length > 0 && (
        <ul>
          { queueResults.map((queueResult: QueueResult, idx: number) => (
            <li key={idx}>
              <div className="flex justify-between w-full">
                <span className="text-base font-medium text-blue-700 dark:text-white leading-8">{queueResult.name}</span>
                <span className="text-sm font-medium text-blue-700 dark:text-white pl-2 leading-8">{Math.round(queueResult.progress * 100)}%</span>
                <span className="ml-2 mb-2">
                  <a href="#" onClick={(e) => deleteQueuedTorrent(e, queueResult.hash)} className="text-red-500" title="Delete">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="9" y1="9" x2="15" y2="15" /><line x1="15" y1="9" x2="9" y2="15" /></svg>
                  </a>
                </span>
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
