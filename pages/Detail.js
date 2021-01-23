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
import {connect, useSelector} from 'react-redux';
import {sendRequestAction} from '../store/actions/request';
import {useMutation} from '@apollo/client';
import {CREATE_REQUEST} from '../graphql/mutation/request';
import {CLEAR_REQUEST_DATA, SET_REQUEST_ITEM_ID} from '../store/types/request';
import store from '../store';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modalbox';

const connector = connect(() => ({}), {
  sendRequestAction,
  setRequestItemId: (payload) => (dispatch) =>
    dispatch({
      type: SET_REQUEST_ITEM_ID,
      payload,
    }),
  clearRequestData: () => (dispatch) => dispatch({type: CLEAR_REQUEST_DATA}),
});

const Detail = (props) => {
  const navigation = useNavigation();
  const {route} = props;
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAlert, setAlert] = useState(false);
  const [shareOpen, setShare] = useState(false);
  const {owner} = route.params;
  const userData = useSelector((state) => state.user.userData);
  const [loading, setLoading] = useState(false);
  const [createRequest] = useMutation(CREATE_REQUEST);

  return (
    <DismissKeyboard>
      <SafeAreaView style={{flex: 1}}>
        <ShareModal isOpen={shareOpen} onClosed={() => setShare(false)} />
        <Modal
          isOpen={loading}
          swipeToClose={false}
          style={{alignItems: 'center', justifyContent: 'center'}}>
          <CustomText>กรุณารอสักครู่....</CustomText>
          <Button
            color="#000"
            text="test"
            onPress={() => console.log(loading)}
          />
        </Modal>
        <AlertDialog
          open={isAlert}
          onClosePress={() => {
            props.clearRequestData();
            setAlert(false);
          }}
          onConfirm={() => {
            setAlert(false);
            setModalOpen(false);
            props.setRequestItemId(route.params.id);
            props.sendRequestAction(createRequest, navigation.navigate);
          }}
          title="ยืนยันคำขอ"
          content="คำขอจะถูกส่งไปหาเจ้าของ และจะทำการสร้างห้องแชทอัตโนมัติ"
        />
        <RequestModal
          name={route.params.name}
          isOpen={isModalOpen}
          onClosePress={() => {
            // props.clearRequestData();
            setModalOpen(false);
          }}
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
              <Image style={styles.userImg} source={{uri: owner.avatar}} />
              <View style={{paddingHorizontal: 15}}>
                <CustomText fontWeight="500" fontSize={18}>
                  {owner.info.firstName} {owner.info.lastName}
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
              {route.params.tags.map((tag, i) => (
                <Tag key={i} text={tag} />
              ))}
            </View>
          </View>

          {route.params.images.length > 0 && route.params.images[0] !== '' ? (
            <SliderBox
              onCurrentImagePressed={(idx) => {}}
              dotColor={PantoneColor.livingCoral}
              ImageComponentStyle={{
                backgroundColor: 'transparent',
                width: '97%',
                borderRadius: 15,
              }}
              TouchableHighlight="#fff"
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
              resizeMethod={'resize'}
              resizeMode={'cover'}
              paginationBoxVerticalPadding={20}
              imageLoadingColor="#2196F3"
              sliderBoxHeight={400}
              images={route.params.images}
            />
          ) : null}

          <View style={{padding: 20}}>
            <CustomText fontSize={16}>{route.params.description}</CustomText>
          </View>
        </ScrollView>
        {userData && userData.getMyInfo.id !== owner.id ? (
          <View>
            <Button
              text="ส่งคำขอ"
              onPress={() => setModalOpen(true)}
              bg={PantoneColor.blueDepths}
              color={Colors.white}
            />
          </View>
        ) : null}
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

export default connector(Detail);
