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

const Search: React.FC = () => {
  const [onSearch, setOnSearch] = useState<boolean>(false);

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
          {onSearch ? null : (
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
            />
            <Button onPress={() => Keyboard.dismiss()}>
              <FeatherIcon
                style={{alignSelf: 'center'}}
                name="search"
                size={40}
              />
            </Button>
          </View>

          {onSearch ? null : (
            <View style={{marginBottom: 10}}>
              <View style={{marginBottom: 10}}>
                <CustomText type="subheader">แท็กที่กำลังมาแรง</CustomText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {['หนังสือ', 'การเรียน', 'เสื้อผ้า', 'ของใช้', 'ของกิน'].map(
                  (item, i) => (
                    <Tag key={i} text={item} />
                  ),
                )}
              </View>
            </View>
          )}

          {onSearch ? (
            <>
              <CustomText type="subheader">ผลลัพธ์</CustomText>

              <ScrollView>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                  <SearchResultCard
                    name="หนังสือแคล 3"
                    category="หนังสือ"
                    tags={['คือลือ', 'เบิ้มๆหน่ะ']}
                    key={item}
                  />
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