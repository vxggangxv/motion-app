import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { colors, defaultFont } from 'styles/utils';

/**
 * 직접적인 Text 컴포넌트에 적용되야 하는 부분은 customStyle에 넣어 customStyle prop으로 전달해야 적용된다. ex) color, textDecorationLine
 * 주의! 컴포넌트에서 직접적으로 스타일을 넣어줄 경우에는 customStyle을 사용해야 한다.
 * 또는 Styled component로 스타일을 적용하고 싶은 경우 AppText로 감싼 후에 Text컴포넌트에 스타일을 입혀서 적용 ex) <AppText><StyledText></StyledText></AppText>
 * @param {object} style : Style component를 통해 오는 style. ex) styled(AppText)``
 * @param {object} customStyle : 태그에서 style을 직접 넣어줬을 떄 오는 style. ex) <AppText customStyle={{}}>
 */
export default React.memo(function AppText({
  children,
  style,
  customStyle,
  color = colors.blackFont,
  fontSize,
  fontWeight = 400,
  fontStyle = 'normal',
  fontFamily: fontFamilyProp,
  // textDecorationLine,
}) {
  const originStyle = !!style?.length && style[0];

  let fontFamily = defaultFont.regular;

  if (fontWeight === 400) {
    fontFamily = defaultFont.regular;
    if (fontStyle === 'italic') {
      fontFamily = defaultFont.italic;
    }
  }
  if (fontWeight === 500) {
    fontFamily = defaultFont.semiBold;
    if (fontStyle === 'italic') {
      fontFamily = defaultFont.semiBoldItalic;
    }
  }
  if (fontWeight === 700) fontFamily = defaultFont.bold;

  if (fontFamilyProp) fontFamily = fontFamilyProp;
  // console.log('fontFamilyProp', fontFamilyProp);

  return (
    <Text style={{ color, fontSize, fontFamily, ...originStyle, ...customStyle }}>{children}</Text>
  );
});

// const [fontFamily, setFontFamily] = useState(defaultFont.regular);

// useEffect(() => {
//   if (fontWeight === 400) return setFontFamily(defaultFont.regular);
//   if (fontWeight === 500) return setFontFamily(defaultFont.semiBold);
//   if (fontWeight === 700) return setFontFamily(defaultFont.bold);
// }, [fontWeight]);
