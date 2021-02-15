import {QueryResult, useQuery} from '@apollo/client';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {SearchResult, SEARCH_ITEM_BY_KEYWORD} from '../../graphql/query/item';
import {RootState, useDispatch} from '../../store';

export interface SearchHookType {
  searchKey: string;
}
export const useSearch: React.FC<SearchHookType> = ({
  searchKey,
}): QueryResult<SearchResult> => {
  const searchResult = useSelector(
    (state: RootState) => state.item.searchResult,
  );
  const dispatch = useDispatch();

  const searchQuery = useQuery<SearchResult>(SEARCH_ITEM_BY_KEYWORD, {
    variables: {searchKey: searchKey},
  });

  useEffect(() => {
    if (searchQuery.data) {
      dispatch({
        type: 'SET_SEARCH_RESULT',
        payload: searchQuery.data.searchItem,
      });
    }
  }, [searchQuery.data, searchResult]);

  return searchQuery;
};
