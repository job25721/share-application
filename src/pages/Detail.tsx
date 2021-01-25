/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  CustomText,
  Button,
  AlertDialog,
  DismissKeyboard,
} from '../components/custom-components';
import {View, Image, ScrollView, SafeAreaView, StyleSheet} from 'react-native';

import {Colors, PantoneColor} from '../utils/Colors';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SliderBox} from '../components/react-native-image-slider-box';

import {ShareModal, RequestModal} from '../components/Detail/';
// import {sendRequestAction} from '../store/actions/request';
// import {useMutation} from '@apollo/client';

// import {CREATE_REQUEST} from '../graphql/mutation/request';

// import Modal from 'react-native-modalbox';

import Tag from '../components/Home/Tag';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {RootStackParamList} from '../../App';
import {useDispatch} from 'react-redux';
// import {useDispatch} from '../store';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;
type DetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Detail'
>;

type Props = {
  route: DetailScreenRouteProp;
  navigation: DetailScreenNavigationProp;
};
const Detail: React.FC<Props> = (props) => {
  const {navigation, route} = props;

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isAlert, setAlert] = useState<boolean>(false);
  const [shareOpen, setShare] = useState<boolean>(false);

  const dispatch = useDispatch();
  //   const [createRequest] = useMutation(CREATE_REQUEST);
  const {itemData, wishlist} = route.params;

  return (
    <DismissKeyboard>
      <SafeAreaView style={{flex: 1}}>
        <ShareModal isOpen={shareOpen} onClosed={() => setShare(false)} />

        <AlertDialog
          open={isAlert}
          onClosePress={() => {
            dispatch({type: 'CLEAR_REQUEST_DATA'});
            setAlert(false);
          }}
          onConfirm={() => {
            setAlert(false);
            setModalOpen(false);
            dispatch({type: 'SET_REQUEST_ITEM_ID', payload: itemData.id});
            // props.sendRequestAction(createRequest, navigation.navigate);
          }}
          title="ยืนยันคำขอ"
          content="คำขอจะถูกส่งไปหาเจ้าของ และจะทำการสร้างห้องแชทอัตโนมัติ"
        />
        <RequestModal
          name={itemData.name}
          isOpen={isModalOpen}
          onClosePress={() => {
            // props.clearRequestData();
            setModalOpen(false);
          }}
          onSubmit={() => setAlert(true)}
          //   navigation={navigation}
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
                source={{uri: itemData.owner.avatar}}
              />
              <View style={{paddingHorizontal: 15}}>
                <CustomText fontWeight="500" fontSize={18}>
                  {itemData.owner.info.firstName} {itemData.owner.info.lastName}
                </CustomText>
              </View>
              <View style={styles.optionsView}>
                <Button onPress={() => setShare(true)} px={0}>
                  <MaterialCommunityIcons size={30} name="share" />
                </Button>
                <Button color={Colors.black} px={0}>
                  {wishlist ? (
                    <MaterialCommunityIcons size={30} name="bookmark" />
                  ) : (
                    <FeatherIcon size={30} name="bookmark" />
                  )}
                </Button>
              </View>
            </View>

            <CustomText fontWeight="bold" fontSize={23}>
              {itemData.name ? itemData.name : null}
            </CustomText>
            <CustomText>ประเภท : {itemData.category}</CustomText>

            <View style={styles.tagView}>
              {itemData.tags.map((tag, i) => (
                <Tag key={i} text={tag} />
              ))}
            </View>
          </View>

          {itemData.images.length > 0 && itemData.images[0] !== '' ? (
            //   <Image source={{uri:route}} />
            <SliderBox
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
              images={itemData.images}
            />
          ) : null}

          <View style={{padding: 20}}>
            <CustomText fontSize={16}>{itemData.description}</CustomText>
          </View>
        </ScrollView>
        {/* {userData && userData.getMyInfo.id !== owner.id ? ( */}
        <View>
          <Button
            text="ส่งคำขอ"
            onPress={() => setModalOpen(true)}
            bg={PantoneColor.blueDepths}
            color={Colors.white}
          />
        </View>
        {/* ) : null} */}
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
