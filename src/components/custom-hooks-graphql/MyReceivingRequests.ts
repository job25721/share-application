import {QueryResult, useQuery} from '@apollo/client';
import {useCallback, useEffect, useState} from 'react';
import {
  GetRequestsQueryType,
  GET_MY_REQUESTS,
} from '../../graphql/query/request';
import {useDispatch} from '../../store';

export const useMyReceivingRequestsQuery = (): [
  QueryResult<GetRequestsQueryType>,
  () => Promise<void>,
  boolean,
] => {
  const dispatch = useDispatch();
  const query = useQuery<GetRequestsQueryType>(GET_MY_REQUESTS);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    if (query.data?.getMyRequests) {
      const {getMyRequests} = query.data;
      console.log('query requests');
      dispatch({
        type: 'SET_MY_RECEIVE_REQUETS',
        payload: getMyRequests.slice(0).sort((a, b) => {
          return b.chat.lastestUpdate - a.chat.lastestUpdate;
        }),
      });
    }
  }, [dispatch, query.data]);

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
