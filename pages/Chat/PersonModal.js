import React from 'react';
import {View, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import {ItemChatCard} from '../../components/Chat/ChatCard';
import {Colors, PantoneColor} from '../../utils/Colors';
import {CustomText} from '../../components/CustomStyledComponent/Text';
import {Button} from '../../components/CustomStyledComponent/Button/CustomButton';
import Feather from 'react-native-vector-icons/Feather';

const PersonModal = ({navigation, requests, route}) => {
  return (
    <View style={{backgroundColor: Colors.white}}>
      <SafeAreaView>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Button onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={25} />
          </Button>
          <View>
            <CustomText color={PantoneColor.livingCoral}>
              ของกำลังส่งต่อให้
            </CustomText>
            <CustomText>{route.params.user}</CustomText>
          </View>
        </View>

        <ScrollView style={styles.container}>
          {[1, 2, 0, 3, 6, 9, 21, 5, 7].map((item) => (
            <ItemChatCard
              title="กระเป๋า anello"
              imgSrc={require('../../assets/img/bag.jpg')}
              notification={item}
              onPress={() =>
                navigation.navigate('ChatRoom', {name: route.params.user})
              }
              key={item}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});

export default PersonModal;
