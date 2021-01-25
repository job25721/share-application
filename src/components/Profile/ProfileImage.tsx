/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image} from 'react-native';
import {Button, CustomText} from '../custom-components';
import {Colors} from '../../utils/Colors';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';

interface ProfileImageProps {
  name: string;
  username: string;
  img: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({name, username, img}) => {
  const {navigate}: StackNavigationProp<RootStackParamList> = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 10,
      }}>
      <View
        style={{
          padding: 20,
        }}>
        <Image
          style={{height: 170, width: 130, borderRadius: 10}}
          source={{uri: img}}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}>
          <Button
            width={40}
            px={10}
            py={10}
            onPress={() => navigate('Share')}
            rounded
            bg={Colors._indigo_500}>
            <FeatherIcon color={Colors.white} name="edit-2" size={20} />
          </Button>
        </View>
      </View>
      <View style={{justifyContent: 'center'}}>
        <CustomText>{name}</CustomText>
        <CustomText fontSize={16} color="#C7C7C7">
          @{username}
        </CustomText>
      </View>
    </View>
  );
};

export default ProfileImage;
