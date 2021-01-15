import React from 'react';
import {View, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import {ItemChatCard} from '../../components/Chat/ChatCard';
import {Colors, PantoneColor} from '../../utils/Colors';
import {CustomText} from '../../components/CustomStyledComponent/Text';
import {Button} from '../../components/CustomStyledComponent/Button/CustomButton';
import Feather from 'react-native-vector-icons/Feather';

const PersonModal = ({navigation, requests, route}) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Button onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={25} />
          </Button>
          <View>
            <CustomText color={PantoneColor.livingCoral}>
              คนที่กำลังขอรับ
            </CustomText>
            <CustomText>
              <CustomText fontWeight="bold">{route.params.itemName}</CustomText>
              <CustomText> ของคุณ</CustomText>
            </CustomText>
          </View>
        </View>

        <ScrollView style={styles.scrollContainer}>
          {[1, 2, 0, 3, 6, 9, 21, 5, 7].map((item) => (
            <ItemChatCard
              key={item.toString()}
              title="Stamp Watcharin"
              type="Person"
              notification={item}
              imgSrc={require('../../assets/img/stamp.png')}
              lastestMsg={{from: 'Stamp', msg: 'ผมจะบริจาคให้ 1000 บาท'}}
              onPress={() =>
                navigation.navigate('ChatRoom', {name: 'Stamp Watcharin'})
              }
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: Colors.white, flex: 1},
  scrollContainer: {
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default PersonModal;
