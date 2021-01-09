/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import NavigationBar from '../components/CustomStyledComponent/NavigationBar';
import {CustomText} from '../components/CustomStyledComponent/Text';
import {View, Image, ScrollView, SafeAreaView} from 'react-native';
import Tag from '../components/Home/Tag';
import {cardStyles} from '../components/Home/Card';
import {Button} from '../components/CustomStyledComponent/Button/CustomButton';
import {Colors} from '../utils/Colors';

import FeatherIcon from 'react-native-vector-icons/Feather';
import {SliderBox} from 'react-native-image-slider-box';

export default ({navigation: {navigate}, route}) => {
  const [images, setImages] = useState([
    require('../assets/img/cat.jpg'),
    require('../assets/img/bag.jpg'),
    require('../assets/img/dang.jpg'),
  ]);

  const [currentIdx, setCurrent] = useState(0);
  useEffect(() => {
    route.params.img ? setImages([route.params.img]) : null;
  }, [route.params.img]);

  return (
    <SafeAreaView>
      <ScrollView style={{paddingHorizontal: 20}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
          }}>
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
            }}
            source={images[0]}
          />
          <View style={{paddingHorizontal: 15}}>
            <CustomText fontWeight="500" fontSize={18}>
              อาจารย์แดง กีตาร์
            </CustomText>
          </View>
        </View>
        <View style={{marginVertical: 5}}>
          <CustomText fontWeight="bold" type="subheader">
            {route.params.title ? route.params.title : null}
          </CustomText>
        </View>
        <View style={cardStyles.tagContainer}>
          {['วันพระใหญ่', 'เบิ้มๆ', 'คือลือ', 'บรรลุอรหันต์'].map((item) => (
            <Tag key={item} text={item} />
          ))}
        </View>

        {images.length > 0 ? (
          <SliderBox
            onCurrentImagePressed={(idx) => {
              // const img = images.filter((_, i) => i !== idx);
              // setImages(img);
            }}
            on
            sliderBoxHeight={250}
            images={images}
          />
        ) : null}
        {/* <View style={{justifyContent: 'center'}}>
          <Image
            style={{
              width: '100%',
              height: 250,
              marginVertical: 10,
              borderRadius: 10,
            }}
            source={images[currentIdx]}
          />
          {currentIdx > 0 ? (
            <FeatherIcon
              onPress={() => setCurrent(currentIdx - 1)}
              style={{
                position: 'absolute',
                alignSelf: 'flex-start',
                fontWeight: 'bold',
                textShadowRadius: 10,
                textShadowColor: '#000',
              }}
              name="arrow-left"
              size={30}
              color={Colors.white}
            />
          ) : null}
          {currentIdx < images.length - 1 ? (
            <FeatherIcon
              onPress={() => setCurrent(currentIdx + 1)}
              style={{
                position: 'absolute',
                alignSelf: 'flex-end',
                fontWeight: 'bold',
                textShadowRadius: 10,
                textShadowColor: '#000',
              }}
              name="arrow-right"
              size={30}
              color={Colors.white}
            />
          ) : null}
        </View> */}
        <CustomText>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.{' '}
        </CustomText>

        <View>
          <Button text="ส่งคำขอ" bg={Colors._indigo_600} color={Colors.white} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
