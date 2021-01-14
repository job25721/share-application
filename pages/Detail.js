/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {CustomText} from '../components/CustomStyledComponent/Text';
import {View, Image, ScrollView, SafeAreaView} from 'react-native';
import Tag from '../components/Home/Tag';
import {cardStyles} from '../components/Home/Card';
import {Button} from '../components/CustomStyledComponent/Button/CustomButton';
import {Colors, PantoneColor} from '../utils/Colors';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {SliderBox} from 'react-native-image-slider-box';

export default ({navigation, route}) => {
  const [images, setImages] = useState([
    require('../assets/img/cat.jpg'),
    require('../assets/img/bag.jpg'),
    require('../assets/img/dang.jpg'),
  ]);

  useEffect(() => {
    route.params.img ? setImages([route.params.img]) : null;
  }, [route.params.img]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{paddingLeft: 10, marginTop: 10}}>
        <Button px={0} onPress={() => navigation.goBack()}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FeatherIcon
              style={{paddingRight: 10}}
              name="arrow-left"
              size={30}
            />
            <CustomText>Back</CustomText>
          </View>
        </Button>
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}>
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
            }}
            source={require('../assets/img/stamp.png')}
          />
          <View style={{paddingHorizontal: 15}}>
            <CustomText fontWeight="500" fontSize={18}>
              Stamp Watcharin
            </CustomText>
            <CustomText
              fontWeight="500"
              fontSize={14}
              color={PantoneColor.blueDepths}>
              <FeatherIcon color={Colors._red_500} name="map-pin" size={18} />
              Chiang Mai University
            </CustomText>
          </View>
        </View>
        <View style={{marginVertical: 5, paddingHorizontal: 20}}>
          <CustomText fontWeight="bold" fontSize={23}>
            {route.params.title ? route.params.title : null}
          </CustomText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: 10,
            paddingHorizontal: 20,
          }}>
          {['วันพระใหญ่', 'เบิ้มๆ', 'คือลือ', 'บรรลุอรหันต์'].map((item) => (
            <Tag key={item} text={item} />
          ))}
        </View>

        {images.length > 0 ? (
          <SliderBox
            onCurrentImagePressed={(idx) => {}}
            on
            sliderBoxHeight={250}
            images={images}
          />
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingHorizontal: 25,
          }}>
          <Button color={Colors.black} px={0}>
            <FeatherIcon size={30} name="bookmark" />
          </Button>
          <CustomText>Wishlist</CustomText>
        </View>
        <View style={{height: 200, paddingHorizontal: 20}}>
          <CustomText fontSize={16}>
            ต้องการส่งต่อให้คนที่กำลังเรียนครับ พอดีผมเรียน จบแล้ว
            ไม่รู้จะเอาไว้ที่ไหน อยากรับต่อกดรับเลยครับ แล้ว นัดรับแถวหลังมอ
            ในมอเรื่องเวลาค่อยคุยกัน หลังไมค์ครับ
          </CustomText>
        </View>
      </ScrollView>
      <View>
        <Button
          text="ส่งคำขอ"
          bg={PantoneColor.turkishSea}
          color={Colors.white}
        />
      </View>
    </SafeAreaView>
  );
};
