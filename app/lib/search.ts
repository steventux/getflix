import { useReducer } from 'react';
import { reducer, initialState, ReducerActionType } from '@/app/lib/reducer';
import Result from '@/app/types/result'

const baseUrl = process.env.NEXT_PUBLIC_TORRENT_API_BASE_URL || 'http://localhost:8009';
const endPoint: string = "/api/v1/all/search";
const torrentApiSearchUrl: string = `${baseUrl}${endPoint}`;
const categories = ['TV', 'Television', 'Movie', 'Other/Video'];

const searchUrl = (query: string) => {
  return `${torrentApiSearchUrl}?query=${query}&limit=10`;
}

const filterData = (data: { data: any }) => {
  return {
    data: data.data.filter((d: Result) => categories.includes(d.category))
                   .filter((d: Result) => Number(d.seeders) > 0)
                   .toSorted((a: Result, b: Result) => Number(b.seeders) - Number(a.seeders))
  };
}

const search = async (event: React.FormEvent<HTMLFormElement>, dispatch: Function) => {
  event.preventDefault();
  dispatch({ type: ReducerActionType.RESET });

  const queryField = (event.target as HTMLFormElement).elements.namedItem('query') as HTMLInputElement;
  const query = queryField.value;

  if (query.length == 0) {
    dispatch({ type: ReducerActionType.SET_ERROR, payload: 'Enter something!' });
    return;
  }

  dispatch({ type: ReducerActionType.SET_LOADING, payload: true });

  await fetch(searchUrl(query))
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: ReducerActionType.SET_LOADING, payload: false });
        res.json().then((data) => {
          dispatch({ type: ReducerActionType.SET_RESULTS, payload: filterData(data) })
        })
      }
    })
    .catch((err) => {
      dispatch({ type: ReducerActionType.SET_ERROR, payload: err.message });
    });
}

export { search };
