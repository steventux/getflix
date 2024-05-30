import Result from '@/app/types/result';
import ResultsData from '@/app/types/resultsData';
import Link from 'next/link';
import { addTorrent } from '@/app/lib/deluge';


export default function Results({results}: {results: ResultsData}) {
  const enqueue = (event: any) => {
    event.preventDefault();
    
    const link = event.target as HTMLLinkElement;
    addTorrent(link.href);   
  };

  const resultMeta = (result: Result) => {
    return `(${result.seeders} ${result.size})`;
  }

  const resultLink = (result: Result) => {
    return result.magnet || result.torrent;
  }

  return (
    <ul>
      {results.data.map((result: Result, idx: number) => (
        <li key={idx}>
          {resultMeta(result)} <Link href={resultLink(result)} onClick={enqueue} className="underline font-semibold">{result.name}</Link>
        </li>
      ))}
    </ul>
  );
}
