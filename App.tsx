import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import { commonStyles, theme } from './src/theme';
import { Main } from './src/containers';
import { ApiDataProvider } from './src/context';
import { Notification } from './src/components';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <ApiDataProvider>
        <SafeAreaView style={commonStyles.container}>
          <StatusBar barStyle='light-content' />
          <Main />
          <Notification
            ref={Notification.setRef}
          />
        </SafeAreaView>
      </ApiDataProvider>
    </PaperProvider>
  );
};
