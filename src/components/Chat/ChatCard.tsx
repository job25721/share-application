import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {ChatStackParamList} from '../../../App';

import {Item} from '../../store/item/types';

import {User} from '../../store/user/types';
import {Colors, PantoneColor} from '../../utils/Colors';

import {CustomText} from '../custom-components';
import ProgressiveImage from '../custom-components/ProgressiveImage';

type ChatCardType = 'Person' | 'Item';
interface ItemChatCardProps {
  notification?: number;
  latestMsg?: {from: string; msg: string};
  owner: User;
  requestPerson: User;
  item: Item;
  requestStatus: string;
  type: ChatCardType;
}

const ItemChatCard: React.FC<ItemChatCardProps> = ({
  notification = 0,
  latestMsg = {from: '', msg: ''},
  owner,
  requestPerson,
  requestStatus,
  item,
  type,
}) => {
  const {navigate} = useNavigation<StackNavigationProp<ChatStackParamList>>();
  return (
    <TouchableOpacity
      onPress={() =>
        navigate('ChatRoom', {
          chatWith: type === 'Item' ? owner : requestPerson,
          requestStatus,
          item,
        })
      }
      style={[styles.chatListCard]}>
      {type === 'Person' ? (
        <ProgressiveImage
          loadingType="rolling"
          style={styles.img}
          source={{uri: requestPerson.avatar}}
        />
      ) : (
        <ProgressiveImage
          loadingType="rolling"
          style={styles.img}
          source={{uri: item.images[0]}}
        />
      )}
      <View style={{width: '60%'}}>
        {type === 'Person' ? (
          <>
            <CustomText fontWeight="500">
              {requestPerson.info.firstName} {requestPerson.info.lastName}
            </CustomText>
          </>
        ) : (
          <>
            <CustomText fontWeight="500">{item.name}</CustomText>
            <CustomText>เจ้าของ {owner.info.firstName}</CustomText>
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
              {latestMsg.from} :{' '}
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
        style={styles.img}
        source={{uri: item.images[0]}}
      />
      <View style={{width: '60%'}}>
        <CustomText fontWeight="500">{item.name}</CustomText>
        <CustomText>ประเภท : {item.category}</CustomText>
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
    justifyContent: 'space-evenly',
    shadowColor: Colors.black,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginHorizontal: 10,
  },
});

export {ItemChatCard, ItemCardAbstract};
