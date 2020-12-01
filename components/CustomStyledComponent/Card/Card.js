import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

const imgUrl = require('../../../assets/img/cat.jpg');

export const Card = ({children, img}) => {
  return (
    <View style={styles.card}>
      <Image style={styles.img} source={img && img !== '' ? img : imgUrl} />
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 350,
    height: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    backgroundColor: '#fff',
    elevation: 3,
    borderRadius: 15,
    marginBottom: '5%',
  },
  img: {
    width: '100%',
    height: '45%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  content: {
    padding: 10,
  },
});
