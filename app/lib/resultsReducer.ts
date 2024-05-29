import ResultsData from '@/app/types/resultsData';

type ResultsAction = { type: string, payload: ResultsData };

const resultsReducer = (state = initialResultsState, action: ResultsAction) => {
  switch (action.type) {
    case 'SET_RESULTS':
      return {
        ...state,
        results: action.payload,
      };
    default:
      return state;
  }
}

const initialResultsState: ResultsData = { data: [] };

export { resultsReducer, initialResultsState };
