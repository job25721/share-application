/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Keyboard,
} from 'react-native';

import {
  DismissKeyboard,
  CustomText,
  Input,
  Button,
} from '../components/custom-components';
import {Colors} from '../utils/Colors';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Tag from '../components/Home/Tag';
import {SearchResultCard} from '../components/Search';
import {useSearch} from '../components/custom-hooks-graphql/SearchItem';
import {useSelector} from 'react-redux';
import {RootState, useDispatch} from '../store';
import {QueryResult, useQuery} from '@apollo/client';
import {GET_TREANDING_TAG, TrendingTagQueryResult} from '../graphql/query/item';
import {RouteProp} from '@react-navigation/native';
import {TabParamList} from '.';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

type SearchScreenRouteProp = RouteProp<TabParamList, 'Search'>;
type SearchScreenNavigationProp = BottomTabNavigationProp<
  TabParamList,
  'Search'
>;

type Props = {
  route: SearchScreenRouteProp;
  navigation: SearchScreenNavigationProp;
};
const Search: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const {searchResult, submitSearchKey} = useSelector(
    (state: RootState) => state.item,
  );
  const [onSearch, setOnSearch] = useState<boolean>(false);
  const [searchKey, setSearchKey] = useState<string>('');

  const {data} = useQuery<TrendingTagQueryResult>(GET_TREANDING_TAG);

  const searchQuery: QueryResult = useSearch({
    searchKey: submitSearchKey === '' ? '!' : submitSearchKey,
  });

  useEffect(() => {
    if (submitSearchKey !== '') {
      setOnSearch(true);
    } else {
      setOnSearch(false);
    }
  }, [submitSearchKey]);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onKeyboardShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardHide);
    };
  }, []);

  const onKeyboardShow = () => {
    setOnSearch(true);
  };

  const onKeyboardHide = () => {
    setOnSearch(false);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <DismissKeyboard>
        <View style={styles.container}>
          {!onSearch && searchKey === '' && (
            <View>
              <CustomText type="header">ค้นหา</CustomText>
            </View>
          )}

          <View
            style={{
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginVertical: 10,
            }}>
            <Input
              backgroundColor={Colors._gray_500}
              placeholder="ค้นหา..."
              width="80%"
              value={searchKey}
              onChangeText={setSearchKey}
              onClearBtnPress={() =>
                dispatch({type: 'SET_SEARCH_SUBMIT', payload: ''})
              }
            />
            <Button
              onPress={() => {
                if (searchKey !== '') {
                  dispatch({type: 'SET_SEARCH_SUBMIT', payload: searchKey});
                  Keyboard.dismiss();
                }
              }}>
              <FeatherIcon
                style={{alignSelf: 'center'}}
                name="search"
                size={40}
              />
            </Button>
          </View>

          {!onSearch && searchResult.length === 0 && searchKey === '' && (
            <View style={{marginBottom: 10}}>
              <View style={{marginBottom: 10}}>
                <CustomText type="subheader">แท็กที่กำลังมาแรง</CustomText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {data &&
                  data.getMostUsedTag.map((tag) => (
                    <Tag
                      onPress={() => {
                        setSearchKey(tag.name);
                        dispatch({
                          type: 'SET_SEARCH_SUBMIT',
                          payload: tag.name,
                        });
                      }}
                      key={tag.id}
                      text={tag.name}
                    />
                  ))}
              </View>
            </View>
          )}

          {onSearch || searchResult.length > 0 || searchKey !== '' ? (
            <>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    position: 'absolute',
                    right: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <CustomText fontSize={20}>Clear</CustomText>
                  <Button
                    onPress={() => {
                      dispatch({type: 'SET_SEARCH_SUBMIT', payload: ''});
                      setSearchKey('');
                      dispatch({type: 'SET_SEARCH_RESULT', payload: []});
                    }}
                    px={5}>
                    <FeatherIcon color={Colors._red_500} name="x" size={30} />
                  </Button>
                </View>
                {(searchResult.length > 0 && (
                  <>
                    <CustomText type="subheader">ผลลัพธ์</CustomText>
                  </>
                )) ||
                  (!searchQuery.loading && (
                    <CustomText>
                      ไม่มีผลลัพธ์ใดตรงกับ{' '}
                      <CustomText fontWeight="bold">
                        {submitSearchKey}
                      </CustomText>
                    </CustomText>
                  )) || <CustomText fontSize={25}>กำลังค้นหา</CustomText>}
              </View>

              <ScrollView>
                {searchResult.map((item) => (
                  <SearchResultCard key={item.id} item={item} />
                ))}
              </ScrollView>
            </>
          ) : null}
        </View>
      </DismissKeyboard>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
  },
});

export default Search;
