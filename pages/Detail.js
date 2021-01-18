/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {CustomText} from '../components/CustomStyledComponent/Text';
import {View, Image, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import Tag from '../components/Home/Tag';

import {Button} from '../components/CustomStyledComponent/Button/CustomButton';
import {Colors, PantoneColor} from '../utils/Colors';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SliderBox} from 'react-native-image-slider-box';
import RequestModal from '../components/RequestModal';
import {DismissKeyboard} from '../components/CustomStyledComponent/DismissKeyboard';
import AlertDialog from '../components/AlertDialog';
import ShareModal from '../components/ShareModal';

const Detail = ({navigation, route}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAlert, setAlert] = useState(false);
  const [shareOpen, setShare] = useState(false);

  return (
    <DismissKeyboard>
      <SafeAreaView style={{flex: 1}}>
        <ShareModal isOpen={shareOpen} onClosed={() => setShare(false)} />
        <AlertDialog
          open={isAlert}
          onClosePress={() => setAlert(false)}
          onConfirm={() => {
            navigation.navigate('Chat');
            setAlert(false);
            setModalOpen(false);
          }}
          title="ยืนยันคำขอ"
          content="คำขอจะถูกส่งไปหาเจ้าของ และจะทำการสร้างห้องแชทอัตโนมัติ"
        />
        <RequestModal
          name={route.params.name}
          isOpen={isModalOpen}
          onClosePress={() => setModalOpen(false)}
          onSubmit={() => setAlert(true)}
          navigation={navigation}
        />

        <View style={styles.header}>
          <Button px={0} onPress={() => navigation.goBack()}>
            <View style={styles.backBtnView}>
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
          <View style={{paddingHorizontal: 20}}>
            <View style={styles.userDetailView}>
              <Image
                style={styles.userImg}
                source={require('../assets/img/stamp.png')}
              />
              <View style={{paddingHorizontal: 15}}>
                <CustomText fontWeight="500" fontSize={18}>
                  {route.params.owner}
                </CustomText>
              </View>
              <View style={styles.optionsView}>
                <Button onPress={() => setShare(true)} px={0}>
                  <MaterialCommunityIcons size={30} name="share" />
                </Button>
                <Button color={Colors.black} px={0}>
                  {route.params.bookmarked ? (
                    <MaterialCommunityIcons size={30} name="bookmark" />
                  ) : (
                    <FeatherIcon size={30} name="bookmark" />
                  )}
                </Button>
              </View>
            </View>

            <CustomText fontWeight="bold" fontSize={23}>
              {route.params.name ? route.params.name : null}
            </CustomText>
            <CustomText>ประเภท : {route.params.category}</CustomText>

            <View style={styles.tagView}>
              {route.params.tags.map((tag) => (
                <Tag key={tag.id} text={tag.name} />
              ))}
            </View>
          </View>

          {route.params.images.length > 0 && route.params.images[0] !== '' ? (
            <SliderBox
              onCurrentImagePressed={(idx) => {}}
              dotColor="#FFEE58"
              ImageComponentStyle={{
                borderRadius: 15,
                width: '97%',
                marginTop: 5,
              }}
              inactiveDotColor="#90A4AE"
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 0,
                padding: 0,
                margin: 0,
                backgroundColor: 'rgba(128, 128, 128, 0.92)',
              }}
              imageLoadingColor="#2196F3"
              sliderBoxHeight={400}
              images={route.params.images}
            />
          ) : null}

          <View style={{padding: 20}}>
            <CustomText fontSize={16}>{route.params.description}</CustomText>
          </View>
        </ScrollView>
        <View>
          <Button
            text="ส่งคำขอ"
            onPress={() => setModalOpen(true)}
            bg={PantoneColor.blueDepths}
            color={Colors.white}
          />
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  header: {paddingLeft: 10, marginTop: 10},
  backBtnView: {flexDirection: 'row', alignItems: 'center'},
  userDetailView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  tagView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  optionsView: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
  },
});

export default Detail;
