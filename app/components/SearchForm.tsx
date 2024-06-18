"use client";
import { useReducer } from 'react';
import { reducer, initialState } from '@/app/lib/reducer';
import { search } from '@/app/lib/search';
import DelugeLink from '@/app/components/DelugeLink';
import Flash from '@/app/components/Flash';
import Loading from '@/app/components/Loading';
import Results from '@/app/components/Results';
import SearchButton from '@/app/components/SearchButton';

export default function SearchForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <form onSubmit={(e) => search(e, dispatch)} className="w-3/4">
        <div className="p-4">
          <input type="text" name="query" placeholder="The Shining" className="w-full border-2 border-slate-500 bg-slate-50 w-3/4 p-4 mt-10"/>
        </div>

        { state.flash ? (<Flash flash={state.flash}/>) : '' }

        { state.loading ? (<Loading/>) : (<SearchButton/>) }

        <DelugeLink/>
      </form>

      <Results results={state.results} dispatch={dispatch} />
    </>
  );
}
