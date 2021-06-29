import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { colors } from 'styles/utils';
import PropTypes from 'prop-types';

// colors.blue
export default function ScreenLayout({
  loading,
  size = 'large',
  color = 'white',
  children,
  hasDataLoading = false,
  hasData = false,
}) {
  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: colors.navy,
        // alignItems: 'center',
        // justifyContent: 'center',
      }}
    >
      {hasDataLoading ? (
        <>
          {hasData && <>{children}</>}
          {loading && (
            <View
              style={{
                flex: 1,
                position: 'absolute',
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ActivityIndicator size={size} color={color} />
            </View>
          )}
        </>
      ) : (
        <>
          {loading ? (
            <View
              style={{
                flex: 1,
                position: 'absolute',
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ActivityIndicator size={size} color={color} />
            </View>
          ) : (
            <>{children}</>
          )}
        </>
      )}
    </View>
  );
}

ScreenLayout.propTypes = {
  loading: PropTypes.bool.isRequired,
  size: PropTypes.oneOf(['small', 'string']),
  color: PropTypes.string,
};
