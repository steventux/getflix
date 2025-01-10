import { useReducer } from 'react';
import { reducer, initialState, ReducerActionType } from '@/app/lib/reducer';
import Result from '@/app/types/result'
import { FlashType } from '@/app/lib/flash';
import { startSearch, searchResults, clearSearch } from '@/app/lib/qbittorrent';

const wait = ((msec: number) => new Promise((resolve) => window.setTimeout(resolve, msec)));

const search = async (event: React.FormEvent<HTMLFormElement>, dispatch: Function) => {
  event.preventDefault();
  dispatch({ type: ReducerActionType.RESET });

  const queryField = (event.target as HTMLFormElement).elements.namedItem('query') as HTMLInputElement;
  const query: string = queryField.value;

  if (query.length == 0) {
    dispatch({ type: ReducerActionType.SET_FLASH, payload: { type: FlashType.ERROR, message: 'Enter something!' } });
    return;
  }

  dispatch({ type: ReducerActionType.SET_LOADING, payload: true });

  const id: number = await startSearch(query).catch((err) => { console.error(err); return -1 });
  await wait(5000)

  dispatch({ type: ReducerActionType.SET_LOADING, payload: false });

  const results: Result[] = await searchResults(id).catch((err) => { console.error(err); return [] });

  const sortedResults = results
    .filter((result: Result) => (result.nbSeeders > 0 && result.fileUrl.startsWith('magnet:')))
    .sort((a, b) => b.nbSeeders - a.nbSeeders);

  if (sortedResults.length == 0) {
    dispatch({ type: ReducerActionType.SET_FLASH, payload: { type: FlashType.ERROR, message: 'No results found' } });
  } else {
    dispatch({ type: ReducerActionType.SET_RESULTS, payload: sortedResults });
  }

  clearSearch(id);
}

export { search };
