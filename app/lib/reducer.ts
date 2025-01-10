import Result from '@/app/types/result';
import { Flash, FlashType } from '@/app/lib/flash';

export enum ReducerActionType {
  SET_RESULTS = 'SET_RESULTS',
  RESET = 'RESET',
  SET_FLASH = 'SET_FLASH',
  SET_LOADING = 'SET_LOADING',
  ADD_TO_QUEUE = 'ADD_TO_QUEUE'
};

export type State = { results: Result[], flash: Flash, loading: boolean };

type ReducerAction = { type: ReducerActionType.SET_RESULTS, payload: Result[] } |
                     { type: ReducerActionType.SET_FLASH, payload: Flash } |
                     { type: ReducerActionType.SET_LOADING, payload: boolean } |
                     { type: ReducerActionType.ADD_TO_QUEUE, payload: number } |
                     { type: ReducerActionType.RESET };

const reducer = (state = initialState, action: ReducerAction) => {
  switch (action.type) {
    case ReducerActionType.SET_RESULTS:
      return {
        ...state,
        results: action.payload,
        flash: initialFlashState,
        loading: false,
      };

    case ReducerActionType.RESET:
      return initialState;

    case ReducerActionType.SET_FLASH:
      return {
        ...state,
        results: state.results,
        flash: action.payload,
        loading: false,
      };

    case ReducerActionType.SET_LOADING:
      return {
        ...state,
        results: initialResultsState,
        flash: initialFlashState,
        loading: action.payload,
      };

    case ReducerActionType.ADD_TO_QUEUE:
      const results = state.results.filter((r, index) => index !== action.payload);
      const result = state.results[action.payload];

      return {
        ...state,
        results: results,
        flash: { type: FlashType.MESSAGE, message: `${result.fileName} added to queue` },
        loading: false,
      };

    default:
      return state;
  }
}

const initialResultsState: Result[] = [];
const initialFlashState: Flash = {};

const initialState: State = {
  results: initialResultsState,
  flash: initialFlashState,
  loading: false,
};

export { reducer, initialState };
