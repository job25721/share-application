/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Alert, Text} from 'react-native';
import {Colors} from '../utils/Colors';
import NavigationBar from '../components/CustomStyledComponent/NavigationBar';
import {DismissKeyboard} from '../components/CustomStyledComponent/DismissKeyboard';
import {CustomText} from '../components/CustomStyledComponent/Text';
import {Input} from '../components/CustomStyledComponent/Input/CustomInput';
import {Button} from '../components/CustomStyledComponent/Button/CustomButton';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Tag from '../components/Home/Tag';
import Card from '../components/Search/column';
import {ScrollView} from 'react-native-gesture-handler';

export default (props) => {
  const {
    navigation: {navigate},
  } = props;
  return (
    <DismissKeyboard>
      <NavigationBar navigate={navigate}>
        <View style={styles.container}>
          <View>
            <CustomText type="header">Search</CustomText>
          </View>
          <View style={{flexDirection: 'row', marginVertical: 10}}>
            <Input focus placeholder="Search" width="70%" />
            <Button
              onPress={() => Alert.alert('รักอาจารย์ชินค้าบบ')}
              rounded
              text={<FeatherIcon name="search" size={30} />}
              bg={Colors._indigo_500}
              color={Colors.white}
              py={10}
            />
          </View>
          <View style={{marginBottom: 10}}>
            <View style={{marginBottom: 10}}>
              <CustomText type="subheader">Trending</CustomText>
            </View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {[
                'เบื้มๆ',
                'คือลือน่ะ',
                'ผมจะบริจาคให้คุณ 1000',
                'แต่ว่า',
                'ให้คุณอมของลับให้ผม',
              ].map((item) => (
                <Tag text={item} />
              ))}
            </View>
          </View>

          <CustomText type="subheader">Result</CustomText>
          <ScrollView>
            {[1, 2, 3, 4, 5].map((item) => (
              <Card key={item} />
            ))}
          </ScrollView>
        </View>
      </NavigationBar>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
});
