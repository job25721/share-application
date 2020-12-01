/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, View, StyleSheet, Alert, ScrollView} from 'react-native';
import {Button} from '../components/CustomStyledComponent/Button/CustomButton';
import {DismissKeyboard} from '../components/DismissKeyboard';
import {Input} from '../components/CustomStyledComponent/Input/CustomInput';
import {CustomText} from '../components/CustomStyledComponent/Text';
import {Card} from '../components/CustomStyledComponent/Card/Card';

export default () => {
  return (
    <DismissKeyboard>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <CustomText type="header" spacing={10}>
            แชร์ SHARE
          </CustomText>
          <CustomText type="subheader">TEST Sukhumvit F o n t</CustomText>
          <View>
            <Input placeholder="Username" />
            <Input type="password" placeholder="Password" />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
            <Button onPress={() => Alert.alert('hello world')} text="default" />
            <Button type="primary" text="primary" />
            <Button type="success" text="success" />
            <Button type="danger" text="danger" />
            <Button type="warning" text="warning" />
            <Button type="info" text="info" />
            <Button type="link" text="link" />
            <Button rounded text="rounded" />
          </View>
          {[require('../assets/img/dang.jpg'), ''].map((item) => (
            <Card key={item} img={item}>
              <CustomText type="subheader">อาจารย์แดง กีตาร์</CustomText>
              <CustomText spacing={10}>กูมีสองหี ดับเบิ้ลหี</CustomText>
              <CustomText spacing={5}>
                มึงด่ากูมึงเกลียดกู มึงเป็นอรหันต์
              </CustomText>
              <View style={{alignSelf: 'flex-start'}}>
                <Button type="info" text="Like" />
              </View>
            </Card>
          ))}
        </SafeAreaView>
      </ScrollView>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  testText: {
    fontFamily: 'Sukhumvit Set',
    fontSize: 30,
  },
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
