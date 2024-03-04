"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import Result from '@/app/types/result';

interface ResultItemProps {
  item: Result;
  key: number;
}

function ResultItem({item, key}: ResultItemProps) {
  const href = item.magnet ? item.magnet : item.torrent;
  return (
    <li key={key}>
      (S-{item.seeders} {item.size})
      <Link href={href}>{item.name}</Link>
    </li>
  );
}

export default function SearchForm() {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    const query = event.target.query.value; 
    if (query.length == 0) return;

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
      <form onSubmit={search}>
        <div className="justify-center">
          <input type="text" name="query" placeholder="The Shining"/>
          <button type="submit">Search</button>
        </div>
      </form>
      { loading ? (<Image src="/loading-300.gif" height={200} width={200} alt="Loading..." />) : '' }
      { error ? (<p>{error}</p>) : '' }
      <ul>
        {results.data.map((result: Result, idx) => (
          <ResultItem item={result} key={idx}/>
        ))}
      </ul>
    </>
  );
}
