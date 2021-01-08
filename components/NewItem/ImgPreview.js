import React from 'react';
import {Image} from 'react-native';

const ImgPreview = ({item}) => {
  return (
    <>
      <Image
        style={{height: 300}}
        source={require('../../assets/img/dang.jpg')}
      />
    </>
  );
};

export default ImgPreview;
