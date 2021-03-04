import {QueryResult, useQuery} from '@apollo/client';
import {useCallback, useEffect, useState} from 'react';
import {GetAllItemQueryType, GET_ALL_ITEM} from '../../graphql/query/item';
import {useDispatch} from '../../store';

export const useFeedQuery = (): [
  QueryResult<GetAllItemQueryType>,
  () => Promise<void>,
  boolean,
] => {
  const dispatch = useDispatch();
  const query = useQuery<GetAllItemQueryType>(GET_ALL_ITEM, {
    fetchPolicy: 'network-only',
  });
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    if (query.data?.getFeedItems) {
      console.log('query feed item');
      dispatch({
        type: 'SET_FEED_ITEMS',
        payload: query.data.getFeedItems,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data]);

  const refetch = useCallback(async () => {
    setRefreshing(true);
    try {
      await query.refetch();
      setRefreshing(false);
    } catch (err) {
      throw err;
    }
  }, [query]);

  return [query, refetch, refreshing];
};
