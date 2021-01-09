import React from 'react';
import {View, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import {ItemChatCard} from '../../components/Chat/ChatCard';

const PersonModal = ({navigation, requests, route}) => {
  return (
    <View>
      <SafeAreaView>
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
