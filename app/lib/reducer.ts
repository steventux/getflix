import Result from '@/app/types/result';

export enum ReducerActionType {
  SET_RESULTS = 'SET_RESULTS',
  RESET = 'RESET',
  SET_ERROR = 'SET_ERROR',
  SET_LOADING = 'SET_LOADING'
};
type ResultsData = { data: Result[] };
type ReducerAction = { type: ReducerActionType.SET_RESULTS, payload: ResultsData } |
                     { type: ReducerActionType.SET_ERROR, payload: string } |
                     { type: ReducerActionType.SET_LOADING, payload: boolean } |
                     { type: ReducerActionType.RESET };
export type State = { results: ResultsData, error: string, loading: boolean };

const reducer = (state = initialState, action: ReducerAction) => {
  switch (action.type) {
    case ReducerActionType.SET_RESULTS:
      return {
        ...state,
        results: action.payload,
        error: '',
        loading: false,
      };

    case ReducerActionType.RESET:
      return initialState;

    case ReducerActionType.SET_ERROR:
      return {
        ...state,
        results: initialResultsState,
        error: action.payload,
        loading: false,
      };

    case ReducerActionType.SET_LOADING:
      return {
        ...state,
        results: initialResultsState,
        error: '',
        loading: action.payload,
      };

    default:
      return state;
  }
}

const initialResultsState: ResultsData = { data: [] };

const initialState: State = {
  results: initialResultsState,
  error: '',
  loading: false,
};

export { reducer, initialState };
