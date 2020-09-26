import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

export type RowProps = {
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  }
})

const Row: React.FC<RowProps> = ({ style, children }) => (
    <View style={[style, styles.container]}>
      {children}
    </View>
  );

export { Row };
