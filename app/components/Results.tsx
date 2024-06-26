import Result from '@/app/types/result';
import ResultsData from '@/app/types/resultsData';
import Link from 'next/link';
import { addTorrent } from '@/app/lib/deluge';
import { ReducerActionType } from '@/app/lib/reducer';


export default function Results({results, dispatch}: {results: ResultsData, dispatch: Function}) {
  const enqueue = (event: any, idx: number) => {
    event.preventDefault();
    
    const link = event.target as HTMLLinkElement;
    addTorrent(link.href);
    dispatch({ type: ReducerActionType.ADD_TO_QUEUE, payload: idx });

    setTimeout(() => {
      dispatch({ type: ReducerActionType.SET_FLASH, payload: {} });
    }, 3000);
  };

  const resultMeta = (result: Result) => {
    return `(${result.seeders} ${result.size})`;
  }

  const resultLink = (result: Result) => {
    return result.magnet || result.torrent;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {results.data?.length > 0 && (
        <ul>
          {results.data.map((result: Result, idx: number) => (
            <li key={idx}>
              {resultMeta(result)} <Link href={resultLink(result)} onClick={(e) => enqueue(e, idx)} className="underline font-semibold">{result.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
