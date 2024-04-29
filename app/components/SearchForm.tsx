"use client";
import { useState } from 'react';
import Link from 'next/link';
import { addTorrent } from '@/app/lib/deluge';
import Result from '@/app/types/result';
import filterData from '@/app/lib/filterData';
import searchUrl from '@/app/lib/searchUrl';
import Error from '@/app/components/Error';
import Loading from '@/app/components/Loading';

export default function SearchForm() {
  const emptyResults = { data: [] };
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(emptyResults);

  const resetStates = () => {
    setError('');
    setLoading(false);
    setResults(emptyResults);
  }

  const search = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetStates();

    const query = (event.target as HTMLFormElement).query.value; 

    if (query.length == 0) {
      setError('Enter something!')
      return;
    }

    setLoading(true);

    await fetch(searchUrl(query))
      .then((res) => { 
        if (res.status === 200) {
          setLoading(false);
          res.json().then((data) => setResults(filterData(data)))
        }
      })
      .catch((err) => { 
        setLoading(false);
        setError(err.message);
      });
  }

  const enqueue = (event: any) => {
    event.preventDefault();
    
    const link = event.target as HTMLLinkElement;
    addTorrent(link.href);   
  };

  return (
    <>
      <form onSubmit={search} className="w-3/4">
        <div className="p-4">
          <input type="text" name="query" placeholder="The Shining" className="w-full border-2 border-slate-500 bg-slate-50 w-3/4 p-4 mt-10"/>
        </div>

        { error ? (<Error message={error}/>) : '' }

        <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
          <button type="submit" className="bg-green-600 text-2xl font-bold text-white px-10 p-4 mx-auto">Search</button>
        </div>

        <div className="container min-w-full flex flex-col items-center">
          <a href={process.env.NEXT_PUBLIC_DELUGE_WEBUI || 'http://localhost:8112'} className="font-semibold text-xl" target="_blank">Deluge</a>
        </div>
      </form>

      { loading ? (<Loading/>) : '' }

      <ul>
        {results.data.map((result: Result, idx) => (
          <li key={idx}>
            ({result.seeders} {result.size}) <Link href={result.magnet || result.torrent} onClick={enqueue} className="underline font-semibold">{result.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
