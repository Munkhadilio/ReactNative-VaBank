import { Dimensions, PixelRatio } from 'react-native';

const heightScreen = 812;
const widthScreen = 375;
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export function hp(height) {
  const PxInPercent = (height * 100) / heightScreen;

  return PixelRatio.roundToNearestPixel((windowHeight * PxInPercent) / 100);
}

export function wp(width) {
  const PxInPercent = (width * 100) / widthScreen;

  return PixelRatio.roundToNearestPixel((windowWidth * PxInPercent) / 100);
}
