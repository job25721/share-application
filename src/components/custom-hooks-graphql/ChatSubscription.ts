import {useEffect} from 'react';

import {NewDirectMessage} from '../../graphql/subcription/chat';

import {UpdateRequestPayload} from '../../store/chat/actions';
import {User} from '../../store/user/types';

interface Props {
  newDirectMessage: NewDirectMessage;
  currentUser: User;
}

export const useChatSubscription: React.FC<Props> = ({
  SubscribeMessageAction,
  newDirectMessage,
  currentUser,
}) => {
  useEffect(() => {
    if (newDirectMessage) {
      SubscribeMessageAction(
        newDirectMessage,
        {
          requestId: newDirectMessage.requestId,
          itemId: undefined,
        },
        currentUser ? currentUser.id : '',
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newDirectMessage]);
  return null;
};
