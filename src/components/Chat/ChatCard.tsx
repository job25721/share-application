import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {ChatStackParamList} from '../../../App';
import {FindUserByIdQuery, GET_USER_BY_ID} from '../../graphql/query/user';
import {RootState, useDispatch} from '../../store';
import {ChatMessageDisplay} from '../../store/chat/types';

import {Item} from '../../store/item/types';
import {Request, requestStatusNormalized} from '../../store/request/types';

import {Colors, PantoneColor} from '../../utils/Colors';
import {getTime} from '../../utils/getTime';

import {CustomText} from '../custom-components';
import ProgressiveImage from '../custom-components/ProgressiveImage';

type ChatCardType = 'Person' | 'Item';
interface ItemChatCardProps {
  notification?: number;
  latestMsg?: {from: string; msg: string};
  request: Request;
  type: ChatCardType;
}

const ItemChatCard: React.FC<ItemChatCardProps> = ({
  notification = 0,
  latestMsg = {from: '', msg: ''},
  request,
  type,
}) => {
  const {navigate} = useNavigation<StackNavigationProp<ChatStackParamList>>();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.userData);
  const {data, error, loading, refetch} = useQuery<FindUserByIdQuery>(
    GET_USER_BY_ID,
    {
      variables: {userID: latestMsg.from},
    },
  );

  if (loading) {
    return <CustomText>Loading..</CustomText>;
  }

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch({
          type: 'SET_CHAT_WITH',
          payload: type === 'Item' ? request.item.owner : request.requestPerson,
        });
        const chatDisplay: ChatMessageDisplay[] = request.chat.data.map(
          (chatData) => {
            return {
              pos: currentUser?.id === chatData.from ? 'right' : 'left',
              msg: chatData.message.split('\n'),
              time: getTime(new Date(chatData.timestamp).getTime()),
            };
          },
        );
        dispatch({type: 'SET_MESSAGE', payload: chatDisplay});
        dispatch({
          type: 'SET_CURRENT_PROCESS_REQUEST',
          payload: request,
        });
        navigate('ChatRoom');
      }}
      style={[styles.chatListCard]}>
      {type === 'Person' ? (
        <ProgressiveImage
          loadingType="rolling"
          style={styles.img}
          source={{uri: request.requestPerson.avatar}}
        />
      ) : (
        <ProgressiveImage
          loadingType="rolling"
          style={[styles.img, {height: 100}]}
          source={{uri: request.item.images[0]}}
        />
      )}
      <View style={{width: '60%'}}>
        {type === 'Person' ? (
          <>
            <CustomText fontWeight="500">
              {request.requestPerson.info.firstName}{' '}
              {request.requestPerson.info.lastName}
            </CustomText>
          </>
        ) : (
          <>
            <CustomText fontWeight="bold">{request.item.name}</CustomText>
            <CustomText>เจ้าของ {request.item.owner.info.firstName}</CustomText>
            <CustomText
              color={
                request.status === 'rejected'
                  ? Colors._red_500
                  : request.status === 'requested'
                  ? Colors._blue_400
                  : request.status === 'accepted'
                  ? Colors._green_500
                  : Colors.black
              }
              fontSize={16}>
              สถานะคำขอ : {requestStatusNormalized(request.status)}
            </CustomText>
          </>
        )}
        <View>
          {latestMsg.from !== '' && latestMsg.msg !== '' ? (
            <CustomText
              fontWeight={notification > 0 ? 'bold' : 'normal'}
              fontSize={15}
              color={
                notification && notification > 0
                  ? Colors.black
                  : 'rgb(75, 85, 99)'
              }>
              {latestMsg.from === currentUser?.id
                ? 'คุณ'
                : data && data.getUserById.info.firstName}
              {' : '}
              {latestMsg.msg.length > 14
                ? latestMsg.msg.substr(0, 14) + '....'
                : latestMsg.msg}
            </CustomText>
          ) : null}
        </View>
      </View>
      <View
        style={[
          styles.notiBadge,
          notification === 0 ? {backgroundColor: 'transparent'} : null,
        ]}>
        {notification > 0 ? (
          <CustomText textAlign="center" color={Colors.white}>
            {notification}
          </CustomText>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

interface ItemChatCardAbstractProps {
  personRequest: number;
  item: Item;
  onPress?: () => void;
}

const ItemCardAbstract: React.FC<ItemChatCardAbstractProps> = ({
  personRequest = 0,
  item,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.chatListCard]}>
      <ProgressiveImage
        loadingType="rolling"
        style={[styles.img, {height: 100}]}
        source={{uri: item.images[0]}}
      />
      <View style={{width: '60%'}}>
        <CustomText fontWeight="500">{item.name}</CustomText>
        <CustomText>ประเภท : {item.category}</CustomText>
        <CustomText>สถานะ : {item.status}</CustomText>
      </View>
      <View
        style={[styles.notiBadge, {backgroundColor: PantoneColor.blueDepths}]}>
        <CustomText textAlign="center" color={Colors.white}>
          {personRequest}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notiBadge: {
    backgroundColor: Colors._red_400,
    justifyContent: 'center',
    borderRadius: 50,
    height: 50,
    width: 50,
  },
  chatListCard: {
    backgroundColor: Colors._gray_900,
    borderRadius: 25,
    padding: 10,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginHorizontal: 10,
  },
});

export {ItemChatCard, ItemCardAbstract};
