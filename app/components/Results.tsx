import Result from '@/app/types/result';
import Link from 'next/link';
import { addTorrent } from '@/app/lib/qbittorrent';
import { ReducerActionType } from '@/app/lib/reducer';
import { bytesToSize } from '@/app/lib/bytestosize';

export default function Results({results, dispatch}: {results: Result[], dispatch: Function}) {
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
    return `(${result.nbSeeders} ${bytesToSize(result.fileSize)})`;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {results.length > 0 && (
        <ul>
          {results.map((result: Result, idx: number) => (
            <li key={idx}>
              {resultMeta(result)} <Link href={result.fileUrl} onClick={(e) => enqueue(e, idx)} className="underline font-semibold">{result.fileName}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
