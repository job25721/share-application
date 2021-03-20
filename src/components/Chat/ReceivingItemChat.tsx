/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {ItemChatCard} from './ChatCard';

import {CustomText} from '../custom-components';
import {View} from 'react-native';
import {LazyQueryResult} from '@apollo/client';
import {GetRequestsQueryType} from '../../graphql/query/request';

const ReceivingItemChat: React.FC<{
  loading: boolean;
  query: LazyQueryResult<GetRequestsQueryType | undefined, {}>;
}> = ({loading, query}) => {
  const {mySendRequests} = useSelector((state: RootState) => state.request);
  const currentUser = useSelector((state: RootState) => state.user.userData);

  if (mySendRequests.length === 0 && !loading && query && query.data) {
    return (
      <View>
        <CustomText>ไม่มีของที่คุณขอรับ ลองหาของที่คุณอยากได้สิ!</CustomText>
      </View>
    );
  }
  return (
    <View style={{padding: 5}}>
      {mySendRequests.map((request) => (
        <ItemChatCard
          loading={loading}
          key={request.id}
          request={request}
          latestMsg={{
            from:
              request.chat.data.length > 0
                ? request.chat.data[request.chat.data.length - 1].from
                : '',
            msg:
              request.chat.data.length > 0
                ? request.chat.data[request.chat.data.length - 1].message
                : '',
          }}
          notification={
            request.chat.data.filter(
              ({hasReaded, to}) =>
                hasReaded === false && currentUser?.id === to,
            ).length
          }
          type="Item"
        />
      ))}
    </View>
  );
};

export default ReceivingItemChat;
