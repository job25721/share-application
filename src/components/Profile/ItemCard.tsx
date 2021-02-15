import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {RootStackParamList} from '../../../App';
import {Item} from '../../store/item/types';
import {Colors} from '../../utils/Colors';
import {CustomText, ProgressiveImage} from '../custom-components';
import Tag from '../Home/Tag';

const ItemCard: React.FC<{item: Item}> = ({item}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={styles.mainView}
      onPress={() => navigation.navigate('Detail', {item, wishlist: true})}>
      <View style={styles.imgView}>
        <ProgressiveImage
          loadingType="rolling"
          style={styles.img}
          source={{uri: item.images[0]}}
        />
      </View>
      <View>
        <CustomText fontWeight="bold">{item.name}</CustomText>
        <CustomText>ประเภท : {item.category}</CustomText>
        {item.tags.length > 0 ? (
          <View style={styles.tagView}>
            <CustomText>แท้ก : </CustomText>
            {item.tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  imgView: {
    // alignSelf: 'center',
  },
  tagView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mainView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors._blue_100,
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
  },
});

export default ItemCard;
