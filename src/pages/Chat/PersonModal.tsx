import React, {useEffect} from 'react';
import {View, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import {ItemChatCard} from '../../components/Chat/ChatCard';
import {Colors, PantoneColor} from '../../utils/Colors';
import {CustomText, Button} from '../../components/custom-components';

import Feather from 'react-native-vector-icons/Feather';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ChatStackParamList} from '../../../App';

type PersonScreenRouteProp = RouteProp<ChatStackParamList, 'Person'>;
type PersonScreenNavigationProp = StackNavigationProp<
  ChatStackParamList,
  'Person'
>;

type Props = {
  route: PersonScreenRouteProp;
  navigation: PersonScreenNavigationProp;
};

const PersonModal: React.FC<Props> = ({navigation, route}) => {
  const {requests, itemName} = route.params;
  useEffect(() => {
    // console.log(requests);
  }, []);
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
              <CustomText fontWeight="bold">{itemName}</CustomText>
              <CustomText> ของคุณ</CustomText>
            </CustomText>
          </View>
        </View>

        <ScrollView style={styles.scrollContainer}>
          {requests.map(({id, requestPerson: {info, avatar}}) => (
            <ItemChatCard
              key={id}
              type="Person"
              title={`${info.firstName} ${info.lastName}`}
              imgSrc={avatar}
              latestMsg={{from: info.firstName, msg: 'ซาหวัดดีค้าบบบ'}}
              notification={1}
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
