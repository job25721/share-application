import React, {useState} from 'react';
import {
  Animated,
  ImageURISource,
  StyleSheet,
  View,
  ImageStyle,
  ImageResizeMode,
  ViewStyle,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

type ImageLoading =
  | 'rolling'
  | 'eclipse'
  | 'interwind'
  | 'spinner'
  | 'roundLoading'
  | 'loadingMotion';
interface ProgressiveImageProps {
  source: ImageURISource;
  style?: ImageStyle;
  loadingType?: ImageLoading;
  resizeMode?: ImageResizeMode;
  imgViewStyle?: ViewStyle;
}
const ProgressiveImage: React.FC<ProgressiveImageProps> = (props) => {
  // const [thumbnailAnimated] = useState(new Animated.Value(0));
  const [imageAnimated] = useState(new Animated.Value(0));

  // const indicatorPath = {
  //   rolling: require('../../assets/img/loadingIndicator/rolling.gif'),
  //   eclipse: require('../../assets/img/loadingIndicator/eclipse.gif'),
  //   interwind: require('../../assets/img/loadingIndicator/interwind.gif'),
  //   spinner: require('../../assets/img/loadingIndicator/spinner.gif'),
  //   roundLoading: require('../../assets/img/loadingIndicator/roundLoading.gif'),
  //   loadingMotion: require('../../assets/img/loadingIndicator/loadingMotion.gif'),
  // };
  // const handleThumbnailLoad = () => {
  //   Animated.timing(thumbnailAnimated, {
  //     toValue: 1,
  //     useNativeDriver: true,
  //   }).start();
  // };
  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const {source, style, imgViewStyle} = props;
  return (
    <View style={imgViewStyle}>
      <SkeletonPlaceholder>
        <Animated.View {...props} style={[style]} />
      </SkeletonPlaceholder>
      <Animated.Image
        {...props}
        source={source}
        resizeMode={props.resizeMode}
        style={[styles.imageOverlay, {opacity: imageAnimated}, style]}
        onLoad={onImageLoad}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    // backgroundColor: 'red',
  },
  container: {
    // backgroundColor: 'transparent',
  },
});
export default ProgressiveImage;
