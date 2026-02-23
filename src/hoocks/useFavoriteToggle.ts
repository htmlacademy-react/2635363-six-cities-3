import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store-hooks';
import { useCallback } from 'react';
import { toggleFavoriteServer } from '../store/offersSlice';


type ToggleArgs = {
  id: string;
  isFavorite: boolean;
}

export const useFavoriteToggle = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector((state) => state.auth.authorizationStatus);

  const toggleFavoriteWithAuth = useCallback(
    ({ id, isFavorite }: ToggleArgs) => {
      if (authorizationStatus !== 'AUTH') {
        navigate('/login');
        return;
      }
      dispatch(
        toggleFavoriteServer({
          offerId: id,
          status: isFavorite ? 0 : 1,
        })
      );
    }, [authorizationStatus, dispatch, navigate]
  );
  return toggleFavoriteWithAuth;
};
