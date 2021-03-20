/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  CustomText,
  Button,
  AlertDialog,
  DismissKeyboard,
} from '../components/custom-components';
import {
  View,
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Platform,
} from 'react-native';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import {Colors, PantoneColor} from '../utils/Colors';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SliderBox} from '../components/react-native-image-slider-box';

import {ShareModal, RequestModal} from '../components/Detail/';

import {CREATE_REQUEST} from '../graphql/mutation/request';

import Tag from '../components/Home/Tag';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {RootStackParamList} from '../../App';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {useMutation} from '@apollo/client';
import {createRequestAction} from '../store/request/actions';
import {useDispatch} from '../store';
import Modal from 'react-native-modalbox';
import {
  ADD_WISHLIST_ITEM,
  REMOVE_WISHLIST_ITEM,
} from '../graphql/mutation/user';

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
  const userData = useSelector((state: RootState) => state.user.userData);
  const mySendRequests = useSelector(
    (state: RootState) => state.request.mySendRequests,
  );

  const onRequestLoading = useSelector(
    (state: RootState) => state.request.onRequestLoading,
  );
  const dispatch = useDispatch();
  const [createRequest] = useMutation(CREATE_REQUEST);
  const {item, wishlist} = route.params;
  const [saved, setSaved] = useState<boolean>(wishlist);

  const [AddNewBookmark] = useMutation(ADD_WISHLIST_ITEM);
  const [RemoveBookmark] = useMutation(REMOVE_WISHLIST_ITEM);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasRequested, setHasRequetsed] = useState<boolean>(false);
  useEffect(() => {
    const requested = mySendRequests.some(
      (req) => req.item.id === item.id && req.status === 'requested',
    );
    setHasRequetsed(requested);
  }, [mySendRequests, item.id]);

  const addToWishlist = async () => {
    try {
      setLoading(true);
      const res = await AddNewBookmark({
        variables: {
          itemId: item.id,
        },
      });
      if (res.errors) {
        throw res.errors;
      }
      dispatch({type: 'ADD_MY_SAVED_ITEM', payload: item});
      setSaved(true);
      setLoading(false);
    } catch (err) {
      setSaved(false);

      dispatch({type: 'REMOVE_SAVED_ITEM', payload: item.id});
      // console.log(err);
    }
  };

  const removeWishlist = async () => {
    try {
      setLoading(true);
      const res = await RemoveBookmark({
        variables: {
          itemId: item.id,
        },
      });
      if (res.errors) {
        throw res.errors;
      }
      dispatch({type: 'REMOVE_SAVED_ITEM', payload: item.id});
      setSaved(false);

      setLoading(false);
    } catch (err) {
      setSaved(true);

      dispatch({type: 'ADD_MY_SAVED_ITEM', payload: item});
      // console.log(err);
    }
  };

  return (
    <DismissKeyboard>
      <SafeAreaView style={{flex: 1}}>
        <ShareModal isOpen={shareOpen} onClosed={() => setShare(false)} />
        <Modal
          style={{justifyContent: 'center', alignItems: 'center'}}
          isOpen={onRequestLoading.loading}
          swipeToClose={false}>
          <Image
            source={require('../assets/img/logo.png')}
            style={{width: 150, height: 150, borderRadius: 100}}
          />
          <CustomText textAlign="center">{onRequestLoading.msg}</CustomText>
          {onRequestLoading.err && (
            <Button
              bg={PantoneColor.blueDepths}
              color={Colors.white}
              text="ลองใหม่"
              onPress={() =>
                dispatch({
                  type: 'SET_REQUEST_LOADING',
                  payload: {msg: '', loading: false, err: false},
                })
              }
            />
          )}
        </Modal>
        <AlertDialog
          open={isAlert}
          onClosePress={() => {
            setAlert(false);
          }}
          onConfirm={() => {
            setAlert(false);
            setModalOpen(false);
            dispatch({type: 'SET_REQUEST_ITEM_ID', payload: item.id});
            if (Platform.OS === 'android') {
              AndroidKeyboardAdjust.setAdjustResize();
            }
            createRequestAction(createRequest, navigation)(dispatch);
          }}
          title="ยืนยันคำขอ"
          content="คำขอจะถูกส่งไปหาเจ้าของ และจะทำการสร้างห้องแชทอัตโนมัติ"
        />
        <RequestModal
          name={item.name}
          isOpen={isModalOpen}
          onClosePress={() => {
            setModalOpen(false);
            dispatch({type: 'CLEAR_REQUEST_DATA'});
          }}
          onSubmit={() => setAlert(true)}
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
              <Button
                onPress={() =>
                  navigation.navigate('Profile', {
                    visitor: item.owner.id !== userData?.id ? true : false,
                    userInfo: item.owner,
                  })
                }
                px={0}
                py={0}>
                <Image
                  style={styles.userImg}
                  source={{uri: item.owner.avatar}}
                />
              </Button>
              <View style={{paddingHorizontal: 15}}>
                <CustomText fontWeight="500" fontSize={18}>
                  {item.owner.info.firstName} {item.owner.info.lastName}
                </CustomText>
              </View>
              <View style={styles.optionsView}>
                {/* <Button onPress={() => setShare(true)} px={0}>
                  <MaterialCommunityIcons size={30} name="share" />
                </Button> */}
                <Button color={Colors.black} px={0}>
                  {(!saved && !loading && (
                    <Button px={0} onPress={addToWishlist}>
                      <FeatherIcon name="bookmark" size={30} />
                    </Button>
                  )) ||
                    (!loading && (
                      <Button px={0} onPress={removeWishlist}>
                        <MaterialCommunityIcons name="bookmark" size={31} />
                      </Button>
                    ))}
                  {loading ? (
                    <Image
                      style={{width: 60, height: 60}}
                      source={require('../assets/img/loadingIndicator/ball.gif')}
                    />
                  ) : null}
                </Button>
              </View>
            </View>

            <CustomText fontWeight="bold" fontSize={23}>
              {item.name ? item.name : null}
            </CustomText>
            <CustomText>ประเภท : {item.category}</CustomText>

            <View style={styles.tagView}>
              {item.tags.map((tag, i) => (
                <Tag key={i} text={tag} />
              ))}
            </View>
          </View>

          {item.images.length > 0 && item.images[0] !== '' ? (
            //   <Image source={{uri:route}} />
            <SliderBox
              dotColor={PantoneColor.livingCoral}
              ImageComponentStyle={{
                backgroundColor: 'transparent',
                width: '97%',
                borderRadius: 15,
              }}
              TouchableHighlight="#fff"
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 0,
                padding: 0,
                margin: 0,
                backgroundColor: 'rgba(128, 128, 128, 0.92)',
              }}
              paginationBoxVerticalPadding={20}
              sliderBoxHeight={400}
              images={item.images}
            />
          ) : null}

          <View style={{padding: 20}}>
            <CustomText fontSize={16}>{item.description}</CustomText>
          </View>
        </ScrollView>
        {userData && userData.id !== item.owner.id ? (
          <View>
            <Button
              text={!hasRequested ? 'ส่งคำขอ' : 'ส่งคำขอแล้ว'}
              onPress={!hasRequested ? () => setModalOpen(true) : undefined}
              bg={!hasRequested ? PantoneColor.blueDepths : '#e6e6e6'}
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

export default Detail;
