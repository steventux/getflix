"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import Result from '@/app/types/result';

interface ResultItemProps {
  item: Result;
}

function ResultItem({item}: ResultItemProps) {
  const href = item.magnet ? item.magnet : item.torrent;
  return (
    <li>
      (S:{item.seeders} {item.size}) <Link href={href} className="underline font-semibold">{item.name}</Link>
    </li>
  );
}

export default function SearchForm() {
  const emptyResults = { data: [] };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(emptyResults);

  const torrentApiSearchUrl: string = `${process.env.NEXT_PUBLIC_TORRENT_API_BASE_URL}/api/v1/all/search`;
  const categories: string[] = ["Movie", "Television"];

  const filterData = (data:any) => {
    const filteredData = {
      data: data.data.filter((d: Result) => categories.includes(d.category))
                      .toSorted((a: Result, b: Result) => Number(b.seeders) - Number(a.seeders))
    };
    setResults(filteredData);
  }

  const search = async (event:any) => {
    event.preventDefault();

    const query = event.target.query.value; 

    if (query.length == 0) {
      setError('Enter something!')
      return;
    }

    setError('');
    setLoading(true);
    setResults(emptyResults);

    const searchUrl = `${torrentApiSearchUrl}?query=${query}&limit=10`;

    await fetch(searchUrl)
      .then((res) => { 
        if (res.status === 200) {
          setLoading(false);
          res.json().then((data) => filterData(data))
        }
      })
      .catch((err) => { setLoading(false); setError(err); });
  }

  return (
    <>
      <form onSubmit={search} className="w-3/4">
        <div className="p-4">
          <input type="text" name="query" placeholder="The Shining" className="w-full border-2 border-slate-500 bg-slate-50 w-3/4 p-4 mt-10"/>
        </div>
        { error ? (<div className="text-red-600 font-bold flex flex-col items-center">{error}</div>) : '' }
        <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
          <button type="submit" className="bg-green-600 text-2xl font-bold text-white px-10 p-4 mx-auto">Search</button>
        </div>
      </form>

      { loading ? (
        <div className="flex flex-col items-center">
          <Image src="/loading-300.gif" height={200} width={200} alt="Loading..." />
        </div>
      ) : '' }

      <ul>
        {results.data.map((result: Result, idx) => (
          <ResultItem item={result} key={idx} />
        ))}
      </ul>
    </>
  );
}
