import {QueryResult, useQuery} from '@apollo/client';
import {useCallback, useEffect, useState} from 'react';
import {
  GetRequestsQueryType,
  GET_MY_RECEIVING_ITEM,
} from '../../graphql/query/request';
import {useDispatch} from '../../store';

export const useMySendRquestsQuery = (): [
  QueryResult<GetRequestsQueryType>,
  () => Promise<void>,
  boolean,
] => {
  const dispatch = useDispatch();
  const query = useQuery<GetRequestsQueryType>(GET_MY_RECEIVING_ITEM);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    if (query.data?.getMySendRequests) {
      console.log('query sent requests');
      dispatch({
        type: 'SET_MY_SEND_REQUETS',
        payload: query.data.getMySendRequests.slice(0).sort((a, b) => {
          return b.chat.lastestUpdate - a.chat.lastestUpdate;
        }),
      });
    }
  }, [query.data]);

  const refetch = useCallback(async () => {
    setRefreshing(true);
    try {
      await query.refetch();
      setRefreshing(false);
    } catch (err) {
      console.log(err);
    }
  }, [query]);

  return [query, refetch, refreshing];
};
