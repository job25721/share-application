import React from 'react';
import {ScrollView, View, Image, StyleSheet, Alert} from 'react-native';
import {Colors} from '../utils/Colors';
import NavigationBar from '../components/CustomStyledComponent/NavigationBar';
import {DismissKeyboard} from '../components/CustomStyledComponent/DismissKeyboard';
import {CustomText} from '../components/CustomStyledComponent/Text';
import {Input} from '../components/CustomStyledComponent/Input/CustomInput';
import {Button} from '../components/CustomStyledComponent/Button/CustomButton';
import FeatherIcon from 'react-native-vector-icons/Feather';
import CardList from '../components/Home/CardList';
import {Card} from '../components/Home/Card';

export default (props) => {
  const {
    navigation: {navigate},
  } = props;
  return (
    <DismissKeyboard>
      <NavigationBar navigate={navigate}>
        <View style={styles.headerContainer}>
          <Image source={require('../assets/img/logo2.png')} />
          <View style={{flexDirection: 'row'}}>
            <View style={{justifyContent: 'center', paddingRight: 10}}>
              <CustomText fontSize={14}>Pathomporn Pankaew</CustomText>
              <CustomText fontSize={14} textAlign="right">
                @Job55140
              </CustomText>
            </View>
            <Image source={require('../assets/img/profile.png')} />
          </View>
        </View>
        <View style={{padding: 20}}>
          <CustomText color={Colors._indigo_600} spacing={5} type="header">
            SHARE
          </CustomText>
        </View>
        <ScrollView style={{paddingHorizontal: 10}}>
          <View style={{flexDirection: 'row'}}>
            <Input focus placeholder="Search" width="70%"></Input>
            <Button
              onPress={() => Alert.alert('รักอาจารย์ชินค้าบบ')}
              rounded
              text={<FeatherIcon name="search" size={30} />}
              bg={Colors._indigo_500}
              color={Colors.white}
              py={10}
            />
          </View>
          <View style={{marginTop: 20, marginBottom: 10}}>
            <CustomText fontSize={20} fontWeight={'bold'}>
              เลือกหมวดหมู่ที่ใช่
            </CustomText>
            <CustomText fontSize={20} fontWeight={'bold'}>
              สำหรับคุณ
            </CustomText>
          </View>
          <ScrollView horizontal style={{height: 230}}>
            {[1, 2, 3, 4].map((item) => (
              <CardList key={item} />
            ))}
          </ScrollView>
          <View style={{marginVertical: 20}}>
            <CustomText fontSize={22} fontWeight={'bold'}>
              Trending
            </CustomText>
          </View>
          <View style={{alignItems: 'center'}}>
            {[
              {
                name: 'Stamp Watcharin',
                title: 'หาคนเลี้ยงแมวต่อครับ',
                img: '',
                tag: ['สัตว์เลี้ยง', 'แมว', 'น้อนนน'],
              },
              {
                name: 'อาจารย์แดง กีตาร์',
                title: 'คู่มือห้ามฝึกจิต',
                img: {uri: 'https://fq.lnwfile.com/zp2qee.jpg'},
                tag: ['วันพระใหญ่', 'เบิ้มๆ', 'คือลือ', 'บรรลุอรหันต์'],
              },
            ].map((item, i) => (
              <Card
                key={i}
                img={item.img}
                title={item.title}
                name={item.name}
                tag={item.tag}
                navigate={props.navigation.navigate}
              />
            ))}
          </View>
        </ScrollView>
      </NavigationBar>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
});
