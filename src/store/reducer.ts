
import { ActionType, State } from '../types/types';

export const initialState: State = {
  city: 'Paris',
  offers: [],
};

export function reducer(
  state: State = initialState,
  action: ActionType
): State {
  switch (action.type) {
    case 'SET_CITY':
      return {
        ...state,
        city: action.payload,
      };
    case 'SET_OFFERS':
      return {
        ...state,
        offers: action.payload,
      };
    default:
      return state;
  }
}
