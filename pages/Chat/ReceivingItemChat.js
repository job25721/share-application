import React, {useEffect, useState} from 'react';
import {ItemChatCard} from '../../components/Chat/ChatCard';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {GET_MY_RECEIVING_ITEM} from '../../graphql/query/item';
import {useQuery} from '@apollo/client';
import {CustomText} from '../../components/CustomStyledComponent/Text';
import {View} from 'react-native';
import {SET_MY_RECEIVING_ITEM} from '../../store/types/item';
const mapStateToProps = (state) => ({
  receivingItem: state.item.myReceivingItem,
});

const connector = connect(mapStateToProps, {
  setMyReceivingItem: (payload) => (dispatch) =>
    dispatch({type: SET_MY_RECEIVING_ITEM, payload}),
});

const ReceivingItemChat = (props) => {
  const {data, loading, error, refetch} = useQuery(GET_MY_RECEIVING_ITEM);
  const navigation = useNavigation();

  useEffect(() => {
    const refetchingData = async () => {
      try {
        await refetch();
        if (data) {
          props.setMyReceivingItem(data.getMySendRequests);
        }
      } catch (err) {
        console.log(err);
      }
    };
    refetchingData();
  }, [data, props, refetch]);

  if (loading) {
    return (
      <View>
        <CustomText>Loading...</CustomText>
      </View>
    );
  }

  return (
    <>
      {props.receivingItem.map(({item, id}) => (
        <ItemChatCard
          key={id}
          title={item.name}
          owner={item.owner.info.firstName}
          lastestMsg={{from: 'ระบบ', msg: 'สร้างห้องแชทเรียบร้อยแล้ว'}}
          imgSrc={item.images[0]}
          notification={1}
          onPress={() =>
            navigation.navigate('ChatRoom', {
              name: `${item.owner.info.firstName} ${item.owner.info.lastName}`,
            })
          }
        />
      ))}
    </>
  );
};

export default connector(ReceivingItemChat);
