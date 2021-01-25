/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../../utils/Colors';
import {CustomText} from '../custom-components';

type Props = {
  name: string;
  tags?: string[];
  category: string;
};

const SearchResultCard: React.FC<Props> = ({name, tags, category}) => {
  const [tagConcated, setTag] = useState('');
  useEffect(() => {
    if (tags) {
      let concated = '';
      tags.forEach((tag, i) => {
        if (i === tags.length - 1) {
          concated += tag;
        } else {
          concated += tag + ', ';
        }
      });
      setTag(concated);
    }
  }, [tagConcated, tags]);
  return (
    <View style={{flexDirection: 'row', marginVertical: 10}}>
      <View style={styles.container} />
      <View style={{justifyContent: 'center', paddingHorizontal: 10}}>
        <CustomText fontSize={22} fontWeight="bold">
          {name}
        </CustomText>
        <CustomText fontSize={16}>ประเภท : {category}</CustomText>
        {tags && tags.length > 0 ? (
          <CustomText fontSize={16}>แท็ก : {tagConcated}</CustomText>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    backgroundColor: Colors._indigo_300,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
  },
});

export default SearchResultCard;
