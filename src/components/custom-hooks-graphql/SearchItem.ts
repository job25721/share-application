import {useQuery} from '@apollo/client';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {SearchResult, SEARCH_ITEM_BY_KEYWORD} from '../../graphql/query/item';
import {RootState, useDispatch} from '../../store';

export interface SearchHookType {
  searchKey: string;
}
export const useSearch: React.FC<SearchHookType> = ({searchKey}) => {
  const dispatch = useDispatch();

  const {data} = useQuery<SearchResult>(SEARCH_ITEM_BY_KEYWORD, {
    variables: {searchKey: searchKey || '!'},
  });

  const searchResult = useSelector(
    (state: RootState) => state.item.searchResult,
  );

  useEffect(() => {
    if (data) {
      dispatch({type: 'SET_SEARCH_RESULT', payload: data.searchItem});
    }
  }, [data, dispatch, searchResult]);

  return null;
};
