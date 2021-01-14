/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, StyleSheet, SafeAreaView, View} from 'react-native';
import NavigationBar from '../../components/CustomStyledComponent/NavigationBar';
import {ItemChatCard, PersonChatCard} from '../../components/Chat/ChatCard';
import {Colors, PantoneColor} from '../../utils/Colors';
import {CustomText} from '../../components/CustomStyledComponent/Text';
import {Button} from '../../components/CustomStyledComponent/Button/CustomButton';
import Feather from 'react-native-vector-icons/Feather';

const ChatIndex = (props) => {
  const {navigation} = props;
  return (
    <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>
      <View style={{flexDirection: 'row'}}>
        <Button onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={30} />
        </Button>
        <CustomText color={PantoneColor.livingCoral} fontSize={35}>
          Chat
        </CustomText>
      </View>
      <ScrollView style={styles.container}>
        <PersonChatCard
          name="Pathomporn Pankaew"
          onPress={() =>
            navigation.navigate('PersonModal', {user: 'Pathomporn Pankaew'})
          }
        />
        <PersonChatCard
          name="แสตมป์ ขุนแผน"
          onPress={() =>
            navigation.navigate('PersonModal', {user: 'แสตมปื ขุนแผน'})
          }
        />
        {/* <ItemChatCard
        title="กระเป๋า anello (เจ้าของ Stamp)"
        imgSrc={require('../../assets/img/bag.jpg')}
        notification={2}
        onPress={() =>
          navigation.navigate('ChatRoom', {name: 'Stamp Watcharin'})
        }
      /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});

export default ChatIndex;
