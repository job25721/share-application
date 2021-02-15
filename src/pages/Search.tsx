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
import {RootState} from '../store';
import {useQuery} from '@apollo/client';
import {GET_TREANDING_TAG, TrendingTagQueryResult} from '../graphql/query/item';

const Search: React.FC = () => {
  const searchResult = useSelector(
    (state: RootState) => state.item.searchResult,
  );
  const [onSearch, setOnSearch] = useState<boolean>(false);
  const [searchKey, setSearchKey] = useState<string>('');
  const [submitSearchKey, setSubmit] = useState<string>('');
  const {data} = useQuery<TrendingTagQueryResult>(GET_TREANDING_TAG);

  useSearch({searchKey: submitSearchKey === '' ? '!' : submitSearchKey});
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
              onClearBtnPress={() => {
                setSearchKey('');
                setSubmit('');
              }}
            />
            <Button
              onPress={() => {
                if (searchKey !== '') {
                  setSubmit(searchKey);
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
                        setSubmit(tag.name);
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
                <CustomText type="subheader">ผลลัพธ์</CustomText>
                {searchResult.length > 0 && (
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
                        setSubmit('');
                        setSearchKey('');
                      }}
                      px={5}>
                      <FeatherIcon color={Colors._red_500} name="x" size={30} />
                    </Button>
                  </View>
                )}
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
