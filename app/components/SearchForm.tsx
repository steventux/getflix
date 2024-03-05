"use client";

import { useEffect, useState } from 'react';
import Result from '@/app/types/result';
import filterData from '@/app/lib/filterData';
import searchUrl from '@/app/lib/searchUrl';
import Error from '@/app/components/Error';
import Loading from '@/app/components/Loading';
import ResultItem from '@/app/components/ResultItem';

export default function SearchForm() {
  const emptyResults = { data: [] };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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
        setError(err); 
      });
  }

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
      </form>

      { loading ? (<Loading/>) : '' }

      <ul>
        {results.data.map((result: Result, idx) => (
          <ResultItem item={result} key={idx} />
        ))}
      </ul>
    </>
  );
}
