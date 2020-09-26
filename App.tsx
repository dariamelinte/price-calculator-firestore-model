import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import { commonStyles, theme } from './src/theme';
import { Main } from './src/containers';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={commonStyles.container}>
        <StatusBar barStyle='light-content' />
        <Main />
      </SafeAreaView>
    </PaperProvider>
  );
};
