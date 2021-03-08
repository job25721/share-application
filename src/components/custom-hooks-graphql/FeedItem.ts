import {LazyQueryResult, useLazyQuery} from '@apollo/client';
import {useCallback, useEffect, useState} from 'react';
import {GetAllItemQueryType, GET_ALL_ITEM} from '../../graphql/query/item';
import {useDispatch} from '../../store';

export const useFeedQuery = (): [
  LazyQueryResult<GetAllItemQueryType, {}> | undefined,
  () => Promise<void>,
  boolean,
] => {
  const dispatch = useDispatch();
  const [loadItem, query] = useLazyQuery<GetAllItemQueryType>(GET_ALL_ITEM, {
    fetchPolicy: 'network-only',
  });
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    loadItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (query.data) {
      // console.log('query feed item');
      dispatch({
        type: 'SET_FEED_ITEMS',
        payload: query.data.getFeedItems,
      });
    }
  }, [dispatch, query.data]);

  const refetch = useCallback(async () => {
    if (query.refetch) {
      setRefreshing(true);
      try {
        await query.refetch();
        setRefreshing(false);
      } catch (err) {
        throw err;
      }
    }
  }, [query]);

  return [query, refetch, refreshing];
};
