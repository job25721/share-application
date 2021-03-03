import {useSubscription} from '@apollo/client';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {NEW_REQUEST} from '../../graphql/subcription/request';
import {RootState, useDispatch} from '../../store';
import {Request} from '../../store/request/types';

export const useRequestSubscription = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.userData);
  const newRequest = useSubscription<{newRequest: Request}>(NEW_REQUEST);

  useEffect(() => {
    if (
      newRequest.data &&
      newRequest.data.newRequest.item.owner.id === currentUser?.id
    ) {
      console.log('in new');
      dispatch({
        type: 'ADD_MY_RECEIVE_REQUETS',
        payload: newRequest.data.newRequest,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newRequest.data, currentUser]);
  return null;
};
