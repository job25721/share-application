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
  const query = useQuery<GetAllItemQueryType>(GET_ALL_ITEM);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    if (query.data?.getAllItem) {
      console.log('query item');
      dispatch({
        type: 'SET_FEED_ITEMS',
        payload: query.data.getAllItem.filter(
          ({status}) => status === 'available',
        ),
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
