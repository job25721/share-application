import {useSubscription} from '@apollo/client';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  CHAT_SUBSCRIPTION,
  NewDirectMessage,
} from '../../graphql/subcription/chat';
import {RootState, useDispatch} from '../../store';

export const useChatSubscription = () => {
  const dispatch = useDispatch();
  const newDirect = useSubscription<{newDirectMessage: NewDirectMessage}>(
    CHAT_SUBSCRIPTION,
  );

  const currentUser = useSelector((state: RootState) => state.user.userData);

  useEffect(() => {
    if (
      newDirect.data &&
      currentUser?.id === newDirect.data.newDirectMessage.to
    ) {
      dispatch({
        type: 'SET_NEW_DIRECT',
        payload: newDirect.data.newDirectMessage,
      });
      dispatch({type: 'ADD_CHAT_NOTIFICATION'});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newDirect.data, currentUser]);
  return null;
};
