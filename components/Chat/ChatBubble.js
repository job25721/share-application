/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Clipboard,
} from 'react-native';
import {Colors, PantoneColor} from '../../utils/Colors';

import {CustomText} from '../CustomStyledComponent/Text';

export default (props) => {
  const {msg, pos, time} = props;
  const copy = async () => {
    var str = '';
    msg.forEach((m, i) => {
      str += m;
      if (i !== msg.length - 1) str += '\n';
    });
    await Clipboard.setString(str);
    alert('คัดลอกสำเร็จ');
  };
  return msg ? (
    <TouchableOpacity
      style={[
        bubbleStyles.container,
        pos === 'left' ? bubbleStyles.left : bubbleStyles.right,
      ]}
      onLongPress={() => copy()}>
      <View
        style={[
          pos === 'left' ? bubbleStyles.msgLeft : bubbleStyles.msgRight,
          bubbleStyles.msgContainer,
        ]}>
        {msg.map((m, i) => (
          <CustomText fontSize={17} color={Colors.white} key={i}>
            {m}
          </CustomText>
        ))}
      </View>
      <View style={{paddingHorizontal: 5}}>
        <CustomText fontSize={12} textAlign={pos === 'left' ? 'right' : 'left'}>
          {time}
        </CustomText>
      </View>
    </TouchableOpacity>
  ) : null;
};

const bubbleStyles = StyleSheet.create({
  container: {
    maxWidth: '70%',
    marginVertical: 5,
    alignItems: 'flex-end',
  },
  msgContainer: {
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 5 : 10,
    borderRadius: 20,
  },
  msgLeft: {
    backgroundColor: PantoneColor.livingCoral,
  },
  msgRight: {
    backgroundColor: PantoneColor.blueDepths,
  },
  left: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  right: {
    flexDirection: 'row-reverse',
    alignSelf: 'flex-end',
  },
});
