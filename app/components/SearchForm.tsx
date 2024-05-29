"use client";
import { useReducer } from 'react';
import Link from 'next/link';
import { addTorrent } from '@/app/lib/deluge';
import Result from '@/app/types/result';
import { reducer, initialState } from '@/app/lib/reducer';
import Error from '@/app/components/Error';
import Loading from '@/app/components/Loading';
import SearchButton from '@/app/components/SearchButton';
import { search } from '@/app/lib/search';

export default function SearchForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enqueue = (event: any) => {
    event.preventDefault();
    
    const link = event.target as HTMLLinkElement;
    addTorrent(link.href);   
  };

  return (
    <>
      <form onSubmit={(e) => search(e, dispatch)} className="w-3/4">
        <div className="p-4">
          <input type="text" name="query" placeholder="The Shining" className="w-full border-2 border-slate-500 bg-slate-50 w-3/4 p-4 mt-10"/>
        </div>

        { state.error ? (<Error message={state.error}/>) : '' }

        { state.loading ? (<Loading/>) : (<SearchButton/>) }

        <div className="container min-w-full flex flex-col items-center">
          <a href={process.env.NEXT_PUBLIC_DELUGE_WEBUI || 'http://localhost:8112'} className="font-semibold text-xl" target="_blank">Deluge</a>
        </div>
      </form>

      <ul>
        {state.results.data.map((result: Result, idx: number) => (
          <li key={idx}>
            ({result.seeders} {result.size}) <Link href={result.magnet || result.torrent} onClick={enqueue} className="underline font-semibold">{result.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
