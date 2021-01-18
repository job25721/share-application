import React, {useContext, useState} from 'react';
import Modal from 'react-native-modalbox';
import {CustomText} from './CustomStyledComponent/Text';
import {SliderBox} from 'react-native-image-slider-box';
import {StyleSheet, View} from 'react-native';
import {Button} from './CustomStyledComponent/Button/CustomButton';
import Feather from 'react-native-vector-icons/Feather';
import {Colors} from '../utils/Colors';
import {FormContext} from '../pages/NewItem';
import {REMOVE_IMAGE} from '../utils/form/form-action-type';
// const images = [
//   require('../assets/img/cat.jpg'),
//   require('../assets/img/bag.jpg'),
// ];
const ImagePreviewModal = ({open, onClosed, images}) => {
  const [currentIdx, setCurrent] = useState(0);
  const {dispatch} = useContext(FormContext);
  return (
    <>
      <Modal
        onClosed={onClosed}
        position="center"
        style={styles.previewModal}
        isOpen={images.length > 0 ? open : false}>
        <SliderBox
          resizeMethod={'resize'}
          value={1}
          sliderBoxHeight="95%"
          dotColor="#FFEE58"
          inactiveDotColor="#90A4AE"
          circleLoop
          // eslint-disable-next-line react-native/no-inline-styles
          ImageComponentStyle={{
            borderRadius: 15,
            width: '91%',
          }}
          images={images}
        />
        <View style={{position: 'absolute', zIndex: 1, right: 0, bottom: 0}}>
          <Button
            // onPress={() => {
            //   dispatch({type: REMOVE_IMAGE, payload: currentIdx});
            // }}
            px={10}
            py={5}
            rounded
            bg={Colors._red_500}>
            <View style={{flexDirection: 'row'}}>
              <CustomText color={Colors.white}>Remove</CustomText>
              <Feather name="trash" color={Colors.white} size={30} />
            </View>
          </Button>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  previewModal: {
    height: '50%',
    width: '95%',
    borderRadius: 20,
    alignItems: 'center',
  },
});

export default ImagePreviewModal;
