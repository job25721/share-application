import React from 'react';
import {ScrollView, View, Image, StyleSheet, Text, Alert} from 'react-native';
import {Colors} from '../components/CustomStyledComponent/Colors';
import AppABar from '../components/Appbar';
import {DismissKeyboard} from '../components/DismissKeyboard';
import {CustomText} from '../components/CustomStyledComponent/Text';
import {Input} from '../components/CustomStyledComponent/Input/CustomInput';
import {Button} from '../components/CustomStyledComponent/Button/CustomButton';
import FeatherIcon from 'react-native-vector-icons/Feather';
import CardList from '../components/CardList';
import {Card} from '../components/CustomStyledComponent/Card/Card';

export default (props) => {
  return (
    <DismissKeyboard>
      <AppABar navigate={props.navigation.navigate}>
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
        <View style={{paddingTop: '10%'}}>
          <CustomText color={Colors._indigo_600} spacing={5} type="header">
            SHARE
          </CustomText>
        </View>
        <ScrollView>
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
          <View style={{flexDirection: 'row', height: 230}}>
            {[1, 2, 3].map((item) => (
              <CardList key={item} />
            ))}
          </View>
          <View style={{marginVertical: 20}}>
            <CustomText fontSize={22} fontWeight={'bold'}>
              Trending
            </CustomText>
          </View>
          <View style={{alignItems: 'center'}}>
            {[require('../assets/img/dang.jpg'), '', '', ''].map((item, i) => (
              <Card key={i} img={item}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                    }}
                    source={require('../assets/img/dang.jpg')}
                  />
                  <View style={{paddingHorizontal: 10}}>
                    <CustomText fontSize={20}>อาจารย์แดง กีตาร์</CustomText>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </ScrollView>
      </AppABar>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
