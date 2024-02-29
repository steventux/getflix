"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Result from '@/app/types/result';

export default function SearchForm() {
  const [error, setError] = useState('');
  const [results, setResults] = useState({ data: [] });

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
    if (query.length == 0) return;

    const searchUrl = `${torrentApiSearchUrl}?query=${query}&limit=10`;

    await fetch(searchUrl)
      .then((res) => { 
        if (res.status === 200) res.json().then((data) => filterData(data))
      })
      .catch((err) => { setError(err); });
  }

  return (
    <>
      <form onSubmit={search}>
        <div className="justify-center">
          <input type="text" name="query" placeholder="The Shining"/>
          <button type="submit">Search</button>
        </div>
      </form>
      { error ? (<p>{error}</p>) : '' }
      <ul>
        {results.data.map((result: Result, idx) => (
          <li key={idx}>(seeders: {result.seeders}, size: {result.size}) <Link href={result.magnet}>{result.name}</Link></li>
        ))}
      </ul>
    </>
  );
}
